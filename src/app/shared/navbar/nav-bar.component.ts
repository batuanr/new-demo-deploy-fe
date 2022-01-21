import {Component, NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {Router, RouterModule} from '@angular/router';
import {ThemePickerModule} from '../theme-picker';
import {ThemeStorage} from '../theme-picker/theme-storage/theme-storage';
import {StyleManager} from '../style-manager';
import {HttpClientModule} from '@angular/common/http';
import {TokenService} from '../../service/token/token.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  name: any;
  isCheckLogin = false;
  avatar: any;
  constructor(private tokenService: TokenService,
              private router: Router) {
  }
  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isCheckLogin = true;
      this.name = this.tokenService.getName();
      this.avatar = this.tokenService.getAvatar();
    }
  }
  logOut() {
    window.sessionStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    ThemePickerModule,
    MatIconModule,
  ],
  exports: [NavBarComponent],
  declarations: [NavBarComponent],
  providers: [StyleManager, ThemeStorage]
})
export class NavBarModule {}
