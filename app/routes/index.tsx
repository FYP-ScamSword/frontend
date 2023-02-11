import {
  Box,
} from "@chakra-ui/react";
import Nav from "~/shared/nav";
import Landing from "~/components/index/Landing";

export default function Index() {
  return (
    <Box>
      <Nav />
      <Landing />
    </Box>
  );
}
