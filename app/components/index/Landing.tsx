import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Spacer,
} from "@chakra-ui/react";
import image from "~/assets/shield.png";

export default function Landing() {
  return (
    <Container maxW="container.lg" mt={16}>
      <Flex alignItems="center">
        <Box maxW="md">
          <Heading as="h1" mb={8}>
            Help to Fight Scams
          </Heading>
          <Text>
            Some useful statistics like everyday how many Singaporeans are
            scammed, how much money lost etc etc
          </Text>
          <Button mt={8}>Learn How</Button>
        </Box>
        <Spacer />
        <Box boxSize="md" display={{ base: "none", lg: "flex" }}>
          <Image src={image} />
        </Box>
      </Flex>
    </Container>
  );
}
