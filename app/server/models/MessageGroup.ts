import type Message from "./Message";

export default class MessageGroup {
  constructor(
    public phone_num: string,
    public chat_id: string,
    public users: User[],
    public date: string,
    public messages: Message[]
  ) {}
}

class User {
  constructor(public firstname: string, public type: number) {}
}
