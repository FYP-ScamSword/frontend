import Chat from "./models/Chat";
import Message from "./models/Message";
import { scamChatCollections } from "./mongodb/conn";

export const retrieveContacts = async () => {
  console.log("called")
  const contacts = (await scamChatCollections.chats?.find({}).toArray()) as unknown as Chat[];

  return contacts;
};
