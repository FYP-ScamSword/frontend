import { Box, Text, Image, Flex, Spacer } from "@chakra-ui/react";
import { encodeBase64 } from "bcryptjs";
import { getScreenshot } from "~/server/inspect.server";

type Props = { screenshot: any };

export default function Screenshot({ screenshot }: Props) {
  return (
    <Box minW="sm" borderWidth="1px" borderRadius="lg">
      <Box p="6">
        <Flex>
          <Text>Screenshot</Text>
          <Spacer />
          <Text color="tomato">Similar to a social media page</Text>
        </Flex>
        <Image src={screenshot} />
      </Box>
    </Box>
  );
}
