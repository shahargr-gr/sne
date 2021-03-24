import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { CustomerProductsComponent } from '../customer-products/customer-products.component';
import { Customers } from '../shopping-cart/Customers';
import { ImportExcelComponent } from './import-from-excel.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private context: Context) { }
  customers = this.context.for(Customers).gridSettings({
    allowCRUD: true,
    columnSettings: c => [c.name, c.CustomerNumber],
    gridButtons: [
      {
        name: 'טען לקוחות מאקסל',
        click: async () => {
          await this.context.openDialog(ImportExcelComponent);
          this.customers.reloadData();
        }
      }
    ],
    rowButtons: [{
      textInMenu: 'מוצרים',
      click: async c => {
        this.context.openDialog(CustomerProductsComponent,
          d => d.args = { customerId: c.id.value });
      }
    }]
  })
  ngOnInit() {
  }

}
