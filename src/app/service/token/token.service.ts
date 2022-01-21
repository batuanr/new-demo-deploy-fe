import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
const AVATAR_KEY = 'Avatar_Key';
const ID_KEY = 'Id_Key';
const USERNAME_KEY = 'Username_Key';
const EMAIL_KEY = 'Email_Key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private _roles: Array<string> = [];
  constructor() { }
  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public setName(name: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }
  public getName(): string {
    return window.sessionStorage.getItem(NAME_KEY);
  }

  public setAvatar(avatar: string){
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }
  public getAvatar(): string{
    return window.sessionStorage.getItem(AVATAR_KEY);
  }
  public setRoles(roles: string[]) {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
  }
  public getRoles(): string[] {
    this._roles = [];
    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).focus(role => {
        this._roles.push(role.authority);
      });
    }
    return this._roles;
  }
  public getIdKey(): string{
   return window.sessionStorage.getItem(ID_KEY);
  }

  public setIdKey(id: string){
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, id);
  }

  public getUsername(): string{
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public setUsername(username: string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getEmail(): string{
    return window.sessionStorage.getItem(EMAIL_KEY);
  }

  public setEmail(email: string){
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, email);
  }


}
