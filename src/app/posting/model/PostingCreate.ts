import {Account} from './account';
import {PostingStatusType} from './postingStatusType';
import {PostingComment} from './comment';

export class PostingCreate {
  content?: any;
  dateOfPosting?: string;
  owner?: Account;
  private _comments: any;
  postingStatusType: PostingStatusType;
  images?: string;
  private Likes?: any;
  // dislikes?: number;
  private Tags?: Account[];
  private _commentNumber: number;

  constructor(content?: any, dateOfPosting?: string, owner?: Account, postingStatusType?: PostingStatusType, images?: string) {
    this.content = content;
    this.dateOfPosting = dateOfPosting;
    this.owner = owner;
    this.postingStatusType = postingStatusType;
    this.images = images;
  }


  get likes(): number {
    return this.Likes;
  }

  set likes(value: number) {
    this.Likes = value;
  }

  get tags(): Account[] | undefined {
    return this.Tags;
  }

  set tags(value: Account[] | undefined) {
    this.Tags = value;
  }
  get comments(): any {
    return this._comments;
  }

  set comments(value: any) {
    this._comments = value;
  }


  get commentNumber(): number {
    return this._commentNumber;
  }

  set commentNumber(value: number) {
    this._commentNumber = value;
  }
}
