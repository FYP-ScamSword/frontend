import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Spacer,
  Center,
  Avatar,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useLoaderData } from "@remix-run/react";
import Message from "~/server/models/Message";
import MessageGroup from "~/server/models/MessageGroup";
import { retrieveMessages } from "~/server/scamchat.server";
import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.chatId, `params.chatId is required`);

  let messagesGroup: MessageGroup[] = [];
  let messagesGroupError;
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
  return (
    <div>
      <Box h="calc(100vh - 160px)" bg="white" p="5" pt="0" overflowY="scroll">
            <Box h="60px" borderBottom="1px" borderBottomColor="gray.200">
              <Center h="60px">
                <Heading fontSize="lg">
                  {messagesGroup[0]? messagesGroup[0].users.find((firstname:any)=>firstname.type===0)?.firstname:""}
                </Heading>
              </Center>
            </Box>
        {messagesGroup.map((messageGroup, i) => (
          <div key={messageGroup.chat_id+messageGroup.date}>
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
          </div>
        ))}
      </Box>

      {/* input area */}
      <Box h="40px">
        <InputGroup h="100%">
          <Input
            h="100%"
            id="msgInput"
            placeholder="Make him angry..."
            borderRadius="0px"
            borderBottom="0px"
            borderRight="0px"
            borderLeft="0px"
          />
          <InputRightElement>
            <Button bg="#F2F2F4" id="sendBtn" borderRadius="0px">
              <ArrowForwardIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </div>
  );
}
