import {Account} from './account';
import {PostingStatusType} from './postingStatusType';
import {PostingComment} from './comment';

export class Posting {
  id?: any;
  content?: any;
  dateOfPosting?: Date;
  owner?: Account;
  private _comments: any;
  postingStatusType: PostingStatusType;
  private images?: string;
  private imagesArray?: string[];
  private Likes?: any;
  // dislikes?: number;
  private Tags?: Account[];
  private _commentNumber: number;

  constructor(id?: any, content?: any, dateOfPosting?: Date, owner?: Account, postingStatusType?: PostingStatusType, images?: string) {
    this.id = id;
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


  get _images(): string {
    return this.images;
  }

  set _images(value: string) {
    this.images = value;
  }


  get _imagesArray(): string[] {
    return this.imagesArray;
  }

  set _imagesArray(value: string[]) {
    this.imagesArray = value;
  }
}
