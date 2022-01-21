import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDetail} from '../../profile/model/account-detail';
import {Posting} from '../../posting/model/posting';
const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  searchAccount(name: string): Observable<AccountDetail[]> {
    return this.http.get<AccountDetail[]>(API + '/api/auth/search?name=' + name);
  }

  searchStatus(content: string): Observable<Posting[]> {
    return this.http.get<Posting[]>(API + '/api/posting/search?content=' + content);
  }

}
