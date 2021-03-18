import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { CustomerProductsComponent } from '../customer-products/customer-products.component';
import { Customers } from '../shopping-cart/Customers';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private context: Context) { }
  customers = this.context.for(Customers).gridSettings({
    allowCRUD: true,
    columnSettings: c => [c.name],
    rowButtons:[{
      textInMenu:'מוצרים',
      click:async c=>{
          this.context.openDialog(CustomerProductsComponent,
            d=>d.args={customerId:c.id.value});
      }
    }]
  })
  ngOnInit() {
  }

}
