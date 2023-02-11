import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  Image,
  Spacer,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import image from "~/assets/certified.webp";
import { Form } from "@remix-run/react";

export default function LandingForm() {
  const [link, setLink] = useState("");
  return (
    <Flex alignItems="center">
      <Box maxW="md">
        <Heading as="h1" mb={8}>
          Inspect Link{" "}
        </Heading>
        <Text>
          Verify any suspicious link before providing your credentials
        </Text>
        <Form action={`/inspect/${encodeURIComponent(link)}`}>
          <InputGroup size="lg" mt={8}>
            <Input
              type="url"
              pr="7rem"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <InputRightElement width="6.75rem">
              <Button h="2rem" mr=".25rem" type="submit">
                Inspect
              </Button>
            </InputRightElement>
          </InputGroup>
        </Form>
      </Box>
      <Spacer />
      <Box boxSize="md" display={{ base: "none", lg: "flex" }}>
        <Image src={image} />
      </Box>
    </Flex>
  );
}
