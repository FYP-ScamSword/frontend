import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Spacer,
  SimpleGrid,
  Center,
  Grid,
  GridItem,
  Avatar,
  Input,
  InputGroup,
  InputRightElement
} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function ChatPage() {
  return (
    <Grid
      h='calc(100vh - 60px)'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(10, 1fr)'
      gap={0}
    >
      <GridItem rowSpan={1} colSpan={3} p='10' borderRight='1px' borderColor='gray.200'>
        <Heading size='md'>Just a friendly reminder... 😉</Heading>
        <Text pt='5'>1 Never share any personal information<br/>ajsdhaskdjhaskdskajhdksahdkashdkjahda</Text>
        <Text pt='5'>2 Yada yada yada yada yada</Text>
      </GridItem>
      <GridItem rowSpan={1} colSpan={2} borderRight='1px' borderColor='gray.200' overflowY="scroll">
        <Box h='80px' borderBottom='1px' _hover={{ bg: "blue.100" }} borderBottomColor='gray.200' pl='3' pt='5' pb='5'>
          <Flex>
            <Avatar className="scammerAvatar" size='sm' mr='3' src='https://bit.ly/dan-abramov' />
            <SimpleGrid columns={1}>
            <Heading id="scammerName" fontSize='md'>scammer1-san</Heading>
            <Text fontSize='md'>阿巴阿巴</Text>
            </SimpleGrid>
          </Flex>
        </Box>
        <Box h='80px' borderBottom='1px' _hover={{ bg: "blue.100" }} borderBottomColor='gray.200' pl='3' pt='5' pb='5'>
          <Flex>
            <Avatar className="scammerAvatar" size='sm' mr='3' src='https://bit.ly/dan-abramov' />
            <SimpleGrid columns={1}>
            <Heading fontSize='md'>scammer1-san</Heading>
            <Text fontSize='md'>阿巴阿巴</Text>
            </SimpleGrid>
          </Flex>
        </Box>
        <Box h='80px' borderBottom='1px' _hover={{ bg: "blue.100" }} borderBottomColor='gray.200' pl='3' pt='5' pb='5'>
          <Flex>
            <Avatar className="scammerAvatar" size='sm' mr='3' src='https://bit.ly/dan-abramov' />
            <SimpleGrid columns={1}>
            <Heading fontSize='md'>scammer3-san</Heading>
            <Text fontSize='md'>阿巴阿巴</Text>
            </SimpleGrid>
          </Flex>
        </Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={5}>
        <Box h='60px' borderBottom='1px' borderBottomColor='gray.200'>
          <Center h='60px'><Text fontSize='lg'>scammer-san dame desu</Text></Center>
        </Box>
        <Box h='calc(100vh - 160px)' bg='white' p='5' pt='0' overflowY="scroll">
          {/* this is receive msg */}
          <Flex pt='5' className="receiveMsg">
              <Avatar className="scammerAvatar" mr='5' src='https://bit.ly/dan-abramov' />
              <Box bg='#F2F2F7' p='4' w='300px' borderRadius='5'>
                <Text>阿巴阿巴<br/>阿巴阿巴<br/>阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴</Text>
              </Box>
          </Flex>
          {/* --- */}

          <Flex pt='5' className="receiveMsg">
              <Avatar className="scammerAvatar" mr='5' src='https://bit.ly/dan-abramov' />
              <Box bg='#F2F2F7' p='4' w='300px' borderRadius='5'>
                <Text>阿巴阿巴</Text>
              </Box>
          </Flex>

          <Flex pt='5' className="receiveMsg">
              <Avatar className="scammerAvatar" mr='5' src='https://bit.ly/dan-abramov' />
              <Box bg='#F2F2F7' p='4' w='300px' borderRadius='5'>
                <Text>阿巴阿巴</Text>
              </Box>
          </Flex>

          {/* this is send msg */}
          <Flex pt='5' className="sendMsg">
            <Spacer/>
            <Box bg='#007AFF' p='4' w='300px' borderRadius='5'>
              <Text color="white">阿巴阿巴</Text>
            </Box>
            <Avatar className="userAvatar" ml='5' src='https://bit.ly/ryan-florence' />
          </Flex>
          {/* --- */}

          <Flex pt='5' className="sendMsg">
            <Spacer/>
            <Box bg='#007AFF' p='4' w='300px' borderRadius='5'>
              <Text color="white">阿巴阿巴<br/>阿巴阿巴<br/>阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴</Text>
            </Box>
            <Avatar className="userAvatar" ml='5' src='https://bit.ly/ryan-florence' />
          </Flex>

          <Flex pt='5' className="receiveMsg">
              <Avatar className="scammerAvatar" mr='5' src='https://bit.ly/dan-abramov' />
              <Box bg='#F2F2F7' p='4' w='300px' borderRadius='5'>
                <Text>巴拉巴拉</Text>
              </Box>
          </Flex>

          <Flex pt='5' className="receiveMsg">
              <Avatar className="scammerAvatar" mr='5' src='https://bit.ly/dan-abramov' />
              <Box bg='#F2F2F7' p='4' w='300px' borderRadius='5'>
                <Text>巴拉巴拉</Text>
              </Box>
          </Flex>

          <Flex pt='5' className="sendMsg">
            <Spacer/>
            <Box bg='#007AFF' p='4' w='300px' borderRadius='5'>
              <Text color="white">巴拉巴拉小魔仙</Text>
            </Box>
            <Avatar className="userAvatar" ml='5' src='https://bit.ly/ryan-florence' />
          </Flex>
        </Box>
        <Box h='40px'>
        <InputGroup h='100%'>
            <Input h='100%' id="msgInput" placeholder='Make him angry...' borderRadius='0px' borderBottom="0px" borderRight="0px" borderLeft="0px" />
            <InputRightElement>
              <Button bg='#F2F2F4' id="sendBtn" borderRadius="0px">
                <ArrowForwardIcon />
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </GridItem>
    </Grid>
  );
}