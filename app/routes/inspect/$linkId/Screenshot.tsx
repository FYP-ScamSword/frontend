import { Box, Text, Image, Flex, Spacer } from "@chakra-ui/react";
import { encodeBase64 } from "bcryptjs";
import { getScreenshot } from "~/server/inspect.server";

type Props = { screenshot: any; screenshotErr: any };

export default function Screenshot({ screenshot, screenshotErr }: Props) {
  return (
    <Box p="6">
      <Text>Screenshot</Text>
      {screenshotErr ? (
        <Text color="red">
          Error: screenshot cannot be retrieved {JSON.stringify(screenshotErr)}
        </Text>
      ) : (
        <div>
          {/* <Text color="tomato">Similar to a social media page</Text> */}
          <Image src={screenshot} boxSize="300px" objectFit="contain" />
        </div>
      )}
    </Box>
  );
}
