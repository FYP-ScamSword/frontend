import type InspectedLink from "./models/InspectedLink";
import { collections } from "./mongodb/conn";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_PUBLIC_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});
export const inspectLink = async (link: string) => {
  return await fetch(`${process.env.LINK_INSPECTION_BACKEND}/api/linkinspect`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectURL: link }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getInspectedLink = async (encodedLink: string) => {
  const decodedLink = decodeURIComponent(encodedLink);
  var inspectedLink: InspectedLink = await getLinkStatus(decodedLink);
  return inspectedLink;
};

export const getReport = async (reportName: string) => {
  const url = await handleDownload(
    process.env.S3_REPORT_BUCKET!,
    reportName.split("/").pop()!
  );
  if (url.length === 0) {
    return;
  }
  return await fetch(url).then((r) => r.text());
};

export const getRecentScans = async () => {
  return (await collections.inspectedLinks
    ?.find({})
    .sort({ updatedAt: -1 })
    .limit(5)
    .toArray()) as unknown as InspectedLink[];
};

const getLinkStatus = (decodedLink: string) => {
  const query = { original_url: decodedLink };
  return collections.inspectedLinks?.findOne(query) as unknown as InspectedLink;
};

export const getDom = (processedUrl: string) => {
  return fetch(
    `${process.env.SCREENSHOT_BACKEND}/scrape?url=${processedUrl}`
  ).then((res) => {
    if (res.status === 200) return res.json();
    else {
      if (res.status === 500) throw "Site not alive";
    }
  });
};
export const getScreenshot = async (processedUrl: string) => {
  const filename = await fetch(
    `${process.env.SCREENSHOT_BACKEND}/screenshot?url=${processedUrl}`
  )
    .then((res) => {
      if (res.status === 200) return res.json();
      else {
        if (res.status === 500) throw "Screenshot not available";
      }
    })
    .then((data) => data.filename);
  return handleDownload(process.env.S3_SCREENSHOOT_BUCKET!, filename);
};

export const getFavicon = (key:string) =>{
  return handleDownload(process.env.S3_FAVICON_BUCKET!,key)
}
const handleDownload = (bucket: string, key: string) => {
  if (key.length == 0) return "";
  const s3 = new AWS.S3();

  const signedUrlExpireSeconds = 60 * 5;
  return s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
};

export const sendTakedownEmail = async (
  url: string,
  destEmail: string,
  evidences: string
) => {
  // url in index.tsx is ${inspectedLink.original_url}
  // dest email is ${inspectedLink.registrar_abuse_contact}? note that it may be null if the website's who is lookup failed or smth
  const evidenceArray = evidences.split(",");

  var evidenceStr = "<ol>";

  for (var i = 0; i < evidenceArray.length; i++) {
    evidenceStr += `<li>${evidenceArray[i]}</li>`;
  }

  evidenceStr += "</ol>";

  return await fetch(`${process.env.TAKEDOWN_ENDPOINT}/sendEmailTemplate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Source: "scamsword@gmail.com",
      Destination: {
        ToAddresses: [destEmail],
        CcAddresses: [],
      },
      Template: "template-registrar",
      TemplateData: {
        url: url,
        evidence: evidenceStr,
        contact: "scamsword@gmail.com",
      },
    }),
  })
    .then((response) => {
      return response;
    })
    .then((data) => data)
    .catch((err) => console.error(err));
};
