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
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Form, useLoaderData } from "@remix-run/react";
import type Message from "~/server/models/Message";
import type MessageGroup from "~/server/models/MessageGroup";
import {
  fetchSuggestedResponses,
  retrieveMessages,
  sendMessage,
} from "~/server/scamchat.server";
import { type ActionFunction, json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { type LegacyRef, useRef, useEffect } from "react";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.chatId, `params.chatId is required`);

  let messagesGroup: MessageGroup[] = [];
  let messagesGroupError;
  try {
    messagesGroup = await retrieveMessages("+6584355906", params.chatId);
  } catch (error) {
    messagesGroupError = error;
  }

  const suggestedResponseObject = await fetchSuggestedResponses("hi");
  const suggestedResponses = JSON.parse(
    suggestedResponseObject[0]!.queryResult.fulfillmentText
  );
  return json({
    messagesGroup,
    messagesGroupError,
    suggestedResponses,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const message = String(formData.get("message"));
  if (message.length > 0) {
    await sendMessage("+6584355906", params.chatId!, message);
  }
  return null;
};
export default function ChatDetail() {
  const { messagesGroup, messagesGroupError, suggestedResponses } =
    useLoaderData<typeof loader>();

  const messagesEndRef: LegacyRef<HTMLDivElement> = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ block: "end", inline: "nearest" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesGroup]);
  
  if (messagesGroupError) {
    return (
      <Text color="red">
        Error: screenshot cannot be retrieved{" "}
        {JSON.stringify(messagesGroupError)}
      </Text>
    );
  }
  return (
    <div>
      <Box bg="white">
        <Box h="60px" borderBottom="1px" borderBottomColor="gray.200">
          <Center h="60px">
            <Heading fontSize="lg">
              {messagesGroup[0]
                ? messagesGroup[0].users.find(
                    (firstname: any) => firstname.type === 0
                  )?.firstname
                : ""}
            </Heading>
          </Center>
        </Box>
      </Box>
      <Box>
        <Box
          h="calc(100vh - 168px)"
          overflowY="scroll"
          position="absolute"
          w="50%"
          px="5"
        >
          {messagesGroup.map((messageGroup, i) => (
            <div key={messageGroup.chat_id + messageGroup.date}>
              <Center className="chatDate">
                <Box px="3" py="1" mt="3" borderRadius="15" bg="#ECECEC">
                  <Text fontSize="sm" color="#5A5A5A">
                    {messageGroup.date}
                  </Text>
                </Box>
              </Center>
              {messageGroup.messages
                .sort((a, b) => (a.msg_id < b.msg_id ? -1 : 1))
                .map((message: Message) =>
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
          <Box ref={messagesEndRef} h="4"></Box>
        </Box>
        <Form method="post" id="msgForm" key={Math.random()}>
          <Box
            w="50%"
            h="48px"
            borderTop="1px"
            borderTopColor="gray.200"
            position="fixed"
            bottom="0"
          >
            <InputGroup h="100%" variant="unstyled">
              <Menu>
                <MenuButton
                  as={Center}
                  width="48px"
                  _hover={{ bg: "#D7E5F0" }}
                  textAlign="center"
                  borderRight="1px"
                  borderRightColor="gray.200"
                >
                  <QuestionOutlineIcon />
                </MenuButton>
                <MenuList>
                  {suggestedResponses.map((suggestedResponse: string) => (
                    <MenuItem key={suggestedResponse}>
                      <Box w="100%" mt="2" mb="2">
                        {suggestedResponse}
                      </Box>
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Input
                name="message"
                h="100%"
                id="msgInput"
                placeholder="Make him angry..."
                px="4"
              />

              <InputRightAddon
                as={Button}
                type="submit"
                width="48px"
                _hover={{ bg: "#D7E5F0" }}
                textAlign="center"
                borderLeft="1px"
                borderLeftColor="gray.200"
              >
                <ArrowForwardIcon />
              </InputRightAddon>
            </InputGroup>
          </Box>
        </Form>
      </Box>
      {/* input area */}
    </div>
  );
}
