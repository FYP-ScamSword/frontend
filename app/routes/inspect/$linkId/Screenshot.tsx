import { Box, Text, Image, Flex, Spacer } from "@chakra-ui/react";

type Props = { screenshot: any; screenshotErr: any };

export default function Screenshot({ screenshot, screenshotErr }: Props) {
  return (
    <Box p="6" maxW="30vw">
      <Text>Screenshot</Text>
      {!screenshot ? (
        <Text color="red">
          Error: screenshot cannot be retrieved {JSON.stringify(screenshotErr)}
        </Text>
      ) : (
        <div>
          <Image src={screenshot} boxSize="300px" objectFit="contain" />
        </div>
      )}
    </Box>
  );
}
