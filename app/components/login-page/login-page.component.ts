import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  modelForm: FormGroup;
  
  constructor(private formBuilder : FormBuilder,private authService:AuthService,private router:Router) {
    this.modelForm = this.formBuilder.group({
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
      this.authService.login(this.modelForm.value.email,this.modelForm.value.password);
      this.modelForm.reset();
    }
  }

  formErrors:any = {
    email:'',
    password:'',
  }

  private validationMessages:any = {
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
