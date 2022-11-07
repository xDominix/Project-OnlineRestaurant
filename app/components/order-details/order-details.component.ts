import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  orderItems = new Map<string, number>();//id - amount
  dishList:Dish[] = [];

  constructor(private dishService:DishService,private route:ActivatedRoute,private orderService:OrderService){}
  ngOnInit(): void {
    this.dishService.getDishes().subscribe(items=>{ this.dishList=items;});

    this.orderItems = this.orderService.orderItems;

  }

  get getArray():string[]
  {
    let res:string[]=[];
    for(let elem of this.orderItems) {
      let dish = this.dishList.find(a=> a.id == elem[0]);
      if(dish!==undefined) res.push(dish.name+" ("+elem[1]+")")
      else res.push("[removed]");
    }
    return res;
  }
  
  get totalNumOfItems()
  {
    let totalItems =0;

    for(let elem of this.orderItems) {
      let dish = this.dishList.find(a=> a.id == elem[0]);
      if(dish!==undefined) totalItems+=elem[1];
    }
    return totalItems;
  }
  get totalItemPrice()
  {
    let totalPrice=0;
    for(let elem of this.orderItems) {
      let dish = this.dishList.find(a=> a.id == elem[0]);
      if(dish!==undefined) totalPrice+=dish.price*elem[1];
    }
    return totalPrice;
  }

  orderNow()
  {
    this.orderService.orderNow();
    this.orderItems = new Map<string, number>();
  }
}
