import { Component, OnInit } from '@angular/core';
import {SignInForm} from '../../model/SignInForm';
import {Router} from '@angular/router';
import {TokenService} from '../../service/token/token.service';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  status: any;
  form: any = {};
  roles: string[] = [];
  name: string;
  avatar: string;
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
        this.tokenService.setUsername(data.username);
        this.tokenService.setAvatar(data.avatar);
        this.tokenService.setToken(data.token);
        this.tokenService.setName(data.name);
        this.tokenService.setRoles(data.roles);
        this.tokenService.setIdKey(data.id);
        this.tokenService.setEmail(data.email);
        this.router.navigate(['home']).then(() => {
          window.location.reload();
        });
      } else {
        this.isCheckLoginFailed = true;
        this.status = 'LOGIN FAILED! Please try again!';
      }
    });
  }

}
