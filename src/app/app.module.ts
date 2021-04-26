import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RemultModule } from '@remult/angular';
import { UsersComponent } from './users/users.component';
import { UpdateInfoComponent } from './users/update-info/update-info.component';
import { RegisterComponent } from './users/register/register.component';
import { HomeComponent } from './home/home.component';
import { YesNoQuestionComponent } from './common/yes-no-question/yes-no-question.component';
import { SignInComponent } from './common/sign-in/sign-in.component';
import { InputAreaComponent } from './common/input-area/input-area.component';
import { DialogService } from './common/dialog';
import { AdminGuard } from './users/roles';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerProductsComponent } from './customer-products/customer-products.component';
import { SelectProductComponent } from './select-product/select-product.component';
import { ImportExcelComponent } from './customers/import-from-excel.component';
import { ImportExcelComponentCustomer_products } from './customer-products/import-from-excel.component';
import { CustomerOrdersComponent } from './customer-orders/customer-orders.component';
import { ProductsInOrderComponent } from './products-in-order/products-in-order.component';
import { ExportExcelComponent } from './products-in-order/export-to-excel.component';



@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UpdateInfoComponent,
    RegisterComponent,
    HomeComponent,
    YesNoQuestionComponent,
    SignInComponent,
    InputAreaComponent,
    LoginComponent,
    CreateOrderComponent,
    ShoppingCartComponent,
    ContactUsComponent,
    CustomersComponent,
    CustomerProductsComponent,
    SelectProductComponent,
    ImportExcelComponent,
    ImportExcelComponentCustomer_products,
    CustomerOrdersComponent,
    ProductsInOrderComponent,
    ExportExcelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RemultModule,
    BrowserAnimationsModule
  ],
  providers: [DialogService, AdminGuard, {
    provide: APP_INITIALIZER,
    deps: [],
    useFactory: waitOnInit,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [YesNoQuestionComponent, SignInComponent, InputAreaComponent, CustomerProductsComponent,
    ExportExcelComponent, ImportExcelComponent,ImportExcelComponentCustomer_products, CustomerOrdersComponent,ProductsInOrderComponent]
})
export class AppModule { }
export function waitOnInit() {
  if (false)
    return () => { };
  else
    return async () => {
      return new Promise((res) => setTimeout(() => {
        res({})
      }, 10));
    }
}