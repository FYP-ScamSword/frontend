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
import { Form, useActionData } from "@remix-run/react";

export default function LandingForm() {
  const data = useActionData();
  // using errors as convention to return all the form errors
  const errors = data?.errors;
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  return (
    <Flex alignItems="center">
      <Box maxW="md">
        <Heading as="h1" mb={8}>
          Inspect Link
        </Heading>
        <Text>
          Verify any suspicious link before providing your credentials
        </Text>
        <Form
          method="post"
          action="/inspect"
          onSubmit={(e) => {
            setSubmitted(true);
          }}
        >
          <InputGroup size="lg" mt={8}>
            <Input
              type="url"
              pr="7rem"
              name="link"
              placeholder="Enter link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <InputRightElement width="6.75rem">
              <Button
                h="2rem"
                bgColor="#458DC8"
                color="white"
                _hover={{ bgColor: "#397CB2" }}
                type="submit"
                isLoading={submitted}
              >
                Inspect
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors?.title ? <Text>{errors.title}</Text> : null}
        </Form>
      </Box>
      <Spacer />
      <Box boxSize="md" display={{ base: "none", lg: "flex" }}>
        <Image src={image} />
      </Box>
    </Flex>
  );
}
