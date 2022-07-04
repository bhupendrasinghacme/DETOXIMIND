import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserupdateService {
  httpHeader: any;
  token: any;
  constructor(private http: HttpClient) {
    this.getToken();
  }
  async getToken() {
    let token_id = await Storage.get({ key: 'my-token' });
    this.token = token_id.value;

  }

  getUserData(user_id): Observable<any> {
    this.getToken();
    // let header = new HttpHeaders().set(
    //   "Authorization",
    //   'Bearer ' + this.token
    // );
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    // console.log(this.httpHeader);
    return this.http.get(environment.wordpress.api_url + "users/" + user_id, httpOptions).pipe(
      tap(User => console.log('User details fetched!', User))
    );
  }
  updateUserProfile(id, data): Observable<any> {
    this.getToken();

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    // console.log(this.httpHeader);
    return this.http.post(environment.wordpress.api_url + "users/" + id, JSON.stringify(data), httpOptions).pipe(
      tap(User => console.log('User details fetched!', User))
    );
  }

}
