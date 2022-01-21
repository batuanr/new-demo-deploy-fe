import { Injectable } from '@angular/core';
import {Message} from '../../model/chat/Message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  webSocket: WebSocket;
  chatMessages: Message[];
  constructor() {
  }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/topic/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };
    this.webSocket.onmessage = (event) => {
      const messageDTO = JSON.parse(event.data);
      this.chatMessages.push(messageDTO);
    };
    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }
  public sendMessage(chatMessage: Message) {
    this.webSocket.send(JSON.stringify(chatMessage));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
