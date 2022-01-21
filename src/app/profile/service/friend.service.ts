import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetail} from '../model/account-detail';

const API = environment.API;


@Injectable({
  providedIn: 'root'
})
export class FriendService {
  API_FRIEND = API + '/api/relationship';

    constructor(private http: HttpClient) {
}

  getAllFriend(id: number): Observable<AccountDetail[]>{
      return this.http.get<AccountDetail[]>(this.API_FRIEND + '/listFriend/' + id);
  }
}
