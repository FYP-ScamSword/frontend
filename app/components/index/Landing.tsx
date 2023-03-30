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
} from "@chakra-ui/react";
import image from "~/assets/shield.png";
import daysIcon from "~/assets/days-icon.png";
import shieldIcon from "~/assets/shield-icon.png";
import alertIcon from "~/assets/alert-icon.png";
import appScreenshot1 from "~/assets/app-screenshot-2.png";
import grey from "~/assets/grey.png";

export default function Landing() {

  return (
    <Container maxW="container.lg" mt={40}>
      <Flex alignItems="center">
        <Box maxW="md">
          <Heading as="h1" mb={8}>
            Help to Fight Scams
          </Heading>
          <Text>
            Some useful statistics like everyday how many Singaporeans are
            scammed, how much money lost etc etc
          </Text>
          <Button mt={8} bgColor="#458DC8" color="white" w={177} h={42} _hover={{bgColor:"#397CB2"}}>Learn How</Button>
        </Box>
        <Spacer />
        <Box boxSize="md" display={{ base: "none", lg: "flex" }}>
          <Image src={image} />
        </Box>
      </Flex>
      <SimpleGrid columns={3} spacing={10} mt={20}>
        <Flex alignItems="center" mr={17}>
          <Image src={daysIcon} w={90} mr={5} />
          <Spacer/>
          <Box maxW="md">
            <Heading size="lg" mb={2}>
              1,000+ days
            </Heading>
            <Text fontSize="sm">
              Time wasted on scamming scammers? 
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" mr={17}>
          <Image src={shieldIcon} w={90} mr={5} />
          <Spacer/>
          <Box maxW="md">
            <Heading size="lg" mb={2}>
              2
            </Heading>
            <Text fontSize="sm">
              Useful Statistics on something useful
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center">
          <Image src={alertIcon} w={90} mr={5} />
          <Spacer/>
          <Box maxW="md">
            <Heading size="lg" mb={2}>
              100+
            </Heading>
            <Text fontSize="sm">
              Scam/phishing links reported & taken down
            </Text>
          </Box>
        </Flex>
      </SimpleGrid>
      <Flex alignItems="center" mt={40} mb={20}>
        <Box maxW="400">
          <Heading as="h1" mb={8}>
            How Does This Work
          </Heading>
          <Text>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...
          </Text>
          <Card mt={6} borderRadius="xl" 
            _hover={{
              boxShadow: 'md',
              borderColor:"#94BDDF"
            }}
            border="2px"
            borderColor="transparent"
          >
            <CardBody>
              <Flex alignItems="center">
                <ChatIcon color='blackAlpha.900' boxSize={5} mr={6} />
                <Stack>
                  <Heading size="sm">Chat Anonymously with Scammers</Heading>
                  <Text fontSize="xs">Neque porro quisquam est qui dolorem ipsum quia dolor</Text>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
          <Card mt={6} borderRadius="xl" 
            _hover={{
              boxShadow: 'md',
              borderColor:"#94BDDF"
            }}
            border="2px"
            borderColor="transparent"
          >
            <CardBody>
              <Flex alignItems="center">
                <Search2Icon color='blackAlpha.900' boxSize={5} mr={6} />
                <Stack>
                  <Heading size="sm">Inspect Suspicious Links</Heading>
                  <Text fontSize="xs">Received suspicious links? Verify it through ScamSword</Text>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
          <Card mt={6} borderRadius="xl" 
            _hover={{
              boxShadow: 'md',
              borderColor:"#94BDDF"
            }}
            border="2px"
            borderColor="transparent"
          >
            <CardBody>
              <Flex alignItems="center">
                <CalendarIcon color='blackAlpha.900' boxSize={5} ml={2} mr={6} />
                <Stack>
                  <Heading size="sm">View Recent Trends</Heading>
                  <Text fontSize="xs">Learn about the latest scam techniques  </Text>
                </Stack>
              </Flex>
            </CardBody>
          </Card>
        </Box>
        <Spacer />
        <Box ml={20} p={0} borderTopLeftRadius={20} borderBottomLeftRadius={20} boxShadow="-70px 190px 200px 10px #D9EFEF">
          <Image src={appScreenshot1} boxShadow="-5px 5px 10px 1px #D9DADA" borderTopLeftRadius={20} borderBottomLeftRadius={20} mt={10} />
        </Box>
      </Flex>
      <Box h={10}></Box>
      <Flex flexDirection="column">
        <Center>
          <Heading textAlign="center" mb={3}>Read Our Resources</Heading>
        </Center>
        <Center>
          <Text w={300} textAlign="center" fontSize="sm">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</Text>
        </Center>
      </Flex>
      <Flex alignItems="center" mt={5} mb={40}>
        <Card 
          maxW='sm' 
          mr={10} 
          boxShadow="none" 
          bgColor="transparent"
          _hover={{boxShadow: 'md',}}
        >
          <CardBody>
            <Image
              src={grey}
              borderRadius='md'
            />
            <Flex mt={3}>
              <Text color="blackAlpha.700" fontSize="sm">Topic</Text>
              <Spacer />
              <Text color="blackAlpha.700" fontSize="sm">24 Jan 2023</Text>
            </Flex>
            <Heading size="sm" mt={2}>Neque porro quisquam est qui dolorem ipsum quia </Heading>
          </CardBody>
        </Card>
        <Spacer />
        <Card 
          maxW='sm' 
          mr={10} 
          boxShadow="none" 
          bgColor="transparent"
          _hover={{boxShadow: 'md',}}
        >
          <CardBody>
            <Image
              src={grey}
              borderRadius='md'
            />
            <Flex mt={3}>
              <Text color="blackAlpha.700" fontSize="sm">Topic</Text>
              <Spacer />
              <Text color="blackAlpha.700" fontSize="sm">24 Jan 2023</Text>
            </Flex>
            <Heading size="sm" mt={2}>Neque porro quisquam est qui dolorem ipsum quia </Heading>
          </CardBody>
        </Card>
        <Spacer />
        <Card 
          maxW='sm' 
          mr={10} 
          boxShadow="none" 
          bgColor="transparent"
          _hover={{boxShadow: 'md',}}
        >
          <CardBody>
            <Image
              src={grey}
              borderRadius='md'
            />
            <Flex mt={3}>
              <Text color="blackAlpha.700" fontSize="sm">Topic</Text>
              <Spacer />
              <Text color="blackAlpha.700" fontSize="sm">24 Jan 2023</Text>
            </Flex>
            <Heading size="sm" mt={2}>Neque porro quisquam est qui dolorem ipsum quia </Heading>
          </CardBody>
        </Card>
      </Flex>
    </Container>
  );
}
