import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import {
  getInspectedLink,
  getReport,
  getScreenshot,
} from "~/server/inspect.server";
import Nav from "~/shared/nav";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { collections, connectToDatabase } from "~/server/mongodb/conn";
import Report from "~/components/inspect/result/Report";
import Screenshot from "~/components/inspect/result/Screenshot";
import Information from "~/components/inspect/result/Information";

export const loader = async ({ params }: LoaderArgs) => {
  await connectToDatabase();

  invariant(params.linkId, `params.linkId is required`);
  var screenshot = await getScreenshot(decodeURIComponent(params.linkId));

  var inspectedLink = await getInspectedLink(params.linkId);
  var inspectionReport = await getReport(inspectedLink.report as string);

  if (inspectedLink && inspectedLink.status === "processed") {
    return json({ screenshot, inspectedLink, inspectionReport });
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
  inspectionReport = await getReport(inspectedLink.report as string);
  console.log(inspectionReport);
  return json({ screenshot, inspectedLink, inspectionReport });
};
export default function InspectSlug() {
  const { screenshot, inspectedLink, inspectionReport } =
    useLoaderData<typeof loader>();
  return (
    <Box>
      <Nav />
      <Container maxW="container.lg" mt={16}>
        <InputGroup size="lg">
          <Input
            pr="7rem"
            placeholder="Enter link"
            defaultValue={inspectedLink.original_url as string}
          ></Input>
          <InputRightElement width="6.75rem">
            <Button h="2rem" mr=".25rem">
              Inspect
            </Button>
          </InputRightElement>
        </InputGroup>
        <Grid
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={2}
          mt={4}
        >
          <GridItem>
            <Information inspectedLink={inspectedLink}/>
            {/* <Report s3ReportLink={inspectionReport! as string} /> */}
          </GridItem>
          <GridItem>
            <Screenshot screenshot={screenshot} />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
