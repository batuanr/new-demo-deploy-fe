export class MessageAccountResponse {
  idSender?: number;
  name?: string;
  avatar?: string;


  constructor(idSender?: number, name?: string, avatar?: string) {
    this.idSender = idSender;
    this.name = name;
    this.avatar = avatar;
  }
}
