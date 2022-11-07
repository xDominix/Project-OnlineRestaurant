import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './components/start-page/start-page.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './guard/auth.guard';
import { DishInfoComponent } from './components/dish-info/dish-info.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';


const routes: Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:StartPageComponent},
  {path:'menu',component:DishesComponent},
  {path:'menu/:id',component:DishesComponent},
  {path:'dish-form',component:DishFormComponent,canActivate: [AuthGuard],data: {roles: ['admin','menager']}},
  {path:'dish-form/:id',component:DishFormComponent,canActivate: [AuthGuard],data: {roles: ['admin','menager']}},
  {path:'admin-view',component:AdminViewComponent,canActivate: [AuthGuard],data: {roles: ['admin']}},
  {path:'order-details',component:OrderDetailsComponent,canActivate: [AuthGuard],data: {antiroles: ['guest']}},
  {path:'login',component:LoginPageComponent},
  {path:'register',component:RegisterPageComponent},
  {path:'**',component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule { }
