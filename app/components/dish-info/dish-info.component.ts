import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { Rating } from 'src/app/models/rate.model';
import { OrderService } from 'src/app/services/order.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-dish-info',
  templateUrl: './dish-info.component.html',
  styleUrls: ['./dish-info.component.css']
})
export class DishInfoComponent {

  constructor(private ratingService:RatingService,private orderService:OrderService){}

  ngOnInit()
  {
    this.ratingService.getRatings().subscribe(e=> {this.ratings = e.filter(e=>e.dishid==this.dish.id)});
    
  }

  @Input() public dish!:Dish;
  ratings:Rating[]=[];
  @Input() public amount=0;
  
  @Output() closeInfoClick = new EventEmitter<boolean>();
  @Output() sendToShoppingCart = new EventEmitter<{dish:Dish,add:boolean}>();
  
  addOne()
  {
    this.sendToShoppingCart.emit({dish:this.dish,add:true});
    
  }

  removeOne()
  {
    this.sendToShoppingCart.emit({dish:this.dish,add:false});
  }

  closeInfo()
  {
    this.closeInfoClick.emit(true);
    
  }
}
