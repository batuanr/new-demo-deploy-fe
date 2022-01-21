import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Posting} from '../../posting/model/posting';
import {PostingService} from '../../posting/service/posting.service';
import {Account} from '../../posting/model/account';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.scss']
})
export class OnePostComponent implements OnInit, OnChanges {
  @Input()
  posting: Posting;

  constructor(
    private postingService: PostingService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getPosting();
    console.log(this.posting);
  }

  getPosting(): void {
    setTimeout(() => {
      this.postingService.findAllUrlByPostingId(this.posting.id).subscribe(images => {
        this.posting._imagesArray = images;
      });
      this.postingService.getLikeByPostingId(this.posting.id).subscribe(likes => {
        this.posting.likes = likes;
      });
      this.postingService.getCommentsByPostingId(this.posting.id).subscribe(comments => {
        this.posting.comments = comments;
      });
      this.postingService.getAllCommentsByPostingId(this.posting.id).subscribe(commentsAll => {
        this.posting.commentNumber = commentsAll.length;
      });
    });
  }
}
