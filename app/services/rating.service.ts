import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Rating } from '../models/rate.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  ratingCollection: AngularFirestoreCollection<Rating>; 
  ratings:Observable<Rating[]>;
  
  constructor(public afs:AngularFirestore) { 
    this.ratingCollection = this.afs.collection('ratings'); 
    this.ratings = this.ratingCollection.snapshotChanges().pipe(map(actions => {       
      return actions.map(a => {
        const data = a.payload.doc.data() as Rating;
        return data;
      });
    }));
  }

  addRating(dishId:string,nick:string,text:string,date?:string)
  {
    if(date!=null)this.ratingCollection.add({dishid:dishId,nick:nick,text:text,date:date});
    else this.ratingCollection.add({dishid:dishId,nick:nick,text:text});
  }

  getRatings()
  {
    return this.ratings;
  }
}
