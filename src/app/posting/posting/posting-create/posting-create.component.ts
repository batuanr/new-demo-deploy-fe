import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenService} from '../../../service/token/token.service';
import {Posting} from '../../model/posting';
import {Account} from '../../model/account';
import {PostingStatusType} from '../../model/postingStatusType';
import {PostingCreate} from '../../model/PostingCreate';
import {PostingService} from '../../service/posting.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';



@Component({
  selector: 'app-posting-create',
  templateUrl: './posting-create.component.html',
  styleUrls: ['./posting-create.component.scss']
})
export class PostingCreateComponent implements OnInit {
  selected = 1;
  form: any = {
    select: 1
  };
  postingStatusTypes: PostingStatusType[];
  posting: PostingCreate;
  avatar: string;
  @Output()
  postingChange = new EventEmitter();
  urls: string[];
  imagesJoin: string;
  constructor(
    private tokenService: TokenService,
    private postingService: PostingService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.avatar = this.tokenService.getAvatar();
    this.postingService.getAllStatusPostingType().subscribe(data => {
       this.postingStatusTypes = data;
    });
  }

  ngSubmit() {
    this.posting = new PostingCreate(this.form.content, Date.now().toString(), new Account(this.tokenService.getIdKey(), this.tokenService.getUsername(), this.tokenService.getName(), this.tokenService.getAvatar()), new PostingStatusType(this.form.select), this.imagesJoin);
    console.log(this.posting);
    this.postingService.create(this.posting).subscribe();
    this.imagesJoin = null;
    this.urls = null;
    this.postingChange.emit(this.posting);
    this.form.content = '';
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadImagesFormComponent, {
      width: '500px',
      data: {urls: this.urls}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.urls = result;
      this.imagesJoin = this.urls.join(',');
    });
  }

  deleteImg(i: number) {
    this.urls.splice(i, 1);
    this.imagesJoin = this.urls.join(',');
  }
}
