import { PathLocationStrategy } from '@angular/common';
import { Component, OnInit ,Input,Output,EventEmitter, ViewChild} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';
import { ShoppingcartinfoComponent } from '../shoppingcartinfo/shoppingcartinfo.component';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent  {
  @Input() public dish!:Dish;
  @Input() isAuthenticated =false;

  @Input() public editMode = false;
  @Input() public deleteMode = false;
  @Input() public focus = false;

  @Input() public setRed=false;
  @Input() public setGreen=false;
  @Input() public amount=0;
  
  @Output() openInfoClick = new EventEmitter<Dish>();
  @Output() sendToShoppingCart = new EventEmitter<{dish:Dish,add:boolean}>();

  constructor(private dishService:DishService,private router:Router){}
  removeDish()
  {
    if(this.dish.id!=undefined)
    this.dishService.removeDish(this.dish.id);
  }

  editDish()
  {
    this.router.navigate(['/dish-form',this.dish.id]);
  }

  
  addOne()
  {
    if(this.isAuthenticated) this.sendToShoppingCart.emit({dish:this.dish,add:true});
    else alert("Log in to order");
  }

  removeOne()
  {
    this.sendToShoppingCart.emit({dish:this.dish,add:false});
  }

  openInfo()
  {
    if(this.isAuthenticated)  this.openInfoClick.emit(this.dish);
    else alert("Log in to read more");
  }
 
  
  setColor()
  {
    if(this.setRed) return 'redClass'; 
    if(this.setGreen) return 'greenClass'; 
    return 'yellowClass';
  }

}
