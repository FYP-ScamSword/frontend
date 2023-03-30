import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  getDom,
  getInspectedLink,
  getReport,
  getScreenshot,
  sendTakedownEmail,
} from "~/server/inspect.server";
import Nav from "~/shared/nav";
import { useLoaderData, useParams, Form } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { collections, connectToDatabase } from "~/server/mongodb/conn";
import Information from "./Information";
import type InspectedLink from "~/server/models/InspectedLink";
import Report from "./Report";
import Screenshot from "./Screenshot";
import DomAnalysis from "./DOMAnalysis";
import { useToast } from "@chakra-ui/react";
import { type ActionFunction } from "@remix-run/server-runtime";

export const loader = async ({ params }: LoaderArgs) => {
  await connectToDatabase();

  invariant(params.linkId, `params.linkId is required`);
  var dom, screenshot, inspectedLink, inspectionReport;
  var domErr, screenshotErr, inspectedLinkErr, inspectionReportErr;

  try {
    inspectedLink = (await getInspectedLink(params.linkId)) as InspectedLink;
  } catch (error) {
    inspectedLinkErr = error;
  }
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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const link = formData.get("link") as string;
  const registrarEmail = formData.get("registrarEmail");

  //split by comma, and then have corresponding text for each. and then send it as an extra param to the func below
  const evidences = formData.getAll("evidenceCheckbox").toString();

  // dest addr - supposed to be registrar email but for testing/demo, use personal email
  if (registrarEmail) {
    sendTakedownEmail(link, "zxnlee00@gmail.com", evidences); // 2nd parameter should be registrar contact?
  }

  return null;
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

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Container maxW="container.lg" mt={8}>
        <Flex my={8}>
          <Text fontSize="xl">{linkId}</Text>
          <Spacer />
          {inspectedLink.num_flags == 0 ? (
            <Button h="2rem" isDisabled>
              Report
            </Button>
          ) : (
            <Button h="2rem" onClick={onOpen}>
              Report
            </Button>
          )}
          <Modal
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
          >
            <ModalOverlay />
            <ModalContent maxW={650}>
              <ModalHeader>Submit Takedown Request to Registrar</ModalHeader>
              <ModalCloseButton />
              <Form method="post">
                <ModalBody>
                  <Text mb={3}>
                    Please select the flags that you would like to send as
                    evidence in the email report.
                  </Text>
                  <Stack spacing={2} direction="column">
                    {inspectedLink!.combolevelsquatting_flag ? (
                      <Checkbox
                        defaultChecked
                        name="evidenceCheckbox"
                        value="Combosquatting/Levelsquatting"
                      >
                        Combo-level Squatting
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.dga_flag ? (
                      <Checkbox
                        name="evidenceCheckbox"
                        value="Domain Generation Algorithm"
                      >
                        Domain Generation Algorithm
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.redirections_flag ? (
                      <Checkbox
                        defaultChecked
                        name="evidenceCheckbox"
                        value="Abnormal Number of Redirections"
                      >
                        Abnormal Number of Redirections
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.domain_age_flag ? (
                      inspectedLink.domain_age ? (
                        <Checkbox
                          defaultChecked
                          name="evidenceCheckbox"
                          value="Abnormal Domain Age"
                        >
                          Abnormal Domain Age
                        </Checkbox>
                      ) : (
                        <Checkbox
                          name="evidenceCheckbox"
                          value="Abnormal Domain Age"
                        >
                          Abnormal Domain Age
                        </Checkbox>
                      )
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.registration_period_flag ? (
                      <Checkbox
                        defaultChecked
                        name="evidenceCheckbox"
                        value="Short Registration Period Length"
                      >
                        Short Registration Period Length
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.safe_browsing_flag ? (
                      <Checkbox
                        defaultChecked
                        name="evidenceCheckbox"
                        value="Google's Safe Browsing Anomaly"
                      >
                        Safe Browsing Anomaly
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.subdomain_len_flag ? (
                      <Checkbox
                        name="evidenceCheckbox"
                        value="Abnormal Subdomain String Length"
                      >
                        Abnormal Subdomain Length
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.blacklisted_keyword_flag ? (
                      <Checkbox
                        name="evidenceCheckbox"
                        value="Presence of Blacklisted Keyword(s)"
                      >
                        Presence of Blacklisted Keyword(s)
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.homographsquatting_flag ? (
                      <Checkbox
                        defaultChecked
                        name="evidenceCheckbox"
                        value="Homograph Squatting"
                      >
                        Homograph Squatting
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                    {inspectedLink!.typobitsquatting_flag ? (
                      <Checkbox
                        defaultChecked
                        name="evidenceCheckbox"
                        value="Typosquatting/Bitsquatting"
                      >
                        Typo-bit Squatting
                      </Checkbox>
                    ) : (
                      <></>
                    )}
                  </Stack>
                </ModalBody>
                <ModalFooter>
                  <Input
                    readOnly={true}
                    name="link"
                    hidden={true}
                    defaultValue={inspectedLink.original_url}
                  />
                  <Input
                    readOnly={true}
                    name="registrarEmail"
                    hidden={true}
                    defaultValue={inspectedLink.registrar_abuse_contact}
                  />
                  <Button colorScheme="red" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="green"
                    mr={3}
                    onClick={() =>
                      inspectedLink.registrar_abuse_contact
                        ? toast({
                            title: "Report Submitted.",
                            description: `We've reported the malicious URL ${inspectedLink.original_url} to the registrar at ${inspectedLink.registrar_abuse_contact}.`,
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                          })
                        : toast({
                            title: "Report Failed.",
                            description: `The malicious URL ${inspectedLink.original_url}'s registrar was not found, hence the request for takedown was not sent.`,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                          })
                    }
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            </ModalContent>
          </Modal>
        </Flex>
        <Flex minWidth="max-content">
          <Information
            inspectedLink={inspectedLink}
            inspectedLinkErr={inspectedLinkErr}
          />
          <Divider orientation="vertical" mx={8} />
          <Screenshot screenshot={screenshot} screenshotErr={screenshotErr} />
        </Flex>

        <Tabs my={4}>
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
