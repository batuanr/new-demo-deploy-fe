import {Gender} from './gender';

export class AccountDetail {
  id?: number;
  username?: string;
  name?: string;
  avatar?: string;
  phone?: string;
  hobbies?: string;
  email?: string;
  gender: Gender;
  address?: string;
  show: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(username: string, name: string, avatar: string, phone: string, hobbies: string, email: string, gender: Gender, address: string) {
    this.username = username;
    this.name = name;
    this.avatar = avatar;
    this.phone = phone;
    this.hobbies = hobbies;
    this.email = email;
    this.gender = gender;
    this.address = address;
  }
}
