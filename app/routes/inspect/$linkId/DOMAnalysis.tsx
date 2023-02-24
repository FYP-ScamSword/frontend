import { Box, Text } from "@chakra-ui/react";

type Props = { inspectionReport?: string; inspectionReportErr: any };
export default function DomAnalysis({
  inspectionReport,
  inspectionReportErr,
}: Props) {
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <Box p="6" overflow="scroll">
        {inspectionReportErr ? (
          <Text color="red">
            Error retrieving dom:
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
