import { Box,Container } from "@chakra-ui/react";
import RecentReports from "~/components/inspect/RecentReports";
import LandingForm from "~/components/inspect/LandingForm";
import Nav from "~/shared/nav";
import { type ActionFunction, redirect } from "@remix-run/server-runtime";
import { inspectLink, getRecentScans } from "~/server/inspect.server";
import { useLoaderData } from "@remix-run/react";
import { json, type LoaderArgs } from "@remix-run/node";
import { connectToDatabase } from "~/server/mongodb/conn";
import InspectedLink from "~/server/models/InspectedLink";

export const loader = async ({params}:LoaderArgs) => {
  await connectToDatabase();

  let recentScans: InspectedLink[] = [];
  let recentScansErr;

  try {
    recentScans = (await getRecentScans()) as InspectedLink[];
  } catch (error) {
    recentScansErr = error;
  }

  return json({
    recentScans,
    recentScansErr
  });
};

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
  const { recentScans, recentScansErr } = useLoaderData<typeof loader>();

  return (
    <Box>
      <Nav />
      <Container maxW="container.lg" mt={16}>
        <LandingForm />
        <RecentReports recentScans={recentScans} recentScansErr={recentScansErr} />
      </Container>
    </Box>
  );
}
