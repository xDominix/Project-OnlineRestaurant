import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
@Component({
  selector: 'app-shoppingcartinfo',
  templateUrl: './shoppingcartinfo.component.html',
  styleUrls: ['./shoppingcartinfo.component.css']
})
export class ShoppingcartinfoComponent{
  @Input() actualDishList:Dish[] = [];
  @Input() orderItems= new Map<string, number>();

  getDishNames()
  {
    let res="";
    for(let key of Array.from(this.orderItems.keys()) ) {
      let dish = this.actualDishList.find(a=> a.id == key);
      if(dish!==undefined) res += dish.name+", ";
      else res+="[removed], "
   }
    return  res;
  }
  totalNumOfItems()
  {
    let totalItems =0;

    for(let elem of this.orderItems) {
      let dish = this.actualDishList.find(a=> a.id == elem[0]);
      if(dish!==undefined) totalItems+=elem[1];
    }
    return totalItems;
  }
  totalItemPrice()
  {
    let totalPrice=0;
    for(let elem of this.orderItems) {
      let dish = this.actualDishList.find(a=> a.id == elem[0]);
      if(dish!==undefined) totalPrice+=dish.price*elem[1];
    }
    return totalPrice;
  }

}
