import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ChangePasswordRequest} from '../../model/ChangePasswordRequest';
import {AuthService} from '../../service/auth/auth.service';
import {TokenService} from '../../service/token/token.service';
import {UpdateInfoRequest} from '../../model/UpdateInfoRequest';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.scss']
})
export class UpdateInfoComponent implements OnInit {
status: 'Please fill to change your information';
nameAccount = this.tokenService.getName();
emailAccount = this.tokenService.getEmail();
form: FormGroup;
  constructor(private dialogRef: MatDialogRef<UpdateInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UpdateInfoRequest,
              private fb: FormBuilder,
              private authService: AuthService,
              private tokenService: TokenService) {
    this.form = this.fb.group({
      name: '',
      email: '',
      hobbies: '',
      address: '',
      phone: ''
    });
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }


}
