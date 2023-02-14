import { ExternalLinkIcon } from "@chakra-ui/icons";
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

type Props = { inspectedLink: InspectedLink };
export default function Information({ inspectedLink }: Props) {
  return (
    <Box maxW="md" borderWidth="1px" borderRadius="lg">
      <Box p="6">
        <Text>Information</Text>
        <TableContainer>
          <Table variant="simple" size="sm">
            <Tbody>
              <Tr>
                <Td>Original URL</Td>
                <Td>{inspectedLink.original_url}</Td>
              </Tr>
              <Tr>
                <Td>Processed URL</Td>
                <Td>{inspectedLink.processed_url}</Td>
              </Tr>
              <Tr>
                <Td>Domain Age</Td>
                <Td>
                  {inspectedLink.domain_age
                    ? inspectedLink.domain_age.toString()
                    : "0"}
                </Td>
              </Tr>
              <Tr>
                <Td>Flag Points</Td>
                <Td>
                  {inspectedLink.flag_points
                    ? inspectedLink.flag_points.toString()
                    : "0"}
                </Td>
              </Tr>
              <Tr>
                <Td>Abuse Contact</Td>
                <Td>{inspectedLink.registrar_abuse_contact}</Td>
              </Tr>
              <Tr>
                <Td>Report Link</Td>
                <Td>
                  <Link href={inspectedLink.report as string} isExternal>
                    S3 Link <ExternalLinkIcon mx="2px" />
                  </Link>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
