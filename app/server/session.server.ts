import { createCookieSessionStorage, redirect } from "@remix-run/node";

const USER_SESSION_KEY = "userId";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  },
});

export async function getUserId(
  request: Request
) {
  const session = await getSession(request);
  const userId = session.get(USER_SESSION_KEY);
  console.log(userId);
  return userId;
}

export async function requireUserId(
  request: Request,
) {
  const userId = await getUserId(request);
  if (!userId) {
    throw redirect('/login');
  }
  return userId;
}

async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function createUserSession({
  request,
  userId,
}: {
  request: Request;
  userId: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect("/chats", {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}