import { Box,Container } from "@chakra-ui/react";
import RecentReports from "~/components/inspect/RecentReports";
import LandingForm from "~/components/inspect/LandingForm";
import Nav from "~/shared/nav";

export default function Inspect() {
  return (
    <Box>
      <Nav />
      <Container maxW="container.lg" mt={16}>
        <LandingForm />
        <RecentReports />
      </Container>
    </Box>
  );
}
