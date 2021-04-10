import { RemultModule, NotSignedInGuard, SignedInGuard } from '@remult/angular';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, RouterModule, Route, ActivatedRouteSnapshot } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { RegisterComponent } from './users/register/register.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';

import { UsersComponent } from './users/users.component';
import { Roles, AdminGuard } from './users/roles';
import { ShowDialogOnErrorErrorHandler } from './common/dialog';
import { LoginComponent } from './login/login.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomersComponent } from './customers/customers.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent, data: { name: 'דף הבית' } },
  { path: 'select-product', component: SelectProductComponent,canActivate: [SignedInGuard],data:{name:'מוצרים'} },
  { path: 'Customers', component: CustomersComponent, canActivate: [AdminGuard], data:{name:'לקוחות'} },
  { path: 'User Accounts', component: UsersComponent, canActivate: [AdminGuard], data: { name: 'ניהול משתמשים' } },
  { path: 'create-order', component: CreateOrderComponent,canActivate: [SignedInGuard], data: { name: 'צור הזמנה' } },
  { path: 'shopping-cart', component: ShoppingCartComponent,canActivate: [SignedInGuard], data: { name: 'עגלת קניות' }},
  { path: 'contact-us', component: ContactUsComponent, data: { name: 'צור קשר' }},



  // { path: 'Login', component: LoginComponent },

  { path: 'register', component: RegisterComponent, canActivate: [AdminGuard], data: { name: 'הרשמה' } },
  { path: 'Account Info', component: UpdateInfoComponent, canActivate: [SignedInGuard] , data: { name: 'ניהול פרטי משתמש' }},
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: '**', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RemultModule],
  providers: [AdminGuard, { provide: ErrorHandler, useClass: ShowDialogOnErrorErrorHandler }],
  exports: [RouterModule]
})
export class AppRoutingModule { }

