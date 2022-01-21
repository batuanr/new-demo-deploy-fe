export class Account {
  public id?: any;
  public username?: string;
  public name?: string;
  public avatar?: string;


  constructor(id?: any, username?: string, name?: string, avatar?: string) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.avatar = avatar;
  }


  get _id(): any {
    return this.id;
  }

  set _id(value: any) {
    this.id = value;
  }

  get _username(): string {
    return this.username;
  }

  set _username(value: string) {
    this.username = value;
  }

  get _name(): string {
    return this.name;
  }

  set _name(value: string) {
    this.name = value;
  }

  get _avatar(): string {
    return this.avatar;
  }

  set _avatar(value: string) {
    this.avatar = value;
  }
}
