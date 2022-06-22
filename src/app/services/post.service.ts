import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from  '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class PostService {
  // https://detoximinddev.wpengine.com/wp-json/wp/v2/
 
 httpHeader = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
  constructor(private http: HttpClient) { }
getPostData(page): Observable<any> {
 
  return this.http.get(environment.wordpress.api_url+"posts?page=" + page).pipe(
    tap(post => console.log('All Post fetched!'))
    // ,
    // catchError(this.handleError<any>('Get All Post', []))
    );
}

// private handleError<T>(operation = 'operation', result?: T) {
//   return (error: any): Observable<T> => {
//     console.error(error);
//     console.log(`${operation} failed: ${error.message}`);
//     return of(result as T);
//   };
// }
getOnlyOnePost(id):Observable<any>{
  return this.http.get(environment.wordpress.api_url+"posts/"+id).pipe(
    tap(post => console.log('All Post fetched!'))
    );
}

}
