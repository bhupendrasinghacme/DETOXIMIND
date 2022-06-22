import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  getPagesData(page_id): Observable<any> {
 
    return this.http.get(environment.wordpress.api_url+"pages/"+page_id).pipe(
      tap(post => console.log('All Post fetched!'))
      // ,
      // catchError(this.handleError<any>('Get All Post', []))
      );
  }
}
