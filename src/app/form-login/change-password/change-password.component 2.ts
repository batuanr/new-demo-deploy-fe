import { Component, OnInit } from '@angular/core';
import {ChangePasswordRequest} from '../../model/ChangePasswordRequest';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePassword: ChangePasswordRequest;
  form: any;
  hide = true;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {
      this.dialogRef.close();
    }

}
