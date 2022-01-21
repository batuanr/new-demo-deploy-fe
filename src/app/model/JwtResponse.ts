export class JwtResponse {
  public token: string;
  public name: string;
  public roles: any[];
  public id: string;
  public avatar: string;
  public username: string;
  public email: string;


  constructor(token: string, name: string, roles: any[], id: string, avatar: string, username: string, email: string) {
    this.token = token;
    this.name = name;
    this.roles = roles;
    this.id = id;
    this.avatar = avatar;
    this.username = username;
    this.email = email;
  }
}
