import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class PostService {
  token: any;
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }
  getPostData(page): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.http.get(environment.wordpress.api_url + "wp-json/wp/v2/posts?page=" + page).pipe(
      tap(post => console.log('All Post fetched!'))
    );
  }

  getOnlyOnePost(id): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      })
    };
    return this.http.get(environment.wordpress.api_url + "wp-json/wp/v2/posts/" + id).pipe(
      tap(post => console.log('All Post fetched!'))
    );
  }

}
