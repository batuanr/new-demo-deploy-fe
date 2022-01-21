export class UpdateInfoRequest {
  name?: string;
  email?: string;
  hobbies?: string;
  address?: string;
  phone?: string;


  constructor(name?: string, email?: string, hobbies?: string, address?: string, phone?: string) {
    this.name = name;
    this.email = email;
    this.hobbies = hobbies;
    this.address = address;
    this.phone = phone;
  }
}
