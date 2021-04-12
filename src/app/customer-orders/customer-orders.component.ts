import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Orders } from '../shopping-cart/Orders';
import { Products_in_Order } from '../products-in-order/Products_in_Order';
import { ProductsInOrderComponent } from '../products-in-order/products-in-order.component';
import { ExportExcelComponent } from '../products-in-order/export-to-excel.component';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  constructor(private context:Context) { }

  args:{
    customerId:string
  };

  customerOrders = this.context.for(Orders).gridSettings({
    where:co=>co.Customer_ID.isEqualTo(this.args.customerId),
    enterRow:co=>{
      if (co.isNew())
      co.Customer_ID.value = this.args.customerId;
    },
    
    allowCRUD : true,
    columnSettings:o=>[
      o.Creation_Date,
      o.Delivery_Date,
    ],
    gridButtons:[
      {
        name:'ייצא לקובץ אקסל',
        click: async () =>{
          await this.context.openDialog(ExportExcelComponent,i=>i.args={
            customerId:this.args.customerId
          });
          this.customerOrders.reloadData();
        }
      }
    ],
    rowButtons: [{
      textInMenu: ' מוצרים בהזמנה',
      click: async c => {
        this.context.openDialog(ProductsInOrderComponent,
          d => d.args = { customerId: c.id.value });
      }
    },
    {
      textInMenu: ' ייצא לקובץ אקסל',
      click: async c => {
        this.context.openDialog(ExportExcelComponent,
          d => d.args = { customerId: c.id.value });
      }
    }
  ],

  })

  ngOnInit() {
  }

}
