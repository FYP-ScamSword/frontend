import { ExternalLinkIcon, EmailIcon } from "@chakra-ui/icons";
import {
  Box,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  Tooltip,
} from "@chakra-ui/react";

import InspectedLink from "~/server/models/InspectedLink";
import { combolevelsquattingTooltip, dgaTooltip, domainAgeTooltip, homographsquattingTooltip, keywordBlacklistTooltip, redirectionTooltip, registrationperiodTooltip, safebrowsingTooltip, substringTooltip, typobitsquattingTooltip, webriskTooltip } from "./TooltipStrings";

interface InformationProps {
  inspectedLink: InspectedLink;
  inspectedLinkErr: any;
}

export default function Information({
  inspectedLink,
  inspectedLinkErr,
}: InformationProps) {
  return (
    <Box p="6">
      <Text>Information</Text>
      {inspectedLinkErr ? (
        <Text color="red">
          Error getting information {JSON.stringify(inspectedLinkErr)}
        </Text>
      ) : (
        <TableContainer>
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Td>Original URL</Td>
                <Td>{inspectedLink!.original_url}</Td>
              </Tr>
              <Tr>
                <Td>Processed URL</Td>
                <Td>{inspectedLink!.processed_url}</Td>
              </Tr>
              <Tr>
                <Td>Domain Age</Td>
                <Td>
                  {inspectedLink!.domain_age
                    ? inspectedLink!.domain_age + " days"
                    : "NA"}
                </Td>
              </Tr>
              <Tr>
                <Td>Flags</Td>
                <Td>
                  <Text>{inspectedLink!.to_flag && "THIS SITE LEGIT!!!"}</Text>
                  {!inspectedLink!.to_flag && (
                    <div>
                      <Tooltip hasArrow placement='right' label={combolevelsquattingTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.combolevelsquatting_flag &&
                            "Combolevelsquatting"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={dgaTooltip} aria-label='A tooltip'>
                        <Text>{inspectedLink!.dga_flag && "DGA"}</Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={redirectionTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.redirections_flag && "Redirections"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={domainAgeTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.domain_age_flag && "Domain Age"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={registrationperiodTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.registration_period_flag &&
                            "Registration Period"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={safebrowsingTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.safe_browsing_flag && "Safe Browsing"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={webriskTooltip} aria-label='A tooltip'>
                        <Text>{inspectedLink!.web_risk_flag && "Web Risk"}</Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={substringTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.subdomain_len_flag &&
                            "Subdomain Length"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={keywordBlacklistTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.blacklisted_keyword_flag &&
                            "Blacklist Keyword"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={homographsquattingTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.homographsquatting_flag &&
                            "Homographsquatting"}
                        </Text>
                      </Tooltip>
                      <Tooltip hasArrow placement='right' label={typobitsquattingTooltip} aria-label='A tooltip'>
                        <Text>
                          {inspectedLink!.typobitsquatting_flag &&
                            "Typobitsquatting"}
                        </Text>
                      </Tooltip>
                    </div>
                  )}
                </Td>
              </Tr>
              <Tr>
                <Td>Abuse Contact</Td>
                <Td>
                  <Link
                    href={"mailto:" + inspectedLink!.registrar_abuse_contact}
                    isExternal
                  >
                    {inspectedLink!.registrar_abuse_contact && (
                      <EmailIcon mr="4" />
                    )}
                    {inspectedLink!.registrar_abuse_contact || "NA"}
                  </Link>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
