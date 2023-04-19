import * as dialogflow from "dialogflow";
import type Chat from "./models/Chat";
import type Session from "./models/Session";
const projectId = "scamchatagent-txtw";
const credentials = {
  client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
};
const sessionClient = new dialogflow.SessionsClient({
  projectId,
  credentials,
});

export const retrieveChats = async (username: string) => {
  console.log(username);
  let existingSessionsPromise;
  try {
     existingSessionsPromise = await fetch(
      `${process.env.SCAMCHAT_BACKEND}/sessions/${username}`
    );
  } catch (err) {
    console.log(err);
    return
  }
  const existingSessions: Session[] = await existingSessionsPromise.json();
  console.log(existingSessions);

  const chatUrls: string[] = existingSessions.map(
    ({ phone_num, chat_id }) =>
      `${process.env.SCAMCHAT_BACKEND}/chat/get_by_id/${phone_num}/${chat_id}`
  );
  console.log(chatUrls);

  const chatPromises = await Promise.allSettled(
    chatUrls.map((url) => fetch(url))
  );
  console.log(chatPromises);

  const chats: Chat[] = [];
  for (const chatPromise of chatPromises) {
    if (chatPromise.status === "fulfilled") {
      chats.push((await chatPromise.value.json()) as Chat);
    }
    //TODO: error handling
  }
  console.log(chats);
  return chats;
};

export const retrieveMessages = async (phone_num: string, chat_id: string) => {
  const response = await fetch(
    `${process.env.SCAMCHAT_BACKEND}/msg/bychatID/${phone_num}/${chat_id}`
  );
  return await response.json();
};
export const fetchSuggestedResponses = async (input: string) => {
  const sessionId = "1";
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: input,
        languageCode: "en",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log(responses);
  const result = responses[0].queryResult;
  if (result.fulfillmentText === "No Results")
    return ["oh i see", "ok", "i see", "interesting", "yes"];
  return JSON.parse(result.fulfillmentText);
};

export const sendMessage = async (
  phone_num: string,
  chat_id: string,
  message: string
) => {
  return await fetch(`${process.env.SCAMCHAT_BACKEND}/msg/sendTele`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_num: phone_num,
      chat_id: chat_id,
      text: message,
    }),
  }).then((res) => console.log(res));
};

export const creatChatSession = async (username: string) => {
  return await fetch(`${process.env.SCAMCHAT_BACKEND}/sessions/${username}`, {
    method: "POST",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
