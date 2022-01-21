import {Posting} from '../posting/model/posting';
import {Accounts} from './Accounts';


export class Notifications {
  id: number;
  content: string;
  sender: Accounts;
  account: Accounts;
  posting: Posting;
  date: string;
  status: boolean;
  type: number;


  constructor(content: string, sender: Accounts, account: Accounts, posting: Posting, status: boolean, type: number) {
    this.content = content;
    this.sender = sender;
    this.account = account;
    this.posting = posting;
    this.status = status;
    this.type = type;
  }
}
