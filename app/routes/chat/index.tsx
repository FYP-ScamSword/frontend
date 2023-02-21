import {
  Box,
} from "@chakra-ui/react";
import Nav from "~/shared/nav";
import ChatPage from "~/components/chat/ChatPage";

export default function Chat() {
  return (
    <Box>
      <Nav />
      <ChatPage />
    </Box>
  );
}
