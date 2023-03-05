export default class Message {
    constructor(
      public msg_id: string,
      public text: string,
      public type: number,
      public time: string,
      public _id?: string  
    ) {}
  }

