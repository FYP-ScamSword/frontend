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
} from "@chakra-ui/react";

import InspectedLink from "~/server/models/InspectedLink";

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
          <Text color="red">Error getting information {JSON.stringify(inspectedLinkErr)}</Text>
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
                    <Text>
                      {inspectedLink!.combolevelsquatting_flag &&
                        "Combolevelsquatting"}
                    </Text>
                    <Text>{inspectedLink!.dga_flag && "DGA"}</Text>
                    <Text>
                      {inspectedLink!.redirections_flag && "Redirections"}
                    </Text>
                    <Text>
                      {inspectedLink!.domain_age_flag && "Domain Age"}
                    </Text>
                    <Text>
                      {inspectedLink!.registration_period_flag &&
                        "Registration Period"}
                    </Text>
                    <Text>
                      {inspectedLink!.safe_browsing_flag && "Safe Browsing"}
                    </Text>
                    <Text>{inspectedLink!.web_risk_flag && "Web Risk"}</Text>
                    <Text>
                      {inspectedLink!.subdomain_len_flag && "Subdomain Length"}
                    </Text>
                    <Text>
                      {inspectedLink!.blacklisted_keyword_flag &&
                        "Blacklist Keyword"}
                    </Text>
                    <Text>
                      {inspectedLink!.homographsquatting_flag &&
                        "Homographsquatting"}
                    </Text>
                    <Text>
                      {inspectedLink!.typobitsquatting_flag &&
                        "Typobitsquatting"}
                    </Text>
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
