import { json, type LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/server/session.server";

export const loader = async ({ request }:LoaderArgs) => {
  const userId = await requireUserId(request);

  return json({});
}

export default function ChatIndex() {

  return (
    <p>
      No chat selected. Select a chat on the left
    </p>
  );
}
