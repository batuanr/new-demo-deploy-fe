import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-comment-delete',
  templateUrl: './comment-delete.component.html',
  styleUrls: ['./comment-delete.component.scss']
})
export class CommentDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommentDeleteComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
