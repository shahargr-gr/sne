import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Products_in_Order } from './Products_in_Order';

@Component({
  selector: 'app-products-in-order',
  templateUrl: './products-in-order.component.html',
  styleUrls: ['./products-in-order.component.scss']
})
export class ProductsInOrderComponent implements OnInit {
  args: { orderId: string; };

  constructor(private context: Context) { }
  customersOrder = this.context.for(Products_in_Order).gridSettings({
    allowCRUD: true,
    where:pio=>pio.Order_ID.isEqualTo(this.args.orderId),
    columnSettings: c => [c.ProductSerialNumber, c.Product_Name,c.Number_Of_Units],
    // gridButtons: [
    //   {
    //     // name: 'טען לקוחות מאקסל',
    //     // click: async () => {
    //     //   await this.context.openDialog(ImportExcelComponent);
    //     //   this.customers.reloadData();
    //     // }
    //   }
    // ],
  //   rowButtons: [{
  //     textInMenu: 'מוצרים בהזמנה',
  //     click: async c => {
  //       this.context.openDialog(ProductsInOrderComponent,
  //         d => d.args = { customerId: c.id.value });
  //     }
  //   },

    
  // ]
  })

  ngOnInit() {
  }

}
