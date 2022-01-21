import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetail} from '../model/account-detail';
import {RelationshipDetail} from '../model/relationship-detail';


const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  findAccountById(id: number): Observable<AccountDetail> {
    return this.http.get<AccountDetail>(API + '/api/auth/' + id);
  }

  checkRelationship(id: number): Observable<number> {
    return this.http.get<number>(API + '/api/relationship/checkRelationship/' + id);
  }

  addFriend(id: number): Observable<RelationshipDetail> {
    return this.http.post<RelationshipDetail>(API + '/api/relationship/add/' + id, {});
  }

  showpending(): Observable<AccountDetail[]> {
    return this.http.get<AccountDetail[]>(API + '/api/relationship/showPending');
  }

  agree(id: number): Observable<AccountDetail> {
    return this.http.put<AccountDetail>(API + '/api/relationship/accept/' + id, {});
  }

  deleteFriend(id: number): Observable<AccountDetail> {
    return this.http.delete<AccountDetail>(API + '/api/relationship/delete/' + id);
  }

  refusePending(id: number): Observable<AccountDetail> {
    return this.http.delete<AccountDetail>(API + '/api/relationship/refused/' + id);
  }

  listPending(): Observable<AccountDetail[]> {
    return this.http.get<AccountDetail[]>(API + '/api/relationship/showPending');
  }

  MutualFriends(id: number): Observable<AccountDetail[]> {
    return this.http.get<AccountDetail[]>(API + '/api/relationship/mutualFriend/' + id);
  }

  changeIsShow(): Observable<AccountDetail> {
    return this.http.put<AccountDetail>(API + '/api/relationship/isShow', {});
  }

}
