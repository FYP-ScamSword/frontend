import { TriangleUpIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Heading,
  Flex,
  Spacer,
} from "@chakra-ui/react";
export default function RecentReports() {
  return (
    <div>
      <Flex mx={4} mb={4} alignItems='flex-end'>
        <Heading size="md">Recent Scans</Heading>
        <Text ml={4} fontSize='sm'>Updates every minute</Text>
        <Spacer />
        <IconButton
          aria-label="Received"
          size="xs"
          variant="outline"
          icon={<RepeatIcon />}
        />
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Link</Th>
              <Th>Summary</Th>
              <Th>Report Time</Th>
              <Th>No. of Receivers</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text>https://u0b.ne</Text>
              </Td>
              <Td>
                <Text>Highly Likely - Bank Impersonation</Text>
              </Td>
              <Td>
                <Text>10s ago</Text>
              </Td>
              <Td>
                <Text>10</Text>
              </Td>
              <Td>
                <IconButton
                  colorScheme="blue"
                  aria-label="Received"
                  size="xs"
                  variant="outline"
                  icon={<TriangleUpIcon />}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
