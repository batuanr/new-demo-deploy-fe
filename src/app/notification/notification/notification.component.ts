import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NotificationService} from '../service/notification.service';
import {TokenService} from '../../service/token/token.service';
import {Notifications} from '../../model/Notifications';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input()
  notifications: Notifications[] = [];
  @Output()
  posting = new EventEmitter();
  currentId: number;
  constructor(
    private notificationService: NotificationService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.currentId = +this.tokenService.getIdKey();
  }

  getPostingId(notification: Notifications) {
    this.posting.emit(notification);
    notification.status = true;
    this.notificationService.update(notification.id).subscribe();
  }
}
