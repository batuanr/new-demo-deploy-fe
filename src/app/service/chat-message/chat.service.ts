import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from '../../model/chat/Message';
import {MessageAccountResponse} from '../../model/chat/MessageAccountResponse';
import {TokenService} from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private API_URL = environment.API;

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }
  getListMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(this.API_URL);
  }
  createMessage(message: Message): Observable<Message> {
    return this.http.post<Message>(this.API_URL + '/chats', message);
  }

  getListMessageByAccountId(): Observable<MessageAccountResponse[]> {
    return this.http.get<MessageAccountResponse[]>(this.API_URL + '/chats/show-chat-account/' + this.tokenService.getIdKey());
  }

  showChatLogById(id: number): Observable<Message[]> {
    return this.http.get<Message[]>(this.API_URL + '/chats/' + this.tokenService.getIdKey() + '/' + id);
  }

  showAllMessage(): Observable<Message[]> {
    return this.http.get<Message[]>(this.API_URL + '/chats');
  }
}
