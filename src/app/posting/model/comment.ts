import {Posting} from './posting';
import {StatusComment} from './StatusComment';
import {Account} from './account';

export class PostingComment {
    id?: any;
    content?: string;
    dateOfComment?: string;
    posting?: Posting;
    statusComment?: StatusComment;
    owner?: Account;


    constructor(content?: string, dateOfComment?: string, posting?: Posting, statusComment?: StatusComment, owner?: Account) {
        this.content = content;
        this.dateOfComment = Date.now().toString();
        this.posting = posting;
        this.statusComment = statusComment;
        this.owner = owner;
    }
}
