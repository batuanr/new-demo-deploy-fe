import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PostingComment} from '../../../model/comment';

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.scss']
})
export class CommentEditComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommentEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostingComment
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
