import { Component, OnInit } from '@angular/core';
import {SignUp} from '../../model/SignUp';
import {AuthService} from '../../service/auth/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators, NgForm, FormGroupDirective} from '@angular/forms';
import {SignUpForm} from '../../model/SignUpForm';
import {ErrorStateMatcher} from '@angular/material/core';
export class Myerror implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  status = 'Please fill information to register account!';
  matcher = new Myerror();
  form: FormGroup;
  signUpForm: SignUp;
  error1: any = {
    message: 'The username existed! Please try again!'
  };
  error2: any = {
    message: 'The email existed! Please try again!'
  };
  error3: any = {
    message: 'Create user success!'
  };


  constructor(private authService: AuthService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        confirmPassword: ['', [Validators.required]]
      }, {validators: this.checkPasswords},
    );
  }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signUpForm = new SignUp(
     this.form.controls.name.value,
     this.form.controls.username.value,
     this.form.controls.email.value,
     this.form.controls.password.value,
    ),
      this.authService.signup(this.signUpForm).subscribe(data => {
        if (JSON.stringify(data) === JSON.stringify(this.error1)) {
          this.status = 'The username existed! Please try again';
        }
        if (JSON.stringify(data) === JSON.stringify(this.error2)) {
          this.status = 'The email existed! Please try again';
        }
        if (JSON.stringify(data) === JSON.stringify(this.error3)) {
          this.status = 'success';
        }
      });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
}
