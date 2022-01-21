import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {SignUp} from '../model/SignUp';
import {AuthService} from '../service/auth/auth.service';
import {SignInForm} from '../model/SignInForm';
import {TokenService} from '../service/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  hide = true;
  status = 'Please Login to use the SocialNet';
  form: any = {};
  roles: string[] = [];
  name: string;
  signInForm: SignInForm;
  isCheckLoginFailed = false;
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngSubmit() {
    this.signInForm = new SignInForm(
      this.form.username,
      this.form.password
    );
    this.authService.signIn(this.signInForm).subscribe(data => {
      if (data.token !== undefined) {
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRoles(data.roles);
        this.tokenService.setIdKey(data.id);
        this.router.navigate(['new']).then(() => {
          window.location.reload();
        });
      } else {
        this.isCheckLoginFailed = true;
        this.status = 'LOGIN FAILED! Please try again!';
      }
    });
  }

}
