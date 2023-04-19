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
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import Message from "~/server/models/Message";
import type MessageGroup from "~/server/models/MessageGroup";
import {
  fetchSuggestedResponses,
  retrieveMessages,
  sendMessage,
} from "~/server/scamchat.server";
import { type ActionFunction, json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { type LegacyRef, useRef, useEffect, useState } from "react";

import { inspectLink } from "~/server/inspect.server";
var CryptoJS = require("crypto-js");
const urlRegex = /(https?:\/\/[^\s]+)/g;

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.chatId, `params.chatId is required`);

  const bytes = CryptoJS.AES.decrypt(
    decodeURIComponent(params.chatId),
    process.env.SESSION_SECRET
  );
  var { phone_num, chat_id } = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  let messagesGroup: MessageGroup[] = [];
  let messagesGroupError;
  try {
    messagesGroup = await retrieveMessages(phone_num, chat_id);
    messagesGroup.forEach((chat) => {
      chat.messages.forEach((message) => {
        if (message.text) {
          message.text = message.text
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

          message.text = message.text.replace(urlRegex, (url) => {
            // try {
            //   inspectLink(url);
            // } catch (error) {
            //   console.error(error);
            // }
            const encodedUrl = encodeURIComponent(url);
            const inspectUrl = "/inspect/" + encodedUrl;
            return `<a 
            title="Click to Inspect"
            href="${inspectUrl}" 
            target="_blank"
            style="color:#458DC8; text-decoration:underline"  
            onmouseover="this.style.color='#397CB2'" 
            onmouseout="this.style.color='#458DC8'">${url}</a>`;
          });
        }
      });
    });
  } catch (error) {
    messagesGroupError = error;
  }

  const backend = process.env.SCAMCHAT_BACKEND;

  return json({
    phone_num,
    chat_id,
    backend,
    messagesGroup,
    messagesGroupError,
  });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();

  const latest_msg = formData.get("latest_msg");
  if (!latest_msg || latest_msg?.length === 0) {
    return ["oh i see", "ok", "i see", "interesting", "yes"];
  }
  const suggestedResponse = await fetchSuggestedResponses(
    latest_msg! as string
  );
  return suggestedResponse;
};
export default function ChatDetail() {
  const { phone_num, chat_id, backend, messagesGroup, messagesGroupError } =
    useLoaderData<typeof loader>();
console.log({ phone_num, chat_id, backend, messagesGroup, messagesGroupError })
  const suggestedResponses = useActionData<typeof action>();
  const toast = useToast();

  const [newMsg, setNewMsg] = useState<Message[]>([]);
  // const [dialogflowResponse, setDialogflowResponse] = useState<string[]>(suggestedResponse);

  const messagesEndRef: LegacyRef<HTMLDivElement> = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current!.scrollIntoView({ block: "end", inline: "nearest" });
  };

  const messageWithUser0 = messagesGroup.find(({ users }) => {
    const user = users.find(({ type }) => type === 0);
    return user !== undefined;
  });

  const firstName0 =
    messageWithUser0?.users.find(({ type }) => type === 0)?.firstname ?? "";

  // useEffect(() => {
  //   setNewMsg([]);
  // }, [backend, phone_num, chat_id]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${backend}/chat/new_msgs/${phone_num}/${chat_id}`
    );
    eventSource.addEventListener("message", (event) => {
      const data = JSON.parse(event.data) as Message;
      console.log(data);
      setNewMsg((prev) => [...prev, data]);

      data.text = data.text.replace(urlRegex, (url) => {
        inspectLink(url);
        const encodedUrl = encodeURIComponent(url);
        const inspectUrl = "/inspect/" + encodedUrl;
        return `<a 
        title="Click to Inspect"
        href="${inspectUrl}" 
        target="_blank"
        style="color:#458DC8; text-decoration:underline"  
        onmouseover="this.style.color='#397CB2'" 
        onmouseout="this.style.color='#458DC8'">${url}</a>`;
      });
    });

    window.addEventListener("beforeunload", handleRefresh);
    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };

    function handleRefresh() {
      eventSource.close();
    }
  }, [backend, phone_num, chat_id, setNewMsg]);

  useEffect(() => {
    scrollToBottom();
  }, [messagesGroup, newMsg]);

  const sendMsg = async (message: string) => {
    console.log(newMsg);
    setNewMsg((prev) => [
      ...prev,
      new Message(Math.random() + "", message, 1, "Now"),
    ]);

    await fetch(`${backend}/msg/sendTele`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_num: phone_num,
        chat_id: chat_id,
        text: message,
      }),
    });
  };
  function validateInput(value: string): string {
    // email regex
    const emailRegex = /^\S+@\S+\.\S+$/;

    // Singapore phone number regex
    const singaporePhoneRegex = /^(\+65)?[689]\d{7}$/;

    // credit card regex
    const creditCardRegex = /\b(?:\d[ -]*?){13,16}\b/;

    // bank details regex
    const bankDetailsRegex = /(?:\b\d{3}-\d{3}-\d{3}\b|\b\d{9}\b)/;

    // check if the input matches any of the regex
    if (value.match(emailRegex)) {
      return "This input contains an email address.";
    }
    if (value.match(singaporePhoneRegex)) {
      return "This input contains a Singapore phone number.";
    }
    if (value.match(creditCardRegex)) {
      return "This input contains a credit card number.";
    }
    if (value.match(bankDetailsRegex)) {
      return "This input contains bank details.";
    }
    return "";
  }
  if (messagesGroupError) {
    return (
      <Text color="red">
        Error: message cannot be retrieved {JSON.stringify(messagesGroupError)}
      </Text>
    );
  }
  return (
    <div>
      <Box bg="white">
        <Box h="60px" borderBottom="1px" borderBottomColor="gray.200">
          <Center h="60px">
            <Heading fontSize="lg">{firstName0}</Heading>
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
                  message.type === 0 ? (
                    <Flex pt="5" className="receiveMsg" key={message.msg_id}>
                      <Avatar
                        className="scammerAvatar"
                        mr="5"
                        src="https://bit.ly/dan-abramov"
                      />
                      <Box bg="#F2F2F7" p="3" w="300px" borderRadius="10">
                        <Text
                          dangerouslySetInnerHTML={{ __html: message.text }}
                        />
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
          {newMsg.map((message: Message) =>
            message.type === 0 ? (
              <Flex pt="5" className="receiveMsg" key={message.msg_id}>
                <Avatar
                  className="scammerAvatar"
                  mr="5"
                  src="https://bit.ly/dan-abramov"
                />
                <Box bg="#F2F2F7" p="3" w="300px" borderRadius="10">
                  <Text dangerouslySetInnerHTML={{ __html: message.text }} />
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
          <Box ref={messagesEndRef} h="4"></Box>
        </Box>

        {/* <Form method="post" id="msgForm" key={Math.random()} onSubmit={e=>setNewMsg([])}> */}
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
              <Form method="post">
                <input
                  type="hidden"
                  name="latest_msg"
                  value={
                    newMsg && newMsg.length !== 0 ? newMsg.pop()!.text : ""
                  }
                />
                <MenuButton
                  as={Button}
                  type="submit"
                  height="48px"
                  width="48px"
                  borderRadius="0"
                  background="white"
                  _hover={{ bg: "#D7E5F0" }}
                  textAlign="center"
                  borderRight="1px"
                  borderRightColor="gray.200"
                >
                  <QuestionOutlineIcon />
                </MenuButton>
              </Form>
              <MenuList>
                {suggestedResponses &&
                  suggestedResponses.map((suggestedResponse: string) => (
                    <MenuItem
                      key={suggestedResponse}
                      // onClick={ (e) =>  sendMsg(suggestedResponse)}
                    >
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
              onKeyDownCapture={async (e) => {
                if (e.key === "Enter") {
                  const inputElement = e.target as HTMLInputElement;
                  const error = validateInput(inputElement.value);
                  if (error.length !== 0) {
                    toast({
                      title: "Sensitive information detected",
                      description: error,
                      status: "warning",
                      position: "top-right",
                      duration: 9000,
                      isClosable: true,
                    });
                    inputElement.value = "";
                    return;
                  }
                  await sendMsg(inputElement.value);
                  inputElement.value = "";
                }
              }}
              // value={input}
              // onChange={(e) => setInput(e.target.value)}
            />

            <InputRightAddon
              as={Button}
              // onClick={(e) => {
              //   sendMsg();
              // }}
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
        {/* </Form> */}
      </Box>
      {/* input area */}
    </div>
  );
}
