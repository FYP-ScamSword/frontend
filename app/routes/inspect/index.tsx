import { Box,Container } from "@chakra-ui/react";
import RecentReports from "~/components/inspect/RecentReports";
import LandingForm from "~/components/inspect/LandingForm";
import Nav from "~/shared/nav";
import { type ActionFunction, redirect } from "@remix-run/server-runtime";
import { inspectLink } from "~/server/inspect.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const link = formData.get("link");

  // ✅ if any error just return
  if (link && typeof link !== "string") {
    return {
      errors: {
        general: "please enter a link",
      },
    };
  }

  await inspectLink(link as string);
  return redirect(`/inspect/${encodeURIComponent(link as string)}`);
};
export default function Inspect() {
  return (
    <Box>
      <Container maxW="container.lg" mt={16}>
        <LandingForm />
        <RecentReports />
      </Container>
    </Box>
  );
}
