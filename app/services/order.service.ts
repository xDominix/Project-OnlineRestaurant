import { EventEmitter, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FirebaseDatabase, FirebaseFirestore } from 'angularfire2';
import * as firebase from 'firebase/compat';
import { Observable,from as fromPromise } from 'rxjs';
import { Order } from '../models/order.model';
import { Rating } from '../models/rate.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderCollection: AngularFirestoreCollection<Order>; 
  orderItems:Map<string,number>;//dishid - amount

  constructor(public afs:AngularFirestore,private authService:AuthService) {
    this.orderItems=new Map<string,number>()
    this.orderCollection = this.afs.collection('orders');
  }

  changeOrderItems(orderItems:Map<string,number>)
  {
    this.orderItems=orderItems;
  }

  orderNow()
  {
    this.orderItems.forEach((amount,dishid)=> {
      this.orderCollection.add({
        uid: this.authService.currUid,
        dishid:dishid,
        amount:amount,
        isRated:false,
      });
      this.orderItems = new Map<string,number>();
      alert("Success! You can rate ordered dishes now :)");
    });
  };


}