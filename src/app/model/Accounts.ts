export class Accounts {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: any;
  phone: string;
  address: string;
  hobbies: string;
  gender: any;
  constructor(id?: number, name?: string, username?: string, email?: string, avatar?: string, role?: any, phone?: string, address?: string, hobbies?: string, gender?: any) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.role = role;
    this.phone = phone;
    this.address = address;
    this.hobbies = hobbies;
    this.gender = gender;
  }
}
