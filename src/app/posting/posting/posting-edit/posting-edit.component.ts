import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {PostingStatusType} from '../../model/postingStatusType';
import {PostingCreate} from '../../model/PostingCreate';
import {TokenService} from '../../../service/token/token.service';
import {PostingService} from '../../service/posting.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Account} from '../../model/account';
import {UploadImagesFormComponent} from '../../upload-images/upload-images-form/upload-images-form.component';
import {Posting} from '../../model/posting';

@Component({
  selector: 'app-posting-edit',
  templateUrl: './posting-edit.component.html',
  styleUrls: ['./posting-edit.component.scss']
})
export class PostingEditComponent implements OnInit {
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
  postingData: Posting;


  constructor(
    private tokenService: TokenService,
    private postingService: PostingService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data,
  ) { this.postingData = data.posting;
  }

  ngOnInit(): void {
    this.postingService.getAllStatusPostingType().subscribe(data => {
      this.postingStatusTypes = data;
    });
    this.form.select = this.postingData.postingStatusType.id;
    this.form.content = this.postingData.content;
  }

  ngSubmit() {
    this.postingData.content = this.form.content;
    this.postingData.postingStatusType.id = this.form.select;
    this.imagesJoin = this.postingData._imagesArray.join(',');
    this.postingData._images = this.imagesJoin;
    if (this.postingData._images === undefined) {
      this.postingData._images = null;
    }
    this.postingService.update(this.postingData.id, this.postingData).subscribe();
    this.imagesJoin = null;
    this.urls = null;
    this.postingChange.emit(this.postingData);
    this.form.content = '';
    this.dialog.closeAll();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UploadImagesFormComponent, {
      width: '500px',
      data: {urls: this.urls}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.urls = result;
      this.postingData._imagesArray = this.postingData._imagesArray.concat(result);
      this.imagesJoin = this.postingData._imagesArray.join(',');
      this.postingData._images = this.imagesJoin;
    });
  }

  deleteImg(i: number) {
    this.postingData._imagesArray.splice(i, 1);
  }
}
