import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notifications} from '../../model/Notifications';
const API_NOTIFICATION = environment.API + '/notification/';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(id: number): Observable<Notifications[]>{
    return this.http.get<Notifications[]>(API_NOTIFICATION + id);
  }
  create(notification: Notifications): Observable<Notifications>{
    return this.http.post<Notifications>(API_NOTIFICATION, notification);
  }
  delete(id: number): Observable<Notifications>{
    return this.http.delete<Notifications>(API_NOTIFICATION + id);
  }
  update(id: number): Observable<Notifications>{
    // @ts-ignore
    return this.http.put<Notifications>(API_NOTIFICATION + id);
  }
}
