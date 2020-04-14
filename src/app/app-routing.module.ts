import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainsliderComponent } from './mainslider/mainslider.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { BooksellComponent } from './booksell/booksell.component';
const routes: Routes = [
  {path:'',redirectTo:'/mainslider',pathMatch:'full'},
  {path:'home',component:HeaderComponent}, 
  {path:'mainslider',component:MainsliderComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'booksell',component:BooksellComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[MainsliderComponent,CheckoutComponent,LoginComponent,RegistrationComponent,BooksellComponent]
