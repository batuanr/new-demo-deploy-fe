import {Component, Inject, OnInit} from '@angular/core';
import {ChangePasswordRequest} from '../../model/ChangePasswordRequest';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Myerror} from '../register/register.component';
import {SignUp} from '../../model/SignUp';
import {ErrorStateMatcher} from '@angular/material/core';

export class Myerror1 implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  status = 'Please fill information to register account!';
  matcher = new Myerror();
  form: FormGroup;

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ChangePasswordRequest,
              private fb: FormBuilder) {
    this.form = this.fb.group({
        oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        confirmPassword: ['', [Validators.required]]
      }, {validators: this.checkPasswords},
    );
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.newPassword.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : {notSame: true};
  }

  ngSubmit() {

  }
}
