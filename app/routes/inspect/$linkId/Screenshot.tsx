import { Box, Text, Image, Flex, Spacer } from "@chakra-ui/react";

type Props = { screenshot: any; screenshotErr: any };

export default function Screenshot({ screenshot, screenshotErr }: Props) {
  return (
    <Box p="6" >
      <Text>Screenshot</Text>
      {!screenshot ? (
        <Text color="red">
          Error: screenshot cannot be retrieved {JSON.stringify(screenshotErr)}
        </Text>
      ) : (
        <Box height="260px" overflowY="scroll">
          <Image
            src={screenshot}
            width="400px"
            objectFit="cover"
            objectPosition="top"
            onClick={(e) => window.open(screenshot, "_blank")}
          />
        </Box>
      )}
    </Box>
  );
}
