import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Dish } from '../models/dish.model';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  dishCollection: AngularFirestoreCollection<any>; 
  dishes:Observable<Dish[]>;
  currDishes:Dish[] = [];

  constructor(public afs:AngularFirestore) {
    //this.dishes= this.afs.collection('dishes').valueChanges();
    this.dishCollection = this.afs.collection('dishes',ref=> ref.orderBy('name','asc'));
      
      this.dishes = this.dishCollection.snapshotChanges().pipe(map(actions => {       
        return actions.map(a => {
          const data = a.payload.doc.data() as Dish;
          data.id = a.payload.doc.id;
          return data;
        });
        
      }));

      this.dishes.subscribe(dishes=>this.currDishes =dishes);
   }

   getDishes()
   {
     return this.dishes;
   }

   getDish(id:string):Dish|undefined
   {
     return this.currDishes.find(dish=>dish.id == id);
   }

   addDish(dish:Dish)
   {
     return this.dishCollection.add({
      name : dish.name,
       price: dish.price,
       category: dish.category,
       region: dish.region,
       ingredients: dish.ingredients,
       maxAmount: dish.maxAmount,
       description: dish.description,
       photosDirectory: dish.photosDirectory,
       rating: dish.rating,

     })
   }

   editDish(id:string,dish:Dish)
   {
     return this.dishCollection.doc(id).update({
      name : dish.name,
       price: dish.price,
       category: dish.category,
       region: dish.region,
       ingredients: dish.ingredients,
       maxAmount: dish.maxAmount,
       description: dish.description,
       photosDirectory: dish.photosDirectory,
       rating: dish.rating
     })
   }

   removeDish(dishId:string)
   {
     const old = this.afs.doc(`dishes/${dishId}`)
     old.delete();
   }
}
