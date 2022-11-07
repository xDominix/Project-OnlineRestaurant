import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  modelForm: FormGroup;
  
  constructor(private formBuilder : FormBuilder,private authService:AuthService,private router:Router,private userService:UserService) {
    this.modelForm = this.formBuilder.group({
      name:['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      lastname:['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      email:['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password:['', [Validators.required,Validators.minLength(8)]],
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
    
    if(this.modelForm.valid )
    {
      this.authService.register(this.modelForm.value.name,this.modelForm.value.lastname,this.modelForm.value.email,this.modelForm.value.password);
    }
  }

  formErrors:any = {
    name:'',
    lastname:'',
    email:'',
    password:'',
  }

  private validationMessages:any = {
    name:
    {
      required:'name required',
      pattern:'only letters accepted',
    },
    lastname:
    {
      required:'last name required',
      pattern:'only letters accepted',
    },
      email:{
        required: 'email required',
        pattern:'wrong pattern',
       
      },
      password:
      {
        required: 'password required',
        minlength: 'password should have at least 8 characters',
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
