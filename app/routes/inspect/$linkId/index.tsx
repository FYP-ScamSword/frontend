import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  getDom,
  getInspectedLink,
  getReport,
  getScreenshot,
} from "~/server/inspect.server";
import Nav from "~/shared/nav";
import { useLoaderData, useParams } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { collections, connectToDatabase } from "~/server/mongodb/conn";
import Information from "./Information";
import type InspectedLink from "~/server/models/InspectedLink";
import Report from "./Report";
import Screenshot from "./Screenshot";
import DomAnalysis from "./DOMAnalysis";

export const loader = async ({ params }: LoaderArgs) => {
  await connectToDatabase();

  invariant(params.linkId, `params.linkId is required`);
  var dom,
    screenshot,
    inspectedLink: InspectedLink | null = null,
    inspectionReport;
  var domErr, screenshotErr, inspectedLinkErr, inspectionReportErr;

  try {
    inspectedLink = (await getInspectedLink(params.linkId)) as InspectedLink;
  } catch (error) {
    inspectedLinkErr = error;
  }
  console.log(inspectedLink);
  try {
    screenshot = await getScreenshot(decodeURIComponent(params.linkId));
  } catch (error) {
    screenshotErr = error;
  }
  try {
    dom = await getDom(decodeURIComponent(params.linkId));
  } catch (error) {
    domErr = error;
  }

  if (inspectedLink && inspectedLink.status === "processed") {
    try {
      inspectionReport = await getReport(
        (inspectedLink as InspectedLink).report as string
      );
    } catch (error) {
      inspectionReportErr = error;
    }
    return json({
      inspectedLink,
      inspectedLinkErr,
      inspectionReport,
      inspectionReportErr,
      screenshot,
      screenshotErr,
      dom,
      domErr,
    });
  }
  const pipeline = [
    {
      $match: {
        original_url: decodeURIComponent(params.linkId),
        status: "processing",
      },
    },
  ];
  const changeStream = collections.inspectedLinks?.watch(pipeline, {
    fullDocument: "updateLookup",
  });
  await changeStream!.next();

  inspectedLink = await getInspectedLink(decodeURIComponent(params.linkId));
  changeStream?.close();
  // inspectionReport = await getReport(inspectedLink.report as string);
  // console.log(inspectionReport);

  try {
    inspectionReport = await getReport(
      (inspectedLink as InspectedLink).report as string
    );
  } catch (error) {
    inspectionReportErr = error;
  }
  return json({
    inspectedLink,
    inspectedLinkErr,
    inspectionReport,
    inspectionReportErr,
    screenshot,
    screenshotErr,
    dom,
    domErr,
  });
};

export default function InspectSlug() {
  // const { inspectedLink } =
  //   useLoaderData<typeof loader>();
  const { linkId } = useParams();
  const {
    inspectedLink,
    inspectedLinkErr,
    inspectionReport,
    inspectionReportErr,
    screenshot,
    screenshotErr,
    dom,
    domErr,
  } = useLoaderData<typeof loader>();
  console.log(screenshot, screenshotErr);
  return (
    <Box>
      <Nav />
      <Container maxW="container.lg" mt={8}>
        <Flex my={8} >
          <Text fontSize="xl">{linkId}</Text>
          <Spacer />
          <Button h="2rem">Report</Button>
        </Flex>
        <Flex minWidth='max-content'>
          <Information
            inspectedLink={inspectedLink}
            inspectedLinkErr={inspectedLinkErr}
          />
          <Divider orientation='vertical' mx={8}/>
          <Screenshot screenshot={screenshot} screenshotErr={screenshotErr} />
        </Flex>

        <Tabs my={8}>
          <TabList>
            <Tab>Report</Tab>
            <Tab>DOM</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Report
                inspectionReport={inspectionReport}
                inspectionReportErr={inspectionReportErr}
              />
            </TabPanel>
            <TabPanel>
              <DomAnalysis dom={dom} domErr={domErr} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}
