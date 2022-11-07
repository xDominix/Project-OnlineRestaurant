import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private userService:UserService) { }

  users:User[]=[];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users=>this.users=users);
  }

  setRole(uid:string,option:any)
  {
    if(typeof option === 'string' ) this.userService.changeRole(uid,option);
    else this.userService.changeRole(uid,option.target.value);
  }

}
