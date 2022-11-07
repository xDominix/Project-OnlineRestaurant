import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishesComponent } from './components/dishes/dishes.component';
import { AuthService } from './services/auth.service';
import { OrderService } from './services/order.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn = false;
  currRole='guest';
  currName='';

 constructor(private authService:AuthService,private userService:UserService,private router:Router){
  authService.isAuthenticated().subscribe({
    next: (v) => v? this.isLoggedIn=true:this.isLoggedIn=false,
    error: (e) => alert(e),
    complete: () => console.info('complete') 
  });

  this.authService.getUid().subscribe(uid=>{
    if(uid){this.userService.getUser(uid).subscribe(user=>{ 
      if(user.get('role')!==undefined){this.currRole=user.get('role')} else this.currRole = 'undef';
      if(user.get('name')!==undefined){this.currName=user.get('name')} else this.currName = 'undef';
    })}
    else 
    {this.currRole = 'guest';
    this.currName = 'guest';}
  });
}

 logOut()
 {
   this.authService.logout();
 }
}
