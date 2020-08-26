import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { firestore } from 'firebase';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  postToDisplay = [];

  constructor(private data:DataService) {
    // subscribe to allPosts observable
    this.data.getAllPosts().subscribe(list => {
      this.postToDisplay = list.map(p => {
        let wrongFormat: any = p.timeStamp;
        p.timeStamp = new firestore.Timestamp(wrongFormat.seconds, wrongFormat.nanoseconds).toDate();

        return p;
      });

      // sort the array of posts

      this.postToDisplay = this.postToDisplay.sort(function(a, b) {
        if(a.timeStamp > b.timeStamp){
        return -1; // switch them (b first, then a)
      }
        else {
          return 1; // they are fine, leave them in that order
        }
      });

      console.log(this.postToDisplay);

    });
  }
}
