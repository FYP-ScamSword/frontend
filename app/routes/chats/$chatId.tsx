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
import { json, type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import * as dialogflow from 'dialogflow';

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

export const fetchSuggestedResponses = (input: string) => {
  const projectId = 'scamchatagent-txtw';
  const credentials = {
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
  };
  const sessionClient = new dialogflow.SessionsClient({ projectId, credentials });

  const sessionId = '1';
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: input,
        languageCode: 'en',
      },
    },
  };
  
  sessionClient.detectIntent(request)
  .then(responses => {
    const result = responses[0].queryResult;
    console.log('Dialogflow response:');
    console.log(JSON.parse(result.fulfillmentText));
    return JSON.parse(result.fulfillmentText);
  })
  .catch(err => {
    console.error('Dialogflow error:', err);
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
          <Menu>
            <MenuButton as={InputLeftAddon} _hover={{ bg: "#D7E5F0" }} id="suggestionsBtn"><QuestionOutlineIcon /></MenuButton>
            <MenuButton as={InputLeftAddon} onClick={() => { console.log("button clicked") }} _hover={{ bg: "#D7E5F0" }} id="suggestionsBtn"><QuestionOutlineIcon /></MenuButton>
            <MenuList>
              <MenuItem>
                <Box w='100%' mt='2' mb='2'>a</Box>
              </MenuItem>
              <MenuItem>
                <Box w='100%' mt='2' mb='2'>b</Box>
              </MenuItem>
              <MenuItem>
                <Box w='100%' mt='2' mb='2'>c</Box>
              </MenuItem>
              {/* {suggestedResponse ? suggestedResponse.forEach((r) => {
                <MenuItem>
                  <Box w='100%' mt='2' mb='2'>{r}</Box>
                </MenuItem>
              }) : <> </> } */}
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
