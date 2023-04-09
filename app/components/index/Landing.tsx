import { ChatIcon, Search2Icon, CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Button,
  Image,
  Spacer,
  Card,
  CardBody,
  Stack,
  Center,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import image from "~/assets/shield.png";
import daysIcon from "~/assets/days-icon.png";
import shieldIcon from "~/assets/shield-icon.png";
import alertIcon from "~/assets/alert-icon.png";
import chatScreenshot from "~/assets/screenshot-chat.jpeg";
import inspectScreennshot from "~/assets/screenshot-inspect.jpeg";
import takedownScreennshot from "~/assets/screenshot-takedown.jpeg";
import socialPreviewFrontend from "~/assets/social-preview-frontend.jpg";
import socialPreviewSiteInspection from "~/assets/social-preview-site-inspection.jpg";
import socialPreviewScamChat from "~/assets/social-preview-scam-chat.jpg";
import { useState } from "react";

export default function Landing() {
  const [currImage, setCurrImage] = useState(chatScreenshot);
  return (
    <Container maxW="container.lg" mt={40}>
      <Flex alignItems="center">
        <Box maxW="md">
          <Heading as="h1" mb={8}>
            Help to Fight Scams
          </Heading>
          <Text>
            In Singapore, scams are increasingly prevalent on various platforms
            such as Telegram, WhatsApp & Instagram.
          </Text>
          <Text mt={5}>
            ScamSword attempts to tackle scams in Singapore through offensive
            strategies to gather intel from scam messages.
          </Text>
          <Link
            _hover={{ textDecoration: "none" }}
            isExternal
            href="https://www.straitstimes.com/singapore/scam-victims-in-s-pore-lost-6607-million-in-2022-almost-13-billion-in-past-two-years"
          >
            <Button
              mt={8}
              bgColor="#458DC8"
              color="white"
              w={177}
              h={42}
              _hover={{ bgColor: "#397CB2" }}
            >
              Read More
            </Button>
          </Link>
        </Box>
        <Spacer />
        <Box boxSize="md" display={{ base: "none", lg: "flex" }}>
          <Image src={image} />
        </Box>
      </Flex>
      <SimpleGrid columns={3} spacing={10} mt={20}>
        <Flex alignItems="center" mr={17}>
          <Image src={daysIcon} w={90} mr={5} />
          <Spacer />
          <Box maxW="md">
            <Heading size="lg" mb={2}>
              S$660.7m
            </Heading>
            <Text fontSize="sm">lost in 2022, as compared to 632m in 2021</Text>
          </Box>
        </Flex>
        <Flex alignItems="center" mr={17}>
          <Image src={shieldIcon} w={90} mr={5} />
          <Spacer />
          <Box maxW="md">
            <Heading size="lg" mb={2}>
              &gt; 53%
            </Heading>
            <Text fontSize="sm">
              of the victims were between 20-39 years old
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Image src={alertIcon} w={90} mr={5} />
          <Spacer />
          <Box maxW="md">
            <Heading size="lg" mb={2}>
              7,097
            </Heading>
            <Text fontSize="sm">
              phishing scam cases in 2022, a 41.3% spike from 2021
            </Text>
          </Box>
        </Flex>
      </SimpleGrid>
      <Flex alignItems="center" mt={80} mb={20}>
        <Box maxW="400">
          <Heading as="h1" mb={8}>
            How Does This Work
          </Heading>
          <Card
            mt={6}
            borderRadius="xl"
            _hover={{
              boxShadow: "md",
              borderColor: "#94BDDF",
            }}
            border="2px"
            borderColor="transparent"
            cursor="pointer"
            onClick={(e) => setCurrImage(chatScreenshot)}
          >
            <CardBody>
              <Flex alignItems="center">
                <ChatIcon color="blackAlpha.900" boxSize={5} mr={6} />
                <Stack>
                  <Heading size="sm">Chat Anonymously with Scammers</Heading>
                  <Text fontSize="xs">
                    Chat with scammers through canary accounts at no risks
                  </Text>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
          <Card
            mt={6}
            borderRadius="xl"
            _hover={{
              boxShadow: "md",
              borderColor: "#94BDDF",
            }}
            border="2px"
            borderColor="transparent"
            cursor="pointer"
            onClick={(e) => setCurrImage(inspectScreennshot)}
          >
            <CardBody>
              <Flex alignItems="center">
                <Search2Icon color="blackAlpha.900" boxSize={5} mr={6} />
                <Stack>
                  <Heading size="sm">Inspect Suspicious Sites</Heading>
                  <Text fontSize="xs">
                    Inspect suspicious links to identify phishing activities
                  </Text>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
          <Card
            mt={6}
            borderRadius="xl"
            _hover={{
              boxShadow: "md",
              borderColor: "#94BDDF",
            }}
            border="2px"
            borderColor="transparent"
            cursor="pointer"
            onClick={(e) => setCurrImage(takedownScreennshot)}
          >
            <CardBody>
              <Flex alignItems="center">
                <CalendarIcon
                  color="blackAlpha.900"
                  boxSize={5}
                  ml={2}
                  mr={6}
                />
                <Stack>
                  <Heading size="sm">Take down Phishing Sites </Heading>
                  <Text fontSize="xs">
                    Report phishing sites to various service providers
                  </Text>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
        </Box>
        <Spacer />
        <Box
          ml={20}
          p={0}
          borderRadius={20}
          borderBottomLeftRadius={20}
          boxShadow="-70px 190px 200px 10px #D9EFEF"
          position="absolute"
          right={0}
          zIndex={-100}
        >
          <Image
            src={currImage}
            boxShadow="-5px 5px 10px 1px #D9DADA"
            borderTopLeftRadius={20}
            borderBottomLeftRadius={20}
            mt={10}
            h="70vh"
            w="50vw"
            objectFit="cover"
            objectPosition="left"
          />
        </Box>
      </Flex>
      <Box h={280}></Box>
      <Flex flexDirection="column">
        <Center>
          <Heading textAlign="center" mb={3}>
            GitHub Repositories
          </Heading>
        </Center>
        <Center>
          <Text w={300} textAlign="center" fontSize="sm">
            Take a look to find out more!
          </Text>
        </Center>
      </Flex>
      <Flex alignItems="center" mt={5} mb={40}>
        <Card
          maxW="sm"
          mr={10}
          boxShadow="none"
          bgColor="transparent"
          _hover={{ boxShadow: "md" }}
        >
          <Link
            href="https://github.com/FYP-ScamSword/frontend"
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <CardBody>
              <Image src={socialPreviewFrontend} borderRadius="md" />
              <Flex mt={3}>
                <Text color="blackAlpha.700" fontSize="xs">
                  Frontend - Chakra UI, Remix
                </Text>
                <Spacer />
                <Text color="blackAlpha.700" fontSize="xs">
                  11 Feb 2023
                </Text>
              </Flex>
              <Heading size="sm" mt={2}>
                ScamSword - Frontend
              </Heading>
            </CardBody>
          </Link>
        </Card>
        <Spacer />
        <Card
          maxW="sm"
          mr={10}
          boxShadow="none"
          bgColor="transparent"
          _hover={{ boxShadow: "md" }}
        >
          <Link
            href="https://github.com/FYP-ScamSword/site-inspect"
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <CardBody>
              <Image src={socialPreviewSiteInspection} borderRadius="md" />
              <Flex mt={3}>
                <Text color="blackAlpha.700" fontSize="xs">
                  Site Inspect - ExpressJS, Python
                </Text>
                <Spacer />
                <Text color="blackAlpha.700" fontSize="xs">
                  25 Feb 2023
                </Text>
              </Flex>
              <Heading size="sm" mt={2}>
                ScamSword - Site Inspect
              </Heading>
            </CardBody>
          </Link>
        </Card>
        <Spacer />
        <Card
          maxW="sm"
          mr={10}
          boxShadow="none"
          bgColor="transparent"
          _hover={{ boxShadow: "md" }}
        >
          <Link
            href="https://github.com/FYP-ScamSword/scam-chat"
            isExternal
            _hover={{ textDecoration: "none" }}
          >
            <CardBody>
              <Image src={socialPreviewScamChat} borderRadius="md" />
              <Flex mt={3}>
                <Text color="blackAlpha.700" fontSize="xs">
                  Scam Chat - ExpressJS, GramJS
                </Text>
                <Spacer />
                <Text color="blackAlpha.700" fontSize="xs">
                  15 Mar 2023
                </Text>
              </Flex>
              <Heading size="sm" mt={2}>
                ScamSword - Scam Chat
              </Heading>
            </CardBody>
          </Link>
        </Card>
      </Flex>
    </Container>
  );
}
