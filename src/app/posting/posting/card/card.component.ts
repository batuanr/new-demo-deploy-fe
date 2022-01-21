import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Posting} from '../../model/posting';
import {Observable} from 'rxjs';
import {PostingService} from '../../service/posting.service';
import {TokenService} from '../../../service/token/token.service';
import {PostingComment} from '../../model/comment';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {any} from 'codelyzer/util/function';
import {PostingCreate} from '../../model/PostingCreate';
import {PostingStatusType} from '../../model/postingStatusType';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {PostingEditComponent} from '../posting-edit/posting-edit.component';
import {PostingDeleteComponent} from '../posting-delete/posting-delete.component';
import {ProfileService} from '../../../profile/service/profile.service';
import {NotificationService} from '../../../notification/service/notification.service';
import {Notifications} from '../../../model/Notifications';
import {Accounts} from '../../../model/Accounts';
import {NotificationSocketService} from '../../../notification/service/socket/notification-socket.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  isProfile: boolean;
  like: number;
  isLiked: boolean;
  @Input()
  posting: Posting;
  @Input()
  comments: PostingComment[];
  listUserId: number[] = [];
  avatarLogging: string;
  newComment: PostingComment;
  form: any = {};

  selected = 1;
  formEdit: any = {
    select: 1
  };
  postingStatusTypes: PostingStatusType[];
  postingEdit: PostingCreate;
  avatar: string;
  @Output()
  postingChange = new EventEmitter();
  urls: string[];
  imagesJoin: string;
  idLogging: number;
  statusPosting: string;
  @Output()
  idProfileChoice = new EventEmitter();
  // @Input()
  // idProfile: number;
  // @Input()
  idProfileFinal: number;
  relationshipStatus: number;

  @Output()
  postingIdDelete = new EventEmitter();

  @Output()
  commentIdDelete = new EventEmitter();
  notification: Notifications;


  constructor(
    private postingService: PostingService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    public router: Router,
    private notificationService: NotificationService,
    private notifiSocket: NotificationSocketService
  ) {
  }

  ngOnInit(): void {
    this.postingService.getLikeByPostingId(this.posting.id).subscribe(data => {
      this.like = data;
    });
    this.postingService.isLikedByAccountId(this.posting.id, this.tokenService.getIdKey()).subscribe(data => {
      this.isLiked = data;
    });
    this.avatarLogging = this.tokenService.getAvatar();
    this.idLogging = Number(this.tokenService.getIdKey());
    if (this.posting.postingStatusType.type === 'Friends') {
      this.statusPosting = 'people';
    } else if (this.posting.postingStatusType.type === 'Private') {
      this.statusPosting = 'lock';
    } else {
      this.statusPosting = 'public';
    }
    this.idProfileFinal = Number(window.sessionStorage.getItem('Id_Profile'));
    this.postingService.getRelationshipStatusById(this.posting.owner.id).subscribe(data => {
      this.relationshipStatus = data;
    });
    this.getListUserId();
  }
  getListUserId(){
    const listNumberId: number[] = [];
    this.listUserId.push(this.posting.owner.id);
    if (this.comments.length > 0){
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.comments.length; i++) {
        listNumberId.push(this.comments[i].owner.id);
      }
      listNumberId.sort();
      let checkNum: number = listNumberId[0];
      if (checkNum !== this.posting.owner.id){
        this.listUserId.push(checkNum);
      }
      for (let i = 1; i < listNumberId.length; i++) {
        if (listNumberId[i] !== checkNum && listNumberId[i] !== this.posting.owner.id){
          this.listUserId.push(listNumberId[i]);
          checkNum = listNumberId[i];
        }
      }
    }
    console.log(this.listUserId);
  }
  likePost(post: Posting) {
    this.postingService.isLikedByAccountId(post.id, this.tokenService.getIdKey()).subscribe(data => {
      if (data === false) {
        this.postingService.doLikePost(Number(this.tokenService.getIdKey()), post.id).subscribe();
        if (+this.tokenService.getIdKey() !== post.owner.id){
          this.notification = new Notifications('đã thả tim bài post của bạn', new Accounts(+this.tokenService.getIdKey()), new Accounts(post.owner.id), post, false, 1);
          console.log(this.notification);
          this.notifiSocket.createNotification(this.notification);
        }
        this.like++;
        this.isLiked = !data;
      } else {
        this.postingService.unLikePost(Number(this.tokenService.getIdKey()), post.id).subscribe();
        this.like--;
        this.isLiked = !data;
      }
    });
  }

  getAllComments(id: any) {
    this.postingService.getAllCommentsByPostingId(id).subscribe(comments => {
      this.comments = comments;
      this.comments = this.comments.sort((a, b) => b.id - a.id);
    });
  }

  onSubmit() {
    const curentId = +this.tokenService.getIdKey();
    this.newComment = new PostingComment(this.form.content, Date.now().toString(), this.posting, new StatusComment(1, 'sent'), new Account(this.tokenService.getIdKey()));
    this.postingService.saveNewComment(this.newComment).subscribe(data => {
        this.getAllComments(this.posting.id);
        this.form.content = '';
        this.posting.commentNumber = this.posting.commentNumber + 1;
      }
    );

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listUserId.length; i++) {
      if (this.listUserId[i] !== curentId){
        // tslint:disable-next-line:max-line-length
        this.notification = new Notifications('đã comment bài post của ', new Accounts(curentId), new Accounts(this.listUserId[i]), this.posting, false, 2);
        this.notifiSocket.createNotification(this.notification);
      }
    }
  }


  ngSubmit() {
    this.postingEdit = new PostingCreate(this.form.content, Date.now().toString(), new Account(this.tokenService.getIdKey(), this.tokenService.getUsername(), this.tokenService.getName(), this.tokenService.getAvatar()), new PostingStatusType(this.form.select), this.imagesJoin);
    this.postingService.create(this.postingEdit).subscribe();
    this.imagesJoin = null;
    this.urls = null;
    this.postingChange.emit(this.postingEdit);
    this.formEdit.content = '';
  }

  openDialogEdit(): void {
    const dialogRef = this.dialog.open(PostingEditComponent, {
      width: '1000px',
      data: {urls: this.urls, posting: this.posting}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.urls = result;
      this.imagesJoin = this.urls.join(',');
      if (this.posting.postingStatusType.type === 'Friends') {
        this.statusPosting = 'people';
      } else if (this.posting.postingStatusType.type === 'Private') {
        this.statusPosting = 'lock';
      } else {
        this.statusPosting = 'public';
      }
    });
  }

  openDialogDelete() {
    const dialogRef = this.dialog.open(PostingDeleteComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.postingIdDelete.emit(this.posting.id);
    });
  }

  deleteComment($event: any) {
    this.postingService.deleteComment($event).subscribe();
    for (let i = 0; i < this.comments.length; i++) {
      if (this.comments[i].id === $event) {
        this.comments.splice(i, 1);
      }
    }
    this.posting.commentNumber = this.posting.commentNumber - 1;
  }

  navigateProfile(id: string) {
    window.sessionStorage.setItem('Id_Profile', id);
    this.router.navigate(['/home/profile/' + id]).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });
  }
}
