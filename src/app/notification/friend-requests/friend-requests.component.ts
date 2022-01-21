import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountDetail} from '../../profile/model/account-detail';
import {ProfileService} from '../../profile/service/profile.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss']
})
export class FriendRequestsComponent implements OnInit {
  @Input()
  listPending: AccountDetail[];
  @Output()
  getPending = new EventEmitter();
  constructor(
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }
  agreePending(pending) {
    this.profileService.agree(pending.id).subscribe();
    this.getPending.emit(pending);
    alert('Đã kết bạn với ' + pending.name);
    console.log('chan qua');
    console.log(this.listPending);

  }

  refusePending(pending) {
    this.profileService.refusePending(pending.id).subscribe();
    this.getPending.emit(pending);
  }
}
