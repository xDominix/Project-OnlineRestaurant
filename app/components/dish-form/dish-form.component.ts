import { Component, EventEmitter, OnInit, Output,Input} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators} from '@angular/forms';
import { debounceTime, Subscriber } from 'rxjs';
import { Dish} from 'src/app/models/dish.model';
import { DishesComponent } from '../dishes/dishes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css']
})
export class DishFormComponent implements OnInit {
  modelForm: FormGroup;
  dish:Dish|undefined = undefined;
  constructor(private formBuilder : FormBuilder,private route: ActivatedRoute,private dishService:DishService,private router:Router) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.dish = dishService.getDish(id);
   }).unsubscribe();

   if(this.dish!==undefined)
    this.modelForm = this.formBuilder.group({
      name:[this.dish.name, [Validators.required,Validators.maxLength(11)]],
      price: [this.dish.price, [Validators.required,Validators.pattern("^[0-9]*$")]],
    category:[this.dish.category, [Validators.required,Validators.maxLength(15)]],
    region:[this.dish.region, [Validators.required,Validators.maxLength(15)]],
    ingredients:[this.dish.ingredients+',', [Validators.pattern(".*[,]$")]],
    maxAmount:[this.dish.maxAmount, [Validators.required,Validators.pattern("^[0-9]*$")]],
    description:[this.dish.description,[Validators.minLength(10)]],
    photosDirectory:[this.dish.photosDirectory],
    });
   else
    this.modelForm = this.formBuilder.group({
      name:['', [Validators.required,Validators.maxLength(11)]],
      price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    category:['', [Validators.required,Validators.maxLength(15)]],
    region:['', [Validators.required,Validators.maxLength(15)]],
    ingredients:['', [Validators.pattern(".*[,]$")]],
    maxAmount:['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    description:['',[Validators.minLength(10)]],
    photosDirectory:[''],
    });

  }

  ngOnInit() : void {

    this.modelForm.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.onControlValueChanged();
    });
   
    this.onControlValueChanged();
  }

  
  onSubmit(a:FormGroup)
  {
    if(this.modelForm.valid)
    {
      let res = new Dish(this.modelForm.value.name.toLowerCase(),Number(this.modelForm.value.price),this.modelForm.value.category.toLowerCase(), this.modelForm.value.region.charAt(0).toUpperCase()+this.modelForm.value.region.slice(1).toLowerCase(), this.modelForm.value.ingredients.split(",").slice(0, -1),Number(this.modelForm.value.maxAmount),this.modelForm.value.description,this.modelForm.value.photosDirectory ,5);
      if(this.dish == undefined) this.dishService.addDish(res).then(item=>this.router.navigate(['/menu',item.id]));
      else this.dishService.editDish(this.dish.id,res).then(item=>this.router.navigate(['/menu',this.dish?.id]));
      this.modelForm.reset();
      
    }
  }

  formErrors:any = {
    name:'',
    price: '',
    category:'',
    region:'',
    ingredients:'',
    maxAmount:'',
    description:'',
    photosDirectory:'',
  }

  private validationMessages:any = {
      name:{
        required: 'name required',
        maxlength:'11 characters only'
      },
      price:
      {
        required: 'price required',
        pattern: 'wrong format - only numbers'
      },
      category:{
        required: 'category required',
        maxlength:'15 characters only'
      },
      region:{
        required: 'region required',
        maxlength:'15 characters only'
      },
      ingredients:{
        pattern:'use "," every single element'
      },
      maxAmount:{
        required: 'maxAmount required',
        pattern: 'wrong format - only numbers'
      },
      description:{
        minlength:'too short description'
      },
      photosDirectory:{},
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