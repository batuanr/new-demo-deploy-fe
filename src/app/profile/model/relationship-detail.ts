import {AccountDetail} from './account-detail';

export class RelationshipDetail {
  id?: number;
  account1: AccountDetail;
  account2: AccountDetail;


  constructor(account1: AccountDetail, account2: AccountDetail) {
    this.account1 = account1;
    this.account2 = account2;
  }
}
