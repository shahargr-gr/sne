import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Orders } from '../shopping-cart/Orders';

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

  })

  ngOnInit() {
  }

}
