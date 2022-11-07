import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
 
  regionsArray:string[]=[];
  categoriesArray:string[] = [];
  minDishPrice = 0; 
  maxDishPrice = 0; 

  @Output() onSetRegion = new EventEmitter<{reg:string,bool:boolean}>();
  @Output() onSetCategory = new EventEmitter<{cat:string,bool:boolean}>();
  @Output() onSetMinPrice = new EventEmitter<number>();
  @Output() onSetMaxPrice = new EventEmitter<number>();
  @Output() onSetRating = new EventEmitter<number>();

  setFilters(actualDishList:Dish[])
  {
    actualDishList.forEach(dish => {
      
      if (this.regionsArray.indexOf(dish.region) === -1) 
      {
        this.regionsArray.push(dish.region);
      }

      if (this.categoriesArray.indexOf(dish.category) === -1) 
      {
        this.categoriesArray.push(dish.category);
      }

      this.maxDishPrice = Math.max(this.maxDishPrice,dish.price);
      this.minDishPrice = Math.min(this.minDishPrice,dish.price);
    });
  }

  changeRegion(reg:string,e:any)
  {
    let bool:boolean = e.target.checked;
    this.onSetRegion.emit({reg,bool});
  }

  changeCategory(cat:string,e:any)
  {
    let bool:boolean = e.target.checked;
    this.onSetCategory.emit({cat,bool});
  }

  changePrice(min:boolean,e:any)
  {
      if(parseInt(e.target.value))
      {
        let price = parseInt(e.target.value);
        if(price>this.maxDishPrice) price = this.maxDishPrice;
        else if(price<this.minDishPrice) price = this.minDishPrice;

        if(min==true) 
        {
          this.onSetMinPrice.emit(price);
        }
        else 
        {
         this.onSetMaxPrice.emit(price);
        }
        e.target.value = price+"$";
      }
      else
      {
        if(min==true) e.target.value = this.minDishPrice+"$";
        else e.target.value = this.maxDishPrice+"$";

        if(min==true) 
        {
          this.onSetMinPrice.emit(this.minDishPrice);
        }
        else 
        {
         this.onSetMaxPrice.emit(this.maxDishPrice);
        }
      }
    
  }

  changeRating(e:any)
  {
      if(parseInt(e.target.value))
      {
        let rating = parseInt(e.target.value);
        if(rating>5) rating = 5;
        else if(rating<1) rating = 1;

        this.onSetRating.emit(rating);
        e.target.value = rating;
      }
      else
      {
        e.target.value = 1;
        this.onSetRating.emit(1);
      }
    
  }
  
}


