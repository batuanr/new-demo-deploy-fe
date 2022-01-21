import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PostingComment} from '../../model/comment';

export interface Images {
  urls: string[];
}

@Component({
  selector: 'app-upload-images-form',
  templateUrl: './upload-images-form.component.html',
  styleUrls: ['./upload-images-form.component.scss']
})
export class UploadImagesFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadImagesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Images) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  changeUrls($event: string[]) {
    this.data.urls = $event;
  }
}
