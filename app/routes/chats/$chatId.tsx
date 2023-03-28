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
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { useLoaderData } from "@remix-run/react";
import Message from "~/server/models/Message";
import MessageGroup from "~/server/models/MessageGroup";
import {
  fetchSuggestedResponses,
  retrieveMessages,
} from "~/server/scamchat.server";
import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

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

export default function ChatDetail() {
  const { messagesGroup, messagesGroupError, suggestedResponses } =
    useLoaderData<typeof loader>();
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
      <Box px="5" h="calc(100vh - 168px)" overflowY="scroll">
        {messagesGroup.map((messageGroup, i) => (
          <div key={messageGroup.chat_id + messageGroup.date}>
            <Center className="chatDate">
              <Box px="3" py="1" mt="3" borderRadius="15" bg="#ECECEC">
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
      <Box h="48px" borderTop="1px" borderTopColor="gray.200">
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
            h="100%"
            id="msgInput"
            placeholder="Make him angry..."
            px='4'
          />
          <InputRightAddon
            as={Center}
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
    </div>
  );
}
