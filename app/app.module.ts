import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AuthService } from './services/auth.service';
import { DishService } from './services/dish.service';

import { AppComponent } from './app.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishComponent } from './components/dish/dish.component';
import { DishFormComponent } from './components/dish-form/dish-form.component';
import { RatingComponent } from './components/rating/rating.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ShoppingcartinfoComponent } from './components/shoppingcartinfo/shoppingcartinfo.component';
import { AppRoutingModule } from './app-routing.module';
import { StartPageComponent } from './components/start-page/start-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DishInfoComponent } from './components/dish-info/dish-info.component';
import { DishRateFormComponent } from './components/dish-rate-form/dish-rate-form.component';
import { PaginationBarComponent } from './components/pagination-bar/pagination-bar.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesComponent,
    DishComponent,
    DishFormComponent,
    RatingComponent,
    FiltersComponent,
    ShoppingcartinfoComponent,
    StartPageComponent,
    PageNotFoundComponent,
    DishInfoComponent,
    DishRateFormComponent,
    PaginationBarComponent,
    OrderDetailsComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminViewComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DishService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
