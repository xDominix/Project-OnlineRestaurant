import { Component, OnInit ,Input, Output, Type, Pipe, PipeTransform, ViewChild} from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap, Router } from '@angular/router';
import { Subject } from 'rxjs';
import {  Dish } from 'src/app/models/dish.model';
import { Rating } from 'src/app/models/rate.model';
import { AuthService } from 'src/app/services/auth.service';
import { DishService } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { FiltersComponent } from '../filters/filters.component';
import { ShoppingcartinfoComponent } from '../shoppingcartinfo/shoppingcartinfo.component';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})

export class DishesComponent implements OnInit{
  constructor(private router: Router,private dishService:DishService,private orderService:OrderService,private authService:AuthService,private userService:UserService,private route: ActivatedRoute){
   this.route.params.subscribe(params => {
      this.idParam = params['id'];
   }).unsubscribe();
  }

  idParam='';
  dishList:Dish[]=[];

  orderItems = new Map<string, number>(); //id - amount
  regionsEnabled:string[] =[];
  categoriesEnabled:string[] =[];
  minPriceFilter = -1;
  maxPriceFilter = -1;
  ratingFilter = 1;

  role='guest';

  addDishMode = false;
  setAddDeleteDish()
  {
    this.editDishMode = false;
    this.addDishMode = !this.addDishMode;
  }

  editDishMode=false;
  setEditDish()
  {
    this.addDishMode=false;
    this.editDishMode = !this.editDishMode;
  }

  ngOnInit()
  {
    this.dishService.getDishes().subscribe(items=>{
      this.dishList=items;
      this.setFilters();
      this.setMinMaxPrices();
    });
    this.orderItems = this.orderService.orderItems;

    this.authService.isAuthenticated().subscribe(
      e=>{
        if(e) this.isAuthenticated = e;
        else  this.isAuthenticated = false;
      });

      this.authService.getUid().subscribe(uid=>{
        if(uid){this.userService.getUser(uid).subscribe(user=>{ if(user.get('role')!==undefined){this.role=user.get('role')} else this.role = 'guest';})}
        else this.role = 'guest';
      });
  }

  

  minDishPrice = 0; 
  maxDishPrice = 0; 
  setMinMaxPrices()
  {
    this.maxDishPrice = this.dishList.length==0?10000: this.dishList.reduce((acc, shot) => acc = acc > shot.price? acc : shot.price, 0);
    this.minDishPrice =  this.dishList.length==0?0: this.dishList.reduce((acc, shot) => acc = acc < shot.price? acc : shot.price, 10000);
  }

  @ViewChild(FiltersComponent) filtersChild!:  FiltersComponent;
  setFilters()
  {
    this.filtersChild.setFilters(this.dishList);
  }


  public orderString:string = "";
  setShoppingCart(e:{dish:Dish,add:boolean})
  {
    if(e.add)
    {
      let amount = this.orderItems.get(e.dish.id);
      if(amount !== undefined)this.orderItems.set(e.dish.id,amount+1);
      else this.orderItems.set(e.dish.id,1);
    }
    else
    {
      let amount = this.orderItems.get(e.dish.id);
      if(amount !== undefined)
      {
        if(amount==1)this.orderItems.delete(e.dish.id);
        else this.orderItems.set(e.dish.id,amount-1);
      }
    }

    this.orderService.changeOrderItems(this.orderItems);
  }

  
  getDishAmount(id:string)//ilosc zamowionego dania
  {
    let amount = this.orderItems.get(id);
    if(amount !== undefined)
    {
      return amount;
    }
    return 0;
  }
  
  setRegionFilter(e:{reg:string,bool:boolean})
  {
    if(e.bool==true)
    {
      this.regionsEnabled.push(e.reg);
    }
    else
    {
      const index =this.regionsEnabled.indexOf(e.reg, 0);
      if (index > -1) {
         this.regionsEnabled.splice(index,1);
      }
    }
  }
  setCategoryFilter(e:{cat:string,bool:boolean})
  {
    if(e.bool==true)
    {
      this.categoriesEnabled.push(e.cat);
    }
    else
    {
      const index =this.categoriesEnabled.indexOf(e.cat, 0);
      if (index > -1) {
         this.categoriesEnabled.splice(index,1);
      }
    }
  }
  setMinPriceFilter(price:number)
  {
    this.minPriceFilter = price;
  }
  setMaxPriceFilter(price:number)
  {
    this.maxPriceFilter = price;
  }
  setRatingFilter(rating:number)
  {
    this.ratingFilter = rating;
  }

  checkRegion(reg:string)
  {
    return this.regionsEnabled.length==0 || this.regionsEnabled.indexOf(reg) !== -1;
  }
  checkCategory(cat:string)
  {
    return this.categoriesEnabled.length==0 || this.categoriesEnabled.indexOf(cat) !== -1;
  }
  checkPrice(price:number)
  {
      return (this.minPriceFilter==-1||price>=this.minPriceFilter) && (this.maxPriceFilter==-1 || price<=this.maxPriceFilter);
  }
  checkRating(rating:number)
  {
    return rating>=this.ratingFilter;
  }


  get dishListFiltered() {
    return this.dishList.filter(x=> 
      {
        return this.checkRegion(x.region) && this.checkCategory(x.category) &&this.checkPrice(x.price) && this.checkRating(x.rating);
      });
  }

  sliceParams:{startIndex:number,endIndex:number}={startIndex:0,endIndex:10000}
  get dishListOnPage()
  {
    return this.dishListFiltered.slice(this.sliceParams.startIndex,this.sliceParams.endIndex);
  }

  showForm()
  {
    this.router.navigate(['../dish-form']);
  }

  openInfoAbout:Dish|undefined;

  isAuthenticated=false;

}