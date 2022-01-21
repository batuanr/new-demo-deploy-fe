import {Component, OnInit} from '@angular/core';
import {SearchService} from './service/search.service';
import {AccountDetail} from '../profile/model/account-detail';
import {Posting} from '../posting/model/posting';
import {Router} from '@angular/router';
import {Account} from '../posting/model/account';
import {PostingService} from '../posting/service/posting.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  accounts: AccountDetail[] = [];
  postings: Posting[] = [];
  sumAccount: number;
  sumStatus: number;
  constructor(private searchService: SearchService,
              private router: Router,
              private postingService: PostingService) {
  }
  posting: Posting;
  search = window.sessionStorage.getItem('Search');

  ngOnInit(): void {
    this.searchService.searchAccount(this.search).subscribe( accounts => {
      this.accounts = accounts;
      this.sumAccount = accounts.length;
    });
    // this.searchService.searchStatus(this.search).subscribe( status => {
    //   this.postings = status;
    //   this.sumStatus = status.length;
    // });
    this.getAll();
  }

  navigateToProfile(id: number) {
    window.sessionStorage.setItem('Id_Profile', String(id));
    this.router.navigate(['/home/profile/' + id]);
  }
  getAll(): void {
    setTimeout(() => {this.searchService.searchStatus(this.search).subscribe(data => {
      this.sumStatus = data.length;
      for (let i = 0; data.length; i++) {
        this.postingService.findAllUrlByPostingId(data[i].id).subscribe(images => {
          this.postingService.getLikeByPostingId(data[i].id).subscribe(likes => {
            this.postingService.getCommentsByPostingId(data[i].id).subscribe(comments => {
              this.postingService.getAllCommentsByPostingId(data[i].id).subscribe(commentsAll => {
                this.posting = new Posting(data[i].id, data[i].content, data[i].dateOfPosting, new Account(data[i].owner.id, data[i].owner.username, data[i].owner.name, data[i].owner.avatar), data[i].postingStatusType);
                this.posting.likes = likes;
                this.posting.commentNumber = commentsAll.length;
                this.posting.comments = comments;
                this.posting._imagesArray = images;
                this.postings.push(this.posting);
                this.postings = this.postings.sort((a, b) => b.id - a.id);
              });
            });
          });
        });
      }
    });
    }, 1000);
  }

}
