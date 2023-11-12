import {Injectable} from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

import {Post} from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  readonly URL: string = "https://ng-complete-guide-30215-default-rtdb.firebaseio.com/posts.json";

  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        this.URL,
        postData,
        {
          // change the kind of data you get back as response
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData.body);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    // return a new object when invoking this method append
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      // kind of data returned between <>, returns a javascript object
      .get<{ [key: string]: Post }>(
        this.URL,
      //add a header
        {
          headers: new HttpHeaders({"Custom-Header": "Hello"}),
          // Change the format firebase is returning the data
          // add the params at the end of the url
          // https://ng-complete-guide-30215-default-rtdb.firebaseio.com/posts.json?print=pretty&custom=key
          params: searchParams,
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        // catch generic exception
        catchError(errorRes => {
          // Send to analytics server
          // return new observable by wrapping an error
          return throwError(errorRes);
        })
      );
  }

  deletePosts() {
    return this.http.delete(
      this.URL, {
        //
        observe: 'events',
        // parse and convert it to be a text response
        responseType: 'text'
      }
    ).pipe(
      /*
      In your specific code, tap is used to log the event object emitted by the observable created by the delete HTTP request.
      It allows you to observe what's happening during the HTTP request without altering the actual data being sent or received
       */
      tap(event => {
        console.log(event);
        // which means type is 0
        if (event.type === HttpEventType.Sent) {
          console.log("Request sent");
        }
    }));
  }
}
