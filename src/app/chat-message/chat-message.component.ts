import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from '../model/chat/Message';

import {TokenService} from '../service/token/token.service';
import {ChatService} from '../service/chat-message/chat.service';
import {ProfileService} from '../profile/service/profile.service';
import {Router} from '@angular/router';
import {MessageAccountResponse} from '../model/chat/MessageAccountResponse';
import {SocketService} from '../service/socket/socket.service';
import {FormControl, FormGroup} from '@angular/forms';
import {WebSocketService} from '../service/web-socket/web-socket.service';
import {MessageRequest} from '../model/chat/MessageRequest';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('message') public messenger: ElementRef;
  @Input()
  messageDetail: Message[];
  nameReceiver: any;
  @Input()
  idAccountChat: any;

  @Input()
  chatMessageAccount: MessageAccountResponse;
  avatarAccountChat: string;
  nameAccountChat: string;
  idAccount = this.tokenService.getIdKey();
  nameAccount = this.tokenService.getName();
  avatarAccount = this.tokenService.getAvatar();
  messageForm: FormGroup = new FormGroup( {
    content: new FormControl(),
    dateSend: new FormControl(),
    idSender: new FormControl(),
   idReceiver: new FormControl()
  });
  message: MessageRequest = {};
  // form: any;

  constructor(
    chatService: ChatService,
    private tokenService: TokenService,
    private profileService: ProfileService,
    private router: Router,
    private socketService: SocketService,
    private messageService: ChatService
  ) {
  }

  ngOnDestroy(): void {
        this.socketService.disconnect();
    }

  ngOnInit(): void {
    setTimeout(() => {
    this.findAccountById();
  }, 3000);
  }

  scrollToBottom(): void {
    try {
      console.log('test scro;;jp[ooooooo');
      this.messenger.nativeElement.scrollTop = this.messenger.nativeElement.scrollHeight;
    } catch (ee) {
      console.log('tlôiioiooioooooo');
    }
  }
findAccountById() {
  this.idAccountChat = this.chatMessageAccount.idSender;
  this.profileService.findAccountById(this.idAccountChat).subscribe(data => {
        this.avatarAccountChat = data.avatar;
        this.nameAccountChat  = data.name;
      });
}


createMessage() {
   this.messageForm.value.dateSend = Date.now().toString();
   this.messageForm.value.idSender = this.idAccount;
   this.messageForm.value.idReceiver = this.chatMessageAccount.idSender;
   this.socketService.createProductUsingWs(this.messageForm.value);
   this.messageForm.value.content = '';
  // this.messageService.showChatLogById(this.chatMessageAccount.idSender).subscribe(data => {
  //   this.messageDetail = data;
  //   this.scrollBottom();
  // });
   this.scrollToBottom();
   this.messageForm.controls.content.reset();
}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

}
