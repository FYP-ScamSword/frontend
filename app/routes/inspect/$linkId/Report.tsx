import { Box,  Text } from "@chakra-ui/react";

type Props = { inspectionReport?: string; inspectionReportErr: any };
export default function InspectReport({
  inspectionReport,
  inspectionReportErr,
}: Props) {
  return (
    <Box borderWidth="1px" borderRadius="lg" bg="#19171C" color="white">
      <Box p="6" overflow="scroll" h="50vh">
        {inspectionReportErr ? (
          <Text color="red">
            Error retrieving inspection report{" "}
            {JSON.stringify(inspectionReportErr)}
          </Text>
        ) : (
          <pre>
            <small>
              <code>{inspectionReport}</code>
            </small>
          </pre>
        )}
      </Box>
    </Box>
  );
}
