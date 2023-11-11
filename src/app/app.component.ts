import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Post} from "./post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    // <data getting back is name: '-Nizyzj7ktCerfDOl1iE'>
    this.http.post<{name: string}>('https://ng-complete-guide-30215-default-rtdb.firebaseio.com/posts.json',
      postData)
      // send data only when you subscribe
      .subscribe(responseDate => {
       console.log(responseDate);
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    // <Response body type>
    this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-30215-default-rtdb.firebaseio.com/posts.json')
      .pipe(
    // keys of object should be a string type like:
    //   "key1": { /* Post object here */ },
      map(responseData => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            // takes the data associated with the current key in responseData
            // creates a new object using spread '...' and add a new property id with the value key to this new created object
            postsArray.push({...responseData[key], id: key});
          }
        }
        postsArray.forEach(post => { console.log(post); })
        return postsArray;
      }))
      .subscribe(posts => {
        console.log(posts);
      });
  }

}
