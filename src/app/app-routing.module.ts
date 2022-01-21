import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from './form-login/register/register.component';
import {LoginComponent} from './form-login/login/login.component';
import {NewComponent} from './new/new.component';
import {HomeComponent} from './home/home.component';
import {SecurityGuard} from './security.guard';
import {ProfileComponent} from './profile/profile.component';
import {TimeLineComponent} from './profile/time-line/time-line.component';
import {FriendComponent} from './profile/friend/friend.component';
import {InfoComponent} from './profile/info/info.component';
import {ChangeAvatarComponent} from './change/change-avatar/change-avatar.component';
import {ListPendingComponent} from './profile/list-pending/list-pending.component';
import {UploadImagesFormComponent} from './posting/upload-images/upload-images-form/upload-images-form.component';
import {SearchComponent} from './search/search.component';
import {OnePostComponent} from './notification/one-post/one-post.component';
import {MessengerComponent} from './messenger/messenger.component';
import {ChatMessageComponent} from './chat-message/chat-message.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'change-avatar',
    component: ChangeAvatarComponent
  },
  {
    path: 'home', canActivate: [SecurityGuard],
    component: HomeComponent,
    children: [
      {
        path: '',
        component: NewComponent
      },
      {
        path: 'messenger-chat',
        component: MessengerComponent,
      },
      {
        path: 'notification-post/:id',
        component: OnePostComponent
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        children: [
          {
            path: '',
            component: TimeLineComponent
          },
          {
            path: 'friend/:id1',
            component: FriendComponent
          },
          {
            path: 'info/:id1',
            component: InfoComponent
          },
          {
            path: 'pending',
            component: ListPendingComponent
          }
        ]
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
