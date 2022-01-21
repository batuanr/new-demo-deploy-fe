import {Component, OnInit} from '@angular/core';
import {AccountDetail} from './model/account-detail';
import {ProfileService} from './service/profile.service';
import {ActivatedRoute} from '@angular/router';
import {Posting} from '../posting/model/posting';
import {PostingService} from '../posting/service/posting.service';
import {Account} from '../posting/model/account';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  account: AccountDetail;
  constructor(private profileService: ProfileService,
              private activeRouter: ActivatedRoute) {
  }

  currentId = window.sessionStorage.getItem('Id_Key');
  check = false;
  checkRelationship = 0;
  id: number;
  pending = 0;

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(accountId => {
      const id = +accountId.get('id');
      this.id = id;
      window.sessionStorage.setItem('Id_Profile', id.toString());
      this.profileService.findAccountById(id).subscribe(account => {
        this.account = account;

      });
      this.profileService.checkRelationship(id).subscribe(data => {
        this.checkRelationship = data;
        console.log(this.checkRelationship);
      });
      if (this.currentId === id.toString()) {
        this.check = true;
      } else {
        this.check = false;
      }
      this.profileService.showpending().subscribe(data => {
        for (const datum of data) {
          if (datum.id === this.id) {
            this.pending = 1;
          }
        }
      });
    });


  }

    addFriend(){
      this.profileService.addFriend(this.id).subscribe();
      window.location.reload();
    }

  agree() {
    this.profileService.agree(this.id).subscribe();
    window.location.reload();
  }

  deleteFriend() {
    this.profileService.deleteFriend(this.id).subscribe();
    window.location.reload();
  }

  defuse() {
    this.profileService.refusePending(this.id).subscribe();
    window.location.reload();
  }
}
