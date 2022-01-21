import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../service/profile.service';
import {AccountDetail} from '../model/account-detail';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-pending',
  templateUrl: './list-pending.component.html',
  styleUrls: ['./list-pending.component.scss']
})
export class ListPendingComponent implements OnInit {
  listPending: AccountDetail[] = [];

  constructor(private profileService: ProfileService,
              public router: Router
  ) {
  }
  sumPending: number;
  ngOnInit(): void {
    this.showListPending();
  }

  showListPending() {
    setTimeout(() => {
      this.profileService.listPending().subscribe(list => {
        this.listPending = list;
        console.log(list);
        this.sumPending = list.length;
      });
    }, 500 );
  }

  agreePending(id: number) {
    this.profileService.agree(id).subscribe();
    this.showListPending();
    console.log('chan qua');
    console.log(this.listPending);
  }

  refusePending(id: number) {
    this.profileService.refusePending(id).subscribe();
    this.showListPending();
  }

  navigateToProfile(id: number) {
    window.sessionStorage.setItem('Id_Profile', String(id)) ;
    this.router.navigate(['/home/profile/' + id]);
  }
}
