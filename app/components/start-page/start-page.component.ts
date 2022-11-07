import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

  constructor(private authService:AuthService,private userService:UserService){}

  title="Hello!";
  ngOnInit()
  {
    this.authService.userData.subscribe(items=>
      {
        if(items?.uid)
        {
          this.userService.getUser(items?.uid).subscribe(
            user=>
            {
              let name = user.get('name');
              this.title="Hello"+name[0].toUpperCase()+name.slice(1).toLowerCase()+"!";
            }
          );

        }
        else
        {
          this.title="Hello!";
        }
      } );
  }
}
