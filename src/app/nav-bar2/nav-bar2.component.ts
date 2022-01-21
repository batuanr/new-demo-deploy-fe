import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../service/token/token.service';
import {ChangePasswordComponent} from '../form-login/change-password/change-password.component';
import {MatDialog} from '@angular/material/dialog';
import {ChangePasswordRequest} from '../model/ChangePasswordRequest';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../service/auth/auth.service';
import {UpdateInfoComponent} from '../change/update-info/update-info.component';
import {UpdateInfoRequest} from '../model/UpdateInfoRequest';
import {Notifications} from '../model/Notifications';
import {NotificationService} from '../notification/service/notification.service';
import {Posting} from '../posting/model/posting';
import {ChatService} from '../service/chat-message/chat.service';
import {ProfileService} from '../profile/service/profile.service';
import {AccountDetail} from '../profile/model/account-detail';
import {NotificationSocketService} from '../notification/service/socket/notification-socket.service';
import {MessageAccountResponse} from '../model/chat/MessageAccountResponse';
import {Message} from '../model/chat/Message';
import {SocketService} from '../service/socket/socket.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-nav-bar2',
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit, AfterViewChecked {
  @ViewChild('messenger') public messenger: ElementRef;
  id = window.sessionStorage.getItem('Id_Key');
  searchName = '';
// error for changePassword
  error1: any = {
    message: 'no_password'
  };
  error2: any = {
    message: 'success'
  };
// error for update info

  error3: any = {
    message: 'yes'
  };

  userSettings = document.querySelector('.user-settings');
  name: any;
  isCheckLogin = false;
  avatar: any;
  changePasswordRequest: ChangePasswordRequest = {
    oldPassword: '',
    newPassword: ''
  };


  updateInfoRequest: UpdateInfoRequest = {
    name: '',
    email: '',
    hobbies: '',
    address: '',
    phone: ''
  };
  notifications: Notifications[] = [];
  posting: Posting;
  currentId: number;
  countNewNotification = 0;
  private listPending: AccountDetail[];
  private sumPending: number;

  messageAccount: MessageAccountResponse;
  messageAccounts: MessageAccountResponse[];
  messageDetail: Message[];
  idAccount = this.tokenService.getIdKey();
  avatarAccountChat: string;
  nameAccountChat: string;

  messageForm: FormGroup = new FormGroup( {
    content: new FormControl(),
    dateSend: new FormControl(),
    idSender: new FormControl(),
    idReceiver: new FormControl()
  });

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private dialog: MatDialog,
    private authService: AuthService,
    private notificationService: NotificationService,
    private chatService: ChatService,
    private profileService: ProfileService,
    private notifiSocket: NotificationSocketService,
    private messageService: ChatService,
    private socketService: SocketService
  ) {
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.getListMessenger();
    if (this.tokenService.getToken()) {
      this.isCheckLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
    this.currentId = +this.tokenService.getIdKey();
    this.getAllNotification();
    this.showListPending();
    this.notifiSocket.connect();
  }
  scrollToBottom(): void {
    try {
      this.messenger.nativeElement.scrollTop = this.messenger.nativeElement.scrollHeight;
    } catch (ee) {
      console.log('iugfudutidxtrjyuitrrdutiyutrutyrsdyjfukgi')
    }
  }
  createMessage() {
    this.messageForm.value.dateSend = Date.now().toString();
    this.messageForm.value.idSender = this.idAccount;
    this.messageForm.value.idReceiver = this.messageAccount.idSender;
    this.socketService.createProductUsingWs(this.messageForm.value);
    this.messageForm.value.content = '';
    // this.messageService.showChatLogById(this.chatMessageAccount.idSender).subscribe(data => {
    //   this.messageDetail = data;
    //   this.scrollBottom();
    // });
    this.scrollToBottom();
    this.messageForm.controls.content.reset();
  }
  getListMessenger(){
    this.messageService.getListMessageByAccountId().subscribe(data => {
      this.messageService.showChatLogById(data[0].idSender).subscribe(detail => {
        this.messageAccounts = data;
        this.messageAccount = this.messageAccounts[0];
        this.messageDetail = detail;

      });
    });
  }
  findAccountById(id) {
    this.profileService.findAccountById(id).subscribe(data => {
      this.avatarAccountChat = data.avatar;
      this.nameAccountChat  = data.name;
    });
  }
  showChatLogById(messageAccount: MessageAccountResponse) {
    this.findAccountById(messageAccount.idSender);
    this.socketService.disconnect();
    this.messageService.showChatLogById(messageAccount.idSender).subscribe(data => {
      this.messageAccount = this.messageAccounts[this.messageAccounts.indexOf(messageAccount)];
      this.messageDetail = data;
      this.socketService.List = this.messageDetail;
    });
    // this.scrollToBottom();
    console.log('ket qua la chat-messenger1' + messageAccount.idSender);
    console.log('ket qua la chat-messenger1' + this.idAccount);
    this.socketService.connect(this.idAccount, messageAccount.idSender);
    console.log('ket qua la chat-messenger2' + messageAccount.idSender);
    console.log('ket qua la chat-messenger2' + this.idAccount);
    document.querySelector('.chat-box').classList.add('show');
  }
  logout(): void {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }

  UserSettingToggle(): void {
    alert(this.userSettings);
// @ts-ignore
  }

  openDialogChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
        width: '600px',
        data: {
          oldPassword: this.changePasswordRequest.oldPassword,
          newPassword: this.changePasswordRequest.newPassword
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.changePasswordRequest.oldPassword = result.oldPassword;
      this.changePasswordRequest.newPassword = result.newPassword;
      this.authService.changePassword(this.changePasswordRequest).subscribe(data => {
        if (JSON.stringify(data) === JSON.stringify(this.error1)) {
          alert('old password wrrong');
        }
        if (JSON.stringify(data) === JSON.stringify(this.error2)) {
          alert('Change password success!');
        }
      });
    });
  }


  navigateToProfile(id: string) {
    window.sessionStorage.setItem('Id_Profile', id);
    this.router.navigate(['/home/profile/' + id]).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });
  }

  openDialogUpdateInfo() {
    const dialogRef = this.dialog.open(UpdateInfoComponent, {
        width: '800px',
        data: {
          name: this.updateInfoRequest.name,
          email: this.updateInfoRequest.email,
          hobbies: this.updateInfoRequest.hobbies,
          address: this.updateInfoRequest.address,
          phone: this.updateInfoRequest.phone
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.updateInfoRequest.name = result.name;
      this.updateInfoRequest.email = result.email;
      this.updateInfoRequest.hobbies = result.hobbies;
      console.log(this.updateInfoRequest.hobbies);
      this.updateInfoRequest.phone = result.phone;
      this.updateInfoRequest.address = result.address;
      this.authService.updateInfo(this.updateInfoRequest).subscribe(data => {
        if (JSON.stringify(data) === JSON.stringify(this.error3)) {
          alert('Change information success!');
        }
      });
    });
  }

  search() {
    console.log(this.searchName);
    window.sessionStorage.setItem('Search' , this.searchName);
    this.router.navigate(['/home/search']).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });
  }
  getPosting(event: any) {
    this.posting = event.posting;
    if (event.status === false){
      this.notifiSocket.countNewNotification = this.notifiSocket.countNewNotification - 1;
    }
  }
  getAllNotification() {
    this.notificationService.getAll(this.currentId).subscribe(data => {
      console.log('trong sub');
      this.notifications = data;
      this.notifiSocket.List = this.notifications;
// tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === false) {
          this.countNewNotification = this.countNewNotification + 1;
        }
      }
      this.notifiSocket.countNewNotification = this.countNewNotification;
    });
  }
  showMessenger() {
    this.chatService.getListMessageByAccountId().subscribe(data => {
      this.router.navigate(['home/messenger-chat']);
    });
  }
  showListPending() {
    setTimeout(() => {
      this.profileService.listPending().subscribe(list => {
        this.listPending = list;
        this.sumPending = list.length;
      });
    }, 500 );
  }

  onChange(event) {
    this.showListPending();
  }
}
