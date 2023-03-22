import InspectedLink from "./models/InspectedLink";
import { collections } from "./mongodb/conn";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.AWS_PUBLIC_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "us-east-1",
});
export const inspectLink = async (link: string) => {
  console.log(link)
  return await fetch(`${process.env.LINK_INSPECTION_BACKEND}/api/linkinspect`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectURL: link }),
  })
    .then((response) => {
      console.log(response)
      return response.json();
    })
    .then((data) => data)
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

const getLinkStatus = (decodedLink: string) => {
  const query = { original_url: decodedLink };
  return collections.inspectedLinks?.findOne(query) as unknown as InspectedLink;
};

export const getDom = async (processedUrl: String) => {
  return await fetch(
    `${process.env.SCREENSHOT_BACKEND}/scrape?url=${processedUrl}`
  ).then((res) => res.json());
};
export const getScreenshot = async (processedUrl: String) => {
  const filename = await fetch(
    `${process.env.SCREENSHOT_BACKEND}/screenshot?url=${processedUrl}`
  )
    .then((res) => res.json())
    .then((data) => data.filename);
  return handleDownload(process.env.S3_SCREENSHOOT_BUCKET!, filename);
};

const handleDownload = (bucket: string, key: string) => {
  console.log(bucket, key);
  if (key.length == 0) return "";
  const s3 = new AWS.S3();

  const signedUrlExpireSeconds = 60 * 5;
  return s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
};

// TODO: evidence
export const sendTakedownEmail = async (url: string, destEmail: string) => {
  // url in index.tsx is ${inspectedLink.original_url}
  // dest email is ${inspectedLink.registrar_abuse_contact}? note that it may be null if the website's who is lookup failed or smth
  console.log("SENDTAKENDOWN EMAIL: " + url)
  console.log(destEmail)
  return await fetch(`${process.env.TAKEDOWN_ENDPOINT}/sendEmailTemplate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "Source": "scamsword@gmail.com",
      "Destination": {
        "ToAddresses": [destEmail],
        "CcAddresses": []
      },
      "Template": "template-registrar",
      "TemplateData": {
        "url": url,
        "evidence": "Lorem ipsum dolor sit amet",
        "contact": "scamsword@gmail.com"
      }
    }),
  })
    .then((response) => {
      console.log(response)
      return response;
    })
    .then((data) => data)
    .catch((err) => console.error(err));
};