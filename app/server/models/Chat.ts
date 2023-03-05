export default class Chat {
  constructor(
    public phone_num: string,
    public chat_id: string,
    public contact_name: string,
    public total_messages: number,
    public _id?: string,
    public date?: string,
    public preview?: string
  ) {}
}
