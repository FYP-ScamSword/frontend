export default class Session {
  constructor(
    public user_id: string,
    public phone_num: string,
    public chat_id: string,
    public last_msg_time: string,
    public awaiting_scammer: boolean  
  ) {}
}