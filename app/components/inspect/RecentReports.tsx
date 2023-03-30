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
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import InspectedLink from "~/server/models/InspectedLink";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRevalidator } from 'react-router-dom';

type Props = {recentScans:InspectedLink[]; recentScansErr: any }

export default function RecentReports({
  recentScans,
  recentScansErr,
}:Props) {

  const revalidator = useRevalidator();
  dayjs.extend(relativeTime)

  return (
    <div>
      <Flex mx={4} mb={4} alignItems='flex-end'>
        <Heading size="md">Recent Scans</Heading>
        <Spacer />
        <IconButton
          aria-label="Received"
          size="xs"
          variant="outline"
          icon={<RepeatIcon />}
          onClick={() => {
            revalidator.revalidate()
          }}
        />
      </Flex>
      <TableContainer mb={10}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Link</Th>
              <Th>Verdict</Th>
              <Th>Report Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            { recentScans ? recentScans.map((scan) => (
              <Tr>
                <Td>
                  <Tooltip label={scan.original_url} placement="left">
                    <Text>{ ((scan.original_url).length > 40) ? 
                      (((scan.original_url).substring(0,40-3)) + '...') : 
                      scan.original_url }
                    </Text>
                  </Tooltip>
                </Td>
                <Td>
                  {scan!.to_flag === false ? (
                    <Badge size="lg" colorScheme="green">
                      Site is safe
                    </Badge>
                  ) : scan!.flag_points >= 5 ? (
                    <Badge size="lg" colorScheme="red">
                      Potentially Scam
                    </Badge>
                  ) : scan!.flag_points >= 3.6 ? (
                    <Badge size="lg" colorScheme="orange">
                      Likely Scam
                    </Badge>
                  ) : (
                    <Badge size="lg" colorScheme="gray">
                      Unclassified
                    </Badge>
                  )}
                </Td>
                <Td>
                  <Text>{dayjs(scan.updatedAt).fromNow()}</Text>
                </Td>
              </Tr>
            )) :
              <></>
            }
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
