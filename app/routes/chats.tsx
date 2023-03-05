import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Nav from "~/shared/nav";
import { connectToScamChatDatabase } from "~/server/mongodb/conn";
import { retrieveChats } from "~/server/scamchat.server";
import type Chat from "~/server/models/Chat";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";

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
  console.log(chats);
  return (
    <Box>
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
                  bg={isActive? "blue.100" : ""}
                  _hover={isActive? {} : { bg: "blue.50" }}
                  borderBottomColor="gray.200"
                  pl="3"
                  pt="5"
                  pb="5"
                >
                  <Flex>
                    <Avatar
                      className="scammerAvatar"
                      size="sm"
                      mr="3"
                      src="https://bit.ly/dan-abramov"
                    />
                    <SimpleGrid columns={1}>
                      <Heading id="scammerName" fontSize="md">
                        {chat.contact_name}
                      </Heading>
                      <Text fontSize="md">{chat.preview}</Text>
                    </SimpleGrid>
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
