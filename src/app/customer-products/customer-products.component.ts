import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Products_to_Customer } from '../shopping-cart/Products_to_Customer';
import { ImportExcelComponent } from './import-from-excel.component';


@Component({
  selector: 'app-customer-products',
  templateUrl: './customer-products.component.html',
  styleUrls: ['./customer-products.component.scss']
})
export class CustomerProductsComponent implements OnInit {

  constructor(private context:Context) { }

  args:{
    customerId:string
  };
  products = this.context.for(Products_to_Customer).gridSettings({
    where:p=>p.Customer_ID.isEqualTo(this.args.customerId),
    enterRow:p=>{
      if (p.isNew())
      p.Customer_ID.value = this.args.customerId;
    },
    allowCRUD : true,
    columnSettings:p=>[
      p.Product_Name
    ]

  })

  ngOnInit() {
  }

}
