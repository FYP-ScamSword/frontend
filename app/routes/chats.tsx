import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { retrieveChats } from "~/server/scamchat.server";
import type Chat from "~/server/models/Chat";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

export const loader = async () => {
  let chats: Chat[] = [];
  let chatsError;

  try {
    chats = await retrieveChats("+6596719465");
  } catch (error) {
    chatsError = error;
  }
  return json({
    chats,
    chatsError,
  });
};
export default function Chats() {
  const { chats, chatsError } = useLoaderData<typeof loader>();
  return (
    <Box overflowY="hidden">
      <Grid
        h="calc(100vh - 60px)"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(10, 1fr)"
        gap={0}
      >
        <GridItem
          rowSpan={1}
          colSpan={3}
          p="10"
          borderRight="1px"
          borderColor="gray.200"
        >
          <Heading size="md">Just a friendly reminder... 😉</Heading>
          <Text pt="5">
            1 Never share any personal information
            <br />
            ajsdhaskdjhaskdskajhdksahdkashdkjahda
          </Text>
          <Text pt="5">2 Yada yada yada yada yada</Text>
        </GridItem>

        <GridItem
          rowSpan={1}
          colSpan={2}
          borderRight="1px"
          borderColor="gray.200"
          overflowY="scroll"
        >
          {chats.map((chat, i) => (
            <NavLink key={chat._id} to={chat.chat_id}>
              {({ isActive }) => (
                <Box
                  h="80px"
                  borderBottom="1px"
                  bg={isActive ? "blue.100" : ""}
                  _hover={isActive ? {} : { bg: "blue.50" }}
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
                          (chat.latest_message && chat.latest_message.length > 20 ? "..." : "")}
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </NavLink>
          ))}
        </GridItem>
        <GridItem rowSpan={1} colSpan={5}>
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
