export class MessageRequest {
  content?: string;
  dateSend?: string;
  idSender?: number;
  idReceiver?: number;


  constructor(content?: string, dateSend?: string, idSender?: number, idReceiver?: number) {
    this.content = content;
    this.dateSend = dateSend;
    this.idSender = idSender;
    this.idReceiver = idReceiver;
  }
}
