import { Injectable } from '@angular/core';
import {Notifications} from '../../../model/Notifications';
import {environment} from '../../../../environments/environment.prod';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {TokenService} from '../../../service/token/token.service';
const API_URL = `${environment.API}`;
@Injectable({
  providedIn: 'root'
})
export class NotificationSocketService {
  countNewNotification: number;
  notificationList: Notifications[] = [];
  notification: Notifications;
  stompClient: any;
  constructor(
    private tokenService: TokenService
  ) { }

  connect() {
    const currentId = +this.tokenService.getIdKey();
    const ws = new SockJS(`${API_URL}/ws`); // endpoint bên backend
    this.stompClient = Stomp.over(ws); // khởi tạo để kếtnối được
    this.stompClient.connect({}, () => { // gọi api của socket
      this.stompClient.subscribe('/topic/notification', data => { // hứng trả về của socket
        const notification = JSON.parse(data.body);
        if (currentId === notification.account.id){
          this.notificationList.unshift(notification);
          this.countNewNotification = this.countNewNotification + 1;
        }
      });
    });
  }
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }
  createNotification(notification: Notifications){
    console.log(notification);
    this.stompClient.send('/app/notification', {}, JSON.stringify(notification));  // data dưới dạng string nên phải ép kiểu Product
  }

  get List(): Notifications[] {
    return this.notificationList;
  }

  set List(value: Notifications[]) {
    this.notificationList = value;
  }
}
