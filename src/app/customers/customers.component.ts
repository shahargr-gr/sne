import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { CustomerOrdersComponent } from '../customer-orders/customer-orders.component';
import { CustomerProductsComponent } from '../customer-products/customer-products.component';
import { ImportExcelComponentCustomer_products } from '../customer-products/import-from-excel.component';
import { SelectProductComponent } from '../select-product/select-product.component';
import { Customers } from '../shopping-cart/Customers';
import { Products_in_Order } from '../products-in-order/Products_in_Order';
import { ImportExcelComponent } from './import-from-excel.component';
import { ProductsInOrderComponent } from '../products-in-order/products-in-order.component';
import { DialogService } from '../common/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  constructor(private context: Context,private dialog:DialogService) { }
  customers = this.context.for(Customers).gridSettings({
    allowCRUD: true,
    confirmDelete:c=> this.dialog.confirmDelete(c.name.value),
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
    },

    {
      textInMenu: 'הזמנות ללקוח',
      click: async c => {
        this.context.openDialog(CustomerOrdersComponent,
          d => d.args = { customerId: c.id.value });
          
          
        
          
    }
  },
    
    {
      textInMenu: 'קליטת מחירון מאקסל',
      click: async c => {
        
        this.context.openDialog(ImportExcelComponentCustomer_products,
          d => d.args = { customerId: c.id.value });
      }
    }
  ]
  })
  ngOnInit() {
  }

}
