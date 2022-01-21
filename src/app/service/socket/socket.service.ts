import { Injectable } from '@angular/core';
import {Message} from '../../model/chat/Message';
import {HttpClient} from '@angular/common/http';
import {ChatService} from '../chat-message/chat.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../../environments/environment.prod';
import {MessageRequest} from '../../model/chat/MessageRequest';
import {BehaviorSubject, Observable} from 'rxjs';
import {TokenService} from '../token/token.service';
const API_URL = `${environment.API}`;
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  listChat: Message[] = [];
  newMessage: Message;
  stompClient: any; // phục vụ gọi api hay kết nối websocket của mình
  // private messageSource = new BehaviorSubject('Default message');
  // currentMessage = this.messageSource.asObservable();
  constructor(
    private http: HttpClient,
    private chatService: ChatService,
    private tokenService: TokenService
  ) { }
  connect(idCurrentUser: any, idReceiver: any) {
    const ws = new SockJS(`${API_URL}/ws`); // endpoint bên backend
    this.stompClient = Stomp.over(ws); // khởi tạo để kếtnối được
    this.stompClient.connect({}, () => { // gọi api của socket
      this.stompClient.subscribe('/topic/chat', data => { // hứng trả về của socket
        console.log(data + 'ffdgfdgfdgd')
        const message = JSON.parse(data.body);
        if ((idCurrentUser.toString() === message.idGuest.toString() && idReceiver.toString() === message.idReceiver.toString())
          || (idReceiver.toString() === message.idGuest.toString() && idCurrentUser.toString() === message.idReceiver.toString())) {
          this.listChat.push(message);
        }
      });
    });
  }
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }


  createProductUsingWs(message: MessageRequest) {
    console.log(message.idSender + 'fgfgdfdg')
    this.stompClient.send('/app/chats', {}, JSON.stringify(message));  // data dưới dạng string nên phải ép kiểu Product
  }
  get List() {
    return this.listChat;
  }
  set List(messages: Message[]){
    this.listChat = messages;
  }
}
