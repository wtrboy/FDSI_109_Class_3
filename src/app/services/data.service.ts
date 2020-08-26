import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allPosts: Observable<Post[]>;

  // collection: connection between service and my database

  postCollection: AngularFirestoreCollection<Post>;

  constructor(private fst: AngularFirestore) { 
    this.postCollection = fst.collection<Post>('posts')
  }

  private retrievePosts() {
    this.allPosts = this.postCollection.valueChanges();
  }

  public savePost(post){
    let item = Object.assign({}, post); // copy post into a simple object
    this.postCollection.add(item);
  }

  public getAllPosts(){
    this.retrievePosts();
    return this.allPosts; // returning an observable
  }
}

