import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Dish } from 'src/app/models/dish.model';
import { Order } from 'src/app/models/order.model';
import { Rating } from 'src/app/models/rate.model';
import { AuthService } from 'src/app/services/auth.service';
import { DishService } from 'src/app/services/dish.service';
import { OrderService } from 'src/app/services/order.service';
import { RatingService } from 'src/app/services/rating.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dish-rate-form',
  templateUrl: './dish-rate-form.component.html',
  styleUrls: ['./dish-rate-form.component.css']
})
export class DishRateFormComponent {
  modelForm: FormGroup;
  @Input() dishId:string='';
  @Input() ratings:Rating[]=[];
  
  constructor(private formBuilder : FormBuilder,private ratingService:RatingService,private orderService:OrderService,private userService:UserService,private authService:AuthService) {
    this.modelForm = this.formBuilder.group({
      nick:['', [Validators.required]],
      text: ['', [Validators.required,Validators.minLength(50),Validators.maxLength(500)]],
    date:['', [Validators.pattern("^[0-1]?[0-9]-[0-3]?[0-9]-[1-2]?[0-9]{3}$")]],
    });

    this.orderService.orderCollection.get().subscribe((querySnapshot) => {
      let canRate=false;
      let orderid='';

      if(userService.getRole()=='menager'||userService.getRole()=='admin')
      {
        canRate=true;
        orderid='';
      }
      else if(userService.getRole()!='banned')
      querySnapshot.forEach((doc) => {
        if(doc.data().uid==authService.currUid && doc.data().dishid==this.dishId && doc.data().isRated==false)
        {
          canRate=true;
          orderid=doc.id;
        }
        
      });

      this.canRate= canRate;
      this.orderId = orderid;
    });

  }

  ngOnInit() : void {

    this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged();
    });
   
    this.onControlValueChanged();
  }

  canRate=false;
  orderId='';

  changeIsRatingOrder()
  {
    if(this.orderId!='')
    {
      this.orderService.orderCollection.doc(this.orderId).update({isRated:true});
      this.canRate=false;
      this.orderId = '';
    }
  }

  onSubmit(a:FormGroup)
  {
    
    if(this.modelForm.valid )
    {
      if(this.modelForm.value.date != '')
      {
        let date = new Date(this.modelForm.value.date);
        if(date.toString()!='Invalid Date') this.ratingService.addRating(this.dishId,this.modelForm.value.nick,this.modelForm.value.text,this.modelForm.value.date);
      }
      else
      {
        this.ratingService.addRating(this.dishId,this.modelForm.value.nick,this.modelForm.value.text);
      }
      this.changeIsRatingOrder();
      this.modelForm.reset();
    }
  }

  formErrors:any = {
    nick:'',
    text: '',
    date:'',
  }

  private validationMessages:any = {
      nick:{
        required: 'nick required'
      },
      text:
      {
        required: 'text required',
        minlength: 'text too short (min. 50)',
        maxlength: 'text too long',
      },
      date:{
        pattern:'wrong pattern'
      },
  }

  onControlValueChanged() {
    const form = this.modelForm;
  
    for (let field in this.formErrors) {
      this.formErrors[field] = '';
      let control = form.get(field); 
  
      if (control && control.dirty && !control.valid) {
        const validationMessages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += validationMessages[key] + ' ';
        }
      }
    }
  }

}
