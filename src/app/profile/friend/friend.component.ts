import {Component, OnInit, OnChanges} from '@angular/core';
import {AccountDetail} from '../model/account-detail';
import {FriendService} from '../service/friend.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileService} from '../service/profile.service';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  friends: AccountDetail[] = [];
  id: number;
  isShow = true;

  constructor(private friendService: FriendService,
              private activeRouter: ActivatedRoute,
              private profileService: ProfileService,
              public router: Router
  ) {
  }

  currentId = window.sessionStorage.getItem('Id_Key');
  sumFriend: number;
  sumMutualFriends: number;
  check: boolean;

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(accountId => {
      const id = +accountId.get('id1');
      this.id = id;
      this.getListFriend();
      if (this.currentId === id.toString()) {
        this.check = true;
      } else {
        this.check = false;
      }
      this.profileService.findAccountById(id).subscribe( data => {
        this.isShow = data.show;
      });
      this.profileService.MutualFriends(id).subscribe(list => {
        this.sumMutualFriends = list.length;
      });
    });
  }


  getListFriend() {
    setTimeout(() => {
      this.friendService.getAllFriend(this.id).subscribe(listFriend => {
        this.friends = listFriend;
        this.sumFriend = listFriend.length;
      });
    }, 500);
  }


  deleteFriend(id: number) {
    this.profileService.deleteFriend(id).subscribe();
    this.getListFriend();
  }


  navigateToProfile(id: number) {
    window.sessionStorage.setItem('Id_Profile', String(id));
    this.router.navigate(['/home/profile/' + id]);
  }

  mutualFriends() {
    this.profileService.MutualFriends(this.id).subscribe(list => {
      this.friends = list;
    });
  }

  checkIsShow() {
    this.profileService.changeIsShow().subscribe();
  }
}
