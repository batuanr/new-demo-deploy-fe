import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavBarComponent, NavBarModule} from './shared/navbar/nav-bar.component';
import { NewComponent } from './new/new.component';
import { NotificationComponent } from './notification/notification/notification.component';
import { PostingComponent } from './posting/posting/posting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {CardComponent} from './posting/posting/card/card.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment.prod';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import { ChangeAvatarComponent } from './change/change-avatar/change-avatar.component';
import { LoginComponent } from './form-login/login/login.component';
import { LogoutComponent } from './form-login/logout/logout.component';
import { RegisterComponent } from './form-login/register/register.component';
import { UserAccountComponent } from './form-login/user-account/user-account.component';
import { UploadAvatarComponent } from './upload/upload-avatar/upload-avatar.component';
import {MatIconModule} from '@angular/material/icon';
import {matFormFieldAnimations, MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {ThemePickerComponent, ThemePickerModule} from './shared/theme-picker';
import { NavBar2Component } from './nav-bar2/nav-bar2.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {FooterModule} from './shared/footer';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import { CommentComponent } from './posting/posting/comment/comment.component';
import { DemoComponent } from './demo/demo.component';
import { HomeComponent } from './home/home.component';
import {httpInterceptorProviders} from './auth.interceptor';
import { ProfileComponent } from './profile/profile.component';
import { InfoComponent } from './profile/info/info.component';
import { FriendComponent } from './profile/friend/friend.component';
import { TimeLineComponent } from './profile/time-line/time-line.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PostingCreateComponent } from './posting/posting/posting-create/posting-create.component';

import { MessengerComponent } from './messenger/messenger.component';
import { ListPendingComponent } from './profile/list-pending/list-pending.component';
import {ReversePipe} from './posting/posting/pipe/ReversePipe';
import { UploadImagesComponent } from './posting/upload-images/upload-images.component';
import { UploadImagesFormComponent } from './posting/upload-images/upload-images-form/upload-images-form.component';
import {MatDialogModule} from '@angular/material/dialog';

import { ChangePasswordComponent } from './form-login/change-password/change-password.component';
import { PostingEditComponent } from './posting/posting/posting-edit/posting-edit.component';
import { PostingDeleteComponent } from './posting/posting/posting-delete/posting-delete.component';
import { CommentEditComponent } from './posting/posting/comment/comment-edit/comment-edit.component';
import { CommentDeleteComponent } from './posting/posting/comment/comment-delete/comment-delete.component';
import { UpdateInfoComponent } from './change/update-info/update-info.component';
import { SearchComponent } from './search/search.component';
import { OnePostComponent } from './notification/one-post/one-post.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { FriendRequestsComponent } from './notification/friend-requests/friend-requests.component';



@NgModule({
  declarations: [
    AppComponent,
    NewComponent,
    NotificationComponent,
    PostingComponent,
    CardComponent,
    ChangeAvatarComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    UserAccountComponent,
    UploadAvatarComponent,
    NavBar2Component,
    CommentComponent,
    DemoComponent,
    HomeComponent,
    ProfileComponent,
    InfoComponent,
    FriendComponent,
    TimeLineComponent,
    PostingCreateComponent,
    MessengerComponent,
    ListPendingComponent,
    ReversePipe,
    UploadImagesComponent,
    UploadImagesFormComponent,
    ChangePasswordComponent,
    PostingEditComponent,
    PostingDeleteComponent,
    CommentEditComponent,
    CommentDeleteComponent,
    UpdateInfoComponent,
    SearchComponent,
    OnePostComponent,
    ChatMessageComponent,
    UpdateInfoComponent,
    MessageDetailComponent,
    FriendRequestsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatButtonModule,
    BrowserAnimationsModule,
    NavBarModule,
    FooterModule,
    NgxAudioPlayerModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    AngularFireStorageModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatProgressSpinnerModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
