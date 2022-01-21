import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../service/auth/auth.service';
import {TokenService} from '../../service/token/token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private tokeService: TokenService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });

  }


}
