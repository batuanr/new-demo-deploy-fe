import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatService} from '../service/chat-message/chat.service';
import {MessageAccountResponse} from '../model/chat/MessageAccountResponse';
import {Message} from '../model/chat/Message';
import {TokenService} from '../service/token/token.service';
import {Router} from '@angular/router';
import {SocketService} from '../service/socket/socket.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {
  messageAccount: MessageAccountResponse;
  messageAccounts: MessageAccountResponse[];
  messageDetail: Message[];
  idAccount = this.tokenService.getIdKey();
  avatarAccountChat: string;
  constructor(
    private messageService: ChatService,
    private tokenService: TokenService,
    private router: Router,
    private socketService: SocketService
  ) { }

  ngOnInit(): void {
      this.messageService.getListMessageByAccountId().subscribe(data => {
        this.messageService.showChatLogById(data[0].idSender).subscribe(detail => {
          this.messageAccounts = data;
          this.messageAccount = this.messageAccounts[0];
          this.messageDetail = detail;

        });
      });

  }

  showChatLogById(messageAccount: MessageAccountResponse) {
    this.socketService.disconnect();
        this.messageService.showChatLogById(messageAccount.idSender).subscribe(data => {
          this.messageAccount = this.messageAccounts[this.messageAccounts.indexOf(messageAccount)];
          this.messageDetail = data;
          this.socketService.List = this.messageDetail;
        });
    console.log('ket qua la chat-messenger1' + messageAccount.idSender);
    console.log('ket qua la chat-messenger1' + this.idAccount);
    this.socketService.connect(this.idAccount, messageAccount.idSender);
    console.log('ket qua la chat-messenger2' + messageAccount.idSender);
    console.log('ket qua la chat-messenger2' + this.idAccount);
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
