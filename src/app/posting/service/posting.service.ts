import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Posting} from '../model/posting';
import {PostingComment} from '../model/comment';
import {PostingCreate} from '../model/PostingCreate';
import {PostingStatusType} from '../model/postingStatusType';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class PostingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Posting[]>{
    return this.http.get<Posting[]>(API + '/api/posting');
  }

  create(posting: PostingCreate): Observable<Posting> {
    return this.http.post<Posting>(API + '/api/posting', posting);
  }

  update(id: number, posting: Posting): Observable<Posting> {
    return this.http.put<Posting>(API + '/api/posting/' + id, posting);
  }

  findById(id: number): Observable<Posting> {
    return this.http.get<Posting>(API + '/api/posting/' + id);
  }

  delete(id: any): Observable<any>{
    return this.http.delete<any>(API + '/api/posting/' + id);
  }

  findAllUrlByPostingId(id: any): Observable<string[]>{
    return this.http.get<string[]>(API + '/api/postingImage/posting/' + id);
  }

  getLikeByPostingId(id: any): Observable<number>{
    return this.http.get<number>(API + '/api/postLike/like/' + id);
  }
  isLikedByAccountId(pId: any, accId: any): Observable<boolean>{
    return this.http.get<boolean>(API + '/api/postLike/liked/' + pId + '/' + accId);
  }
  doLikePost(accId: number, pId: number): Observable<string> {
    return this.http.post<string>(API + '/api/postLike/doLike/' + pId + '/' + accId, {});
  }

  unLikePost(accId: number, pId: number): Observable<string> {
    return this.http.delete<string>(API + '/api/postLike/unLike/' + pId + '/' + accId);
  }

  getCommentsByPostingId(id: number): Observable<PostingComment[]> {
    return this.http.get<PostingComment[]>(API + '/api/postingComment/post/' + id);
  }

  getAllCommentsByPostingId(id: number): Observable<PostingComment[]> {
    return this.http.get<PostingComment[]>(API + '/api/postingComment/post/all/' + id);
  }
  saveNewComment(postingComment: PostingComment): Observable<PostingComment> {
    return this.http.post<PostingComment>(API + '/api/postingComment', postingComment);
  }

  getAllStatusPostingType(): Observable<PostingStatusType[]> {
    return this.http.get<PostingStatusType[]>(API + '/api/postingStatusType');
  }

  updateComment(id: number, comment: PostingComment): Observable<PostingComment> {
    return this.http.put<PostingComment>(API + '/api/postingComment/' + id, comment);
  }

  deleteComment(id: number): Observable<PostingComment> {
    return this.http.delete<PostingComment>(API + '/api/postingComment/' + id);
  }

  getRelationshipStatusById(id: number): Observable<number> {
    return this.http.get<number>(API + '/api/relationship/checkRelationship/' + id);
  }

  getLikeByPostingCommentId(id: any): Observable<number>{
    return this.http.get<number>(API + '/api/commentLike/like/' + id);
  }
  isLikedCommentByAccountId(cId: any, accId: any): Observable<boolean>{
    return this.http.get<boolean>(API + '/api/commentLike/liked/' + cId + '/' + accId);
  }
  doLikeComment(accId: number, cId: number): Observable<string> {
    return this.http.post<string>(API + '/api/commentLike/doLike/' + cId + '/' + accId, {});
  }

  unLikeComment(accId: number, cId: number): Observable<string> {
    return this.http.delete<string>(API + '/api/commentLike/unLike/' + cId + '/' + accId);
  }

  getTotalLike(id: number): Observable<number> {
    return this.http.get<number>(API + '/api/postLike/getTotalLike/' + id);
  }
}
