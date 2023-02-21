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
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from '@chakra-ui/icons';

export default function ChatPage() {

  const messages = [
    {
      "type": 0,
      "message": '阿巴阿巴\n阿巴阿巴\n阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
      "date": "21/02/2023",
      "timestamp": '11:04 PM',
    },
    {
      "type": 0,
      "message": '阿巴阿巴',
      "date": "21/02/2023",
      "timestamp": '11:04 PM',
    },
    {
      "type": 0,
      "message": '阿巴阿巴',
      "date": "21/02/2023",
      "timestamp": '11:05 PM',
    },
    {
      "type": 1,
      "message": '阿巴阿巴',
      "date": "22/02/2023",
      "timestamp": '09:10 AM',
    },
    {
      "type": 1,
      "message": '阿巴阿巴\n阿巴阿巴\n阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴阿巴',
      "date": "22/02/2023",
      "timestamp": '09:12 AM',
    },
    {
      "type": 0,
      "message": '巴拉巴拉',
      "date": "22/02/2023",
      "timestamp": '10:04 AM',
    },
    {
      "type": 0,
      "message": '巴拉巴拉',
      "date": "22/02/2023",
      "timestamp": '10:14 AM',
    },
    {
      "type": 1,
      "message": '巴拉巴拉小魔仙',
      "date": "22/02/2023",
      "timestamp": '10:52 AM',
    },
  ]

  const contacts = [
    {
      "contact_name": "scammer-san dame desu",
      "messages": messages,
      "selected": true
    },
    {
      "contact_name": "scammer2-san",
      "messages": messages,
      "selected": false
    },
    {
      "contact_name": "scammer3-san",
      "messages": messages,
      "selected": false
    }
  ]

  contacts.forEach((contact) => {
    var limit = 6;

    var messagesLength = contact["messages"].length;
    contact["preview"] = contact["messages"][messagesLength - 1].message.slice(0, limit);
    if (contact["messages"][messagesLength - 1].message.length > limit) {
      contact["preview"] = contact["preview"] + "..."
    }
  });

  var messageDateDict = messages.reduce(function (r, a) {
    r[a.date] = r[a.date] || [];
    r[a.date].push(a);
    return r;
  }, Object.create(null));

  const sortMessagesByDate = [];

  Object.keys(messageDateDict).forEach((date) => {
    sortMessagesByDate.push({"date": date, "messages": messageDateDict[date]});
  });

  return (
    <Grid
      h='calc(100vh - 60px)'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(10, 1fr)'
      gap={0}
    >
      {/* info area */}
      <GridItem rowSpan={1} colSpan={3} p='10' borderRight='1px' borderColor='gray.200'>
        <Heading size='md'>Just a friendly reminder... 😉</Heading>
        <Text pt='5'>1 Never share any personal information<br/>ajsdhaskdjhaskdskajhdksahdkashdkjahda</Text>
        <Text pt='5'>2 Yada yada yada yada yada</Text>
      </GridItem>

      {/* contact area */}
      <GridItem rowSpan={1} colSpan={2} borderRight='1px' borderColor='gray.200' overflowY="scroll">

        { contacts.map((contact) => (
          contact.selected ?
          <Box h='80px' borderBottom='1px' bg="blue.100" borderBottomColor='gray.200' pl='3' pt='5' pb='5'>
            <Flex>
              <Avatar className="scammerAvatar" size='sm' mr='3' src='https://bit.ly/dan-abramov' />
              <SimpleGrid columns={1}>
                <Heading id="scammerName" fontSize='md'>{contact["contact_name"]}</Heading>
                <Text fontSize='md'>{contact["preview"]}</Text>
              </SimpleGrid>
            </Flex>
          </Box> :
          <Box h='80px' borderBottom='1px' _hover={{ bg: "blue.50" }} borderBottomColor='gray.200' pl='3' pt='5' pb='5'>
            <Flex>
              <Avatar className="scammerAvatar" size='sm' mr='3' src='https://bit.ly/dan-abramov' />
              <SimpleGrid columns={1}>
              <Heading fontSize='md'>{contact["contact_name"]}</Heading>
              <Text fontSize='md'>{contact["preview"]}</Text>
              </SimpleGrid>
            </Flex>
        </Box>
        ))}
      </GridItem>

      {/* Chat area */}
      <GridItem rowSpan={1} colSpan={5}>
        <Box h='60px' borderBottom='1px' borderBottomColor='gray.200'>
          <Center h='60px'><Heading fontSize='lg'>scammer-san dame desu</Heading></Center>
        </Box>
        <Box h='calc(100vh - 160px)' bg='white' p='5' pt='0' overflowY="scroll">

          {sortMessagesByDate.map((messagesByDate, i) => (
            <><Center className="chatDate">
              <Box pl='3' pr='3' pt='1' pb='1' mt='3' borderRadius='15' bg='#ECECEC'><Text fontSize='sm' color='#5A5A5A'>{messagesByDate["date"]}</Text></Box>
            </Center>
            {messagesByDate["messages"].map((message) => (
              message.type == 0 ?
              <Flex pt='5' className="receiveMsg">
                <Avatar className="scammerAvatar" mr='5' src='https://bit.ly/dan-abramov' />
                <Box bg='#F2F2F7' p='3' w='300px' borderRadius='5'>
                  <Text>
                    {message.message}
                  </Text>
                  <Flex pt='1'>
                    <Spacer />
                    <Text fontSize='xs'>{message.timestamp}</Text>
                  </Flex>
                </Box>
              </Flex> : 
              <Flex pt='5' className="sendMsg">
                <Spacer/>
                <Box bg='#007AFF' p='3' w='300px' borderRadius='5'>
                  <Text color="white">
                    {message.message}
                  </Text>
                  <Flex pt='1'>
                    <Spacer />
                    <Text fontSize='xs' color='white'>{message.timestamp}</Text>
                  </Flex>
                </Box>
                <Avatar className="userAvatar" ml='5' src='https://bit.ly/ryan-florence' />
              </Flex>
            ))}
            </>
          ))}
        </Box>
        
        {/* input area */}
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