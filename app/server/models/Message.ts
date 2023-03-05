export default class Message {
    constructor(
      public phone_num: string,
      public chat_id: string,
      public msg_id: string,
      public sender_username: string,
      public sender_id: string,
      public sender_firstname: string,
      public text: string,
      public type: Number,
      public date: string,
      public time: string,
      public _id?: string
  
  
    ) {}
  }
  