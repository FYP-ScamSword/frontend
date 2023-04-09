import * as dialogflow from "dialogflow";
const projectId = "scamchatagent-txtw";
const credentials = {
  client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
  private_key: process.env.DIALOGFLOW_PRIVATE_KEY,
};
const sessionClient = new dialogflow.SessionsClient({
  projectId,
  credentials,
});

export const retrieveChats = async (phone_num: string) => {
  return await fetch(
    `${process.env.SCAMCHAT_BACKEND}/chat/get_chats/${phone_num}`
  ).then((res) => res.json());
};

export const retrieveMessages = async (phone_num: string, chat_id: string) => {
  return await fetch(
    `${process.env.SCAMCHAT_BACKEND}/msg/bychatID/${phone_num}/${chat_id}`
  ).then((res) => res.json());
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

  return await sessionClient.detectIntent(request);
  // .then((responses) => {
  //   const result = responses[0].queryResult;
  //   console.log("Dialogflow response:");
  //   console.log(JSON.parse(result.fulfillmentText));
  //   return JSON.parse(result.fulfillmentText);
  // })
  // .catch((err) => {
  //   console.error("Dialogflow error:", err);
  // });
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
