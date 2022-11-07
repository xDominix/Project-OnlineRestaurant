import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router ,private userService:UserService){ }

  canActivate(route: ActivatedRouteSnapshot) {

    let roles = route.data['roles'] as string[];
    if(roles!==undefined && roles.includes(this.userService.getRole())) return true;

    let antiroles = route.data['antiroles'] as string[];
    if(antiroles!==undefined && !antiroles.includes(this.userService.getRole())) return true;

    this.router.navigate(['']);
    return false;
  }
}