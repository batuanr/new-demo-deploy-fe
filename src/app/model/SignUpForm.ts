export class SignUpForm {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];


  constructor(name: string, username: string, email: string, password: string, confirmPassword: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.roles = ['user'];
  }
}
