import { Component, OnInit } from '@angular/core';
import {FriendService} from '../service/friend.service';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../service/profile.service';
import {AccountDetail} from '../model/account-detail';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  account: AccountDetail;
  constructor(private friendService: FriendService,
              private profileService: ProfileService,
              private activeRouter: ActivatedRoute) { }
  id: number;
  sumFriend: number;
  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe( idAccount => {
      const id = +idAccount.get('id1');
      this.id = id;
      this.profileService.findAccountById(id).subscribe( account => {
        this.account = account;
      });
      this.friendService.getAllFriend(id).subscribe( data => {
        this.sumFriend = data.length;
      });
    });
  }

}
