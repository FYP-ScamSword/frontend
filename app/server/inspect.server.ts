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

export const getRecentScans = async () => {
  return await collections.inspectedLinks?.find({}).sort({ "updatedAt": -1 }).limit(5).toArray() as unknown as InspectedLink[];
}

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
