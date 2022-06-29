import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
 
import { Storage } from '@capacitor/storage';
import {environment} from '../../environments/environment';
 
const TOKEN_KEY = 'my-token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
 userData:any;
  constructor(private http: HttpClient) {
    this.loadToken();
  }
 
  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });    
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
 
  login(credentials: {username, password}): Observable<any> {
    // console.log("credentials----->>>>>",credentials);
    return this.http.post(`https://detoximinddev.wpengine.com/wp-json/jwt-auth/v1/token`, credentials).pipe(
      map((data: any) => {
        this.userData = data.data;
    
        Storage.set({key: "user_data", value: JSON.stringify(this.userData)})
        return data.data.token
      }),
      switchMap(token => {
        return from(Storage.set({key: TOKEN_KEY, value: token}));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
 
  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
  getUserData(){
     return Storage.get({key:"user_data"});
   }
   changePassword(user_id,new_password): Observable<any>{
    let credentials = {};
    return this.http.post(`${environment.wordpress.api_url}`, credentials);
   }
}