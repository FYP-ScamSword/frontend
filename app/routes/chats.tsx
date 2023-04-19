import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spacer,
  Text,
  Image,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { creatChatSession, retrieveChats } from "~/server/scamchat.server";
import type Chat from "~/server/models/Chat";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import image from "~/assets/chat.png";
import { AddIcon } from "@chakra-ui/icons";
import AddChatModal from "~/components/chats/AddChatModel";
import { getCurrentUser } from "~/server/auth.server";

var CryptoJS = require("crypto-js");

export const loader = async () => {
  const user = getCurrentUser();
  if (!user) {
    return redirect("/login");
  }

  let chats: Chat[] = [];
  let chatsError;

  try {
    chats = await retrieveChats(user.getUsername());
  } catch (error) {
    chatsError = error;
  }

  const key = process!.env.SESSION_SECRET;

  return json({
    chats,
    chatsError,
    key,
  });
};

export const action: ActionFunction = async () => {
  const user = getCurrentUser();
  if (!user) {
    return redirect("/login");
  }
  await creatChatSession(user.getUsername());

  return null;
};

export default function Chats() {
  const { chats, chatsError, key } = useLoaderData<typeof loader>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log({ chats, chatsError, key })
  return (
    <Box>
      <AddChatModal isOpen={isOpen} onClose={onClose} />
      <Grid
        overflowY="hidden"
        h="calc(100vh - 60px)"
        position="relative"
        templateColumns="repeat(10, 1fr)"
        gap={0}
      >
        <GridItem
          colSpan={3}
          p="8"
          borderRight="1px"
          borderColor="gray.200"
          overflowY="scroll"
        >
          <Heading size="lg">Chat with Scammers!</Heading>
          <Image src={image} pb="5" />
          <Heading size="md">Just a friendly reminder... 😉</Heading>
          <Text pt="5">1. Never share any personal information</Text>
          <Text pt="5">
            2. Do not click on any suspicious links or download any attachments.
          </Text>
          <Text fontSize="sm">
            Links in the chat will be sent to inspection. Clicking on the link
            will redirect you to the inspection page
          </Text>
          <Text pt="5">
            3. Stay vigilant and keep an eye out for common scammer tactics like
            urgency, fear-mongering, and unsolicited offers.
          </Text>
        </GridItem>

        <GridItem
          colSpan={2}
          borderRight="1px"
          borderColor="gray.200"
          overflowY="scroll"
        >
          <Flex p="4" alignItems="center" justifyContent="space-between">
            <Text as="b">Chats</Text>
            <IconButton
              size="sm"
              borderRadius="100%"
              colorScheme="blue"
              aria-label="Add Chat"
              variant="outline"
              icon={<AddIcon />}
              onClick={onOpen}
            />
          </Flex>

          {chats.map((chat, i) => (
            <NavLink
              key={chat._id}
              to={encodeURIComponent(
                CryptoJS.AES.encrypt(
                  JSON.stringify({
                    phone_num: chat.phone_num,
                    chat_id: chat.chat_id,
                  }),
                  key
                ).toString()
              )}
            >
              {({ isActive }) => (
                <Box
                  h="80px"
                  borderBottom="1px"
                  bg={isActive ? "gray.100" : ""}
                  _hover={isActive ? {} : { bg: "gray.50" }}
                  borderBottomColor="gray.200"
                  p="4"
                >
                  <Flex>
                    <Avatar
                      className="scammerAvatar"
                      size="sm"
                      mr="3"
                      src="https://bit.ly/dan-abramov"
                    />
                    <Flex direction="column" flex="1">
                      <Flex alignItems="top">
                        <Heading id="scammerName" fontSize="md">
                          {chat.contact_name}
                        </Heading>
                        <Spacer />
                        <Text fontSize="xs">
                          {formatDate(new Date(chat.updatedAt!))}
                        </Text>
                      </Flex>

                      <Text fontSize="md" isTruncated>
                        {chat.latest_message?.substring(0, 20) +
                          (chat.latest_message &&
                          chat.latest_message.length > 20
                            ? "..."
                            : "")}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </NavLink>
          ))}
        </GridItem>
        <GridItem colSpan={5}>
          {/* Individual Chat area */}
          <Outlet />
        </GridItem>
      </Grid>
    </Box>
  );
}

const formatDate = (input: Date) => {
  const now = new Date(); // current date and time
  const diffInMs = now.getTime() - input.getTime(); // difference in milliseconds between now and input

  if (input.toDateString() === now.toDateString()) {
    return input
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase();
  }
  // check if input datetime is within the current week
  else if (diffInMs < 7 * 24 * 60 * 60 * 1000) {
    return input.toLocaleDateString([], { weekday: "long" });
  }
  // input datetime is outside of the current week
  else {
    return input.toLocaleDateString("en-GB");
  }
};
