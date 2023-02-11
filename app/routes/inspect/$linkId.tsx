import {
  Box,
  Button,
  Container,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import Nav from "~/shared/nav";

export default function InspectSlug() {
  return (
    <Box>
      <Nav />
      <Container maxW="container.lg" mt={16}>
        <InputGroup size="lg">
          <Input pr="7rem" placeholder="Enter link" ></Input>
          <InputRightElement width="6.75rem">
            <Button h="2rem" mr=".25rem">
              Inspect
            </Button>
          </InputRightElement>
        </InputGroup>
      </Container>
    </Box>
  );
}
