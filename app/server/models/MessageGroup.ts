import type Message from "./Message";

export default class MessageGroup {
  constructor(
    public phone_num: string,
    public chat_id: string,
    public sender_username: string,
    public sender_id: string,
    public sender_firstname: string,
    public date: string,
    public messages: Message[]
  ) {}
}
