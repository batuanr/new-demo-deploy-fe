import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostingService} from '../../service/posting.service';
import {StatusComment} from '../../model/StatusComment';
import {Account} from '../../model/account';
import {PostingComment} from '../../model/comment';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';
import {MatDialog} from '@angular/material/dialog';
import {CommentEditComponent} from './comment-edit/comment-edit.component';
import {CommentDeleteComponent} from './comment-delete/comment-delete.component';
import {TokenService} from '../../../service/token/token.service';
import {Router} from '@angular/router';
import {Notifications} from '../../../model/Notifications';
import {Accounts} from '../../../model/Accounts';
import {NotificationService} from '../../../notification/service/notification.service';
import {NotificationSocketService} from '../../../notification/service/socket/notification-socket.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input()
  comment: PostingComment;
  newContent: string;
  @Output()
  idCommentDelete = new EventEmitter();
  idLogging: number;
  isLiked: boolean;
  like: number;
  private notification: Notifications;
  constructor(
    private postingService: PostingService,
    public dialog: MatDialog,
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService,
    private notifiSocket: NotificationSocketService
  ) { }

  ngOnInit(): void {
    this.idLogging = Number(this.tokenService.getIdKey());
    this.postingService.getLikeByPostingCommentId(this.comment.id).subscribe(data => {
      this.like = data;
    });
    this.postingService.isLikedCommentByAccountId(this.comment.id, this.tokenService.getIdKey()).subscribe(data => {
      this.isLiked = data;
    });
  }

  likeComment(comment: PostingComment) {
    this.postingService.isLikedCommentByAccountId(comment.id, this.tokenService.getIdKey()).subscribe(data => {
      if (data === false) {
        if (+this.tokenService.getIdKey() !== comment.owner.id){
          this.notification = new Notifications('đã like comment của bạn', new Accounts(+this.tokenService.getIdKey()), new Accounts(comment.owner.id), comment.posting, false, 1);
          console.log(this.notification);
          this.notifiSocket.createNotification(this.notification);
        }
        this.postingService.doLikeComment(Number(this.tokenService.getIdKey()), comment.id).subscribe();
        this.like++;
        this.isLiked = !data;
      } else {
        this.postingService.unLikeComment(Number(this.tokenService.getIdKey()), comment.id).subscribe();
        this.like--;
        this.isLiked = !data;
      }
    });
  }

  openDialogEdit() {
    const dialogRef = this.dialog.open(CommentEditComponent, {
      width: '500px',
      data: {newContent: this.newContent}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.comment.content = result;
      this.postingService.updateComment(this.comment.id, this.comment).subscribe();
      console.log('The dialog was closed');
    });
  }


  openDialogDelete() {
    const dialogRef = this.dialog.open(CommentDeleteComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.idCommentDelete.emit(this.comment.id);
      console.log('The dialog was closed');
    });
  }

  navigateToProfile(id: any) {
    window.sessionStorage.setItem('Id_Profile', id);
    this.router.navigate(['/home/profile/' + id]).then(() => {
      window.location.reload();
      window.scrollTo(0, 0);
    });

  }

}
