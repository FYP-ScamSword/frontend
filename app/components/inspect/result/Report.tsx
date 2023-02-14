import { Box, Text } from "@chakra-ui/react";

type Props = { s3ReportLink: string };
export default function InspectReport({ s3ReportLink }: Props) {
  console.log(s3ReportLink)
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg">
      <Box p="6">
        <Text>Report</Text>
        <Text>{s3ReportLink}</Text>
      </Box>
    </Box>
  );
}
