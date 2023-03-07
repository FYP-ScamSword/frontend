import {
  Box,
  Flex,
  Text,
  Heading,
  Spacer,
  Center,
  Avatar,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { useLoaderData } from "@remix-run/react";
import Message from "~/server/models/Message";
import MessageGroup from "~/server/models/MessageGroup";
import { retrieveMessages } from "~/server/scamchat.server";
import { json, LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.chatId, `params.chatId is required`);

  let messagesGroup: MessageGroup[] = [];
  let messagesGroupError;
  messagesGroup = [
    new MessageGroup(
      "+6512345566",
      params.chatId,
      "gello",
      "akjsd",
      "sda",
      "25/2/2023",
      [
        new Message("aaa", "ooo", 0, "11:47 AM"),
        new Message("aaaa", "ooo", 1, "11:47 AM"),
      ]
    ),
  ];
  return json({ messagesGroup, messagesGroupError });
  try {
    messagesGroup = await retrieveMessages("+6596719465", params.chatId);
  } catch (error) {
    messagesGroupError = error;
  }
  return json({
    messagesGroup,
    messagesGroupError,
  });
};
export default function ChatDetail() {
  const { messagesGroup, messagesGroupError } = useLoaderData<typeof loader>();
  console.log(messagesGroup);

  // contacts.forEach((contact) => {
  //   let limit = 6;

  //   let messagesLength = contact["messages"].length;
  //   contact["preview"] = contact["messages"][messagesLength - 1].message.slice(
  //     0,
  //     limit
  //   );
  //   if (contact["messages"][messagesLength - 1].message.length > limit) {
  //     contact["preview"] = contact["preview"] + "...";
  //   }
  // });

  // let messageDateDict = messages.reduce(function (r, a) {
  //   r[a.date] = r[a.date] || [];
  //   r[a.date].push(a);
  //   return r;
  // }, Object.create(null));

  // const sortMessagesByDate: Chat[] = [];

  // Object.keys(messageDateDict).forEach((date) => {
  //   sortMessagesByDate.push({ date: date, messages: messageDateDict[date] });
  // });

  return (
    <div>
      <Box h="60px" borderBottom="1px" borderBottomColor="gray.200">
        <Center h="60px">
          <Heading fontSize="lg">scammer-san dame desu</Heading>
        </Center>
      </Box>
      <Box h="calc(100vh - 160px)" bg="white" p="5" pt="0" overflowY="scroll">
        {messagesGroup.map((messageGroup, i) => (
          <>
            <Center className="chatDate">
              <Box
                pl="3"
                pr="3"
                pt="1"
                pb="1"
                mt="3"
                borderRadius="15"
                bg="#ECECEC"
              >
                <Text fontSize="sm" color="#5A5A5A">
                  {messageGroup.date}
                </Text>
              </Box>
            </Center>
            {messageGroup.messages.map((message: Message) =>
              message.type == 0 ? (
                <Flex pt="5" className="receiveMsg" key={message.msg_id}>
                  <Avatar
                    className="scammerAvatar"
                    mr="5"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Box bg="#F2F2F7" p="3" w="300px" borderRadius="10">
                    <Text>{message.text}</Text>
                    <Flex pt="1">
                      <Spacer />
                      <Text fontSize="xs">{message.time}</Text>
                    </Flex>
                  </Box>
                </Flex>
              ) : (
                <Flex pt="5" className="sendMsg" key={message.msg_id}>
                  <Spacer />
                  <Box bg="#007AFF" p="3" w="300px" borderRadius="10">
                    <Text color="white">{message.text}</Text>
                    <Flex pt="1">
                      <Spacer />
                      <Text fontSize="xs" color="white">
                        {message.time}
                      </Text>
                    </Flex>
                  </Box>
                  <Avatar
                    className="userAvatar"
                    ml="5"
                    src="https://bit.ly/ryan-florence"
                  />
                </Flex>
              )
            )}
          </>
        ))}
      </Box>

      {/* input area */}
      <Box h="40px">
        <InputGroup h="100%">
          <Menu>
            <MenuButton as={InputLeftAddon} _hover={{ bg: "#D7E5F0" }} id="suggestionsBtn"><QuestionOutlineIcon /></MenuButton>
            <MenuList>
              <MenuItem>
                <Box w='100%' mt='2' mb='2'>woohoo</Box>
              </MenuItem>
              <MenuItem>
                <Box w='100%' mt='2' mb='2'>yayyy</Box>
              </MenuItem>
              <MenuItem>
                <Box w='100%' mt='2' mb='2'>gimme money, my paynow is xxxx xxxx</Box>
              </MenuItem>
            </MenuList>
          </Menu>
          <Input
            h="100%"
            id="msgInput"
            placeholder="Make him angry..."
            borderRadius="0px"
            borderBottom="0px"
            borderRight="0px"
            borderLeft="0px"
          />
          <InputRightAddon bg="#F2F2F4" id="sendBtn" borderRadius="0px" _hover={{ bg: "#D7E5F0" }} >
            <ArrowForwardIcon />
          </InputRightAddon>
        </InputGroup>
      </Box>
    </div>
  );
}
