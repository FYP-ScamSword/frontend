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
