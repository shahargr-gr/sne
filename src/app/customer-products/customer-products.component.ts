import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Products_to_Customer } from '../shopping-cart/Products_to_Customer';
import { ImportExcelComponentCustomer_products } from './import-from-excel.component';


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
    where:p=>p.CustomerId.isEqualTo(this.args.customerId),
    enterRow:p=>{
      if (p.isNew())
      p.CustomerId.value = this.args.customerId;
    },
    allowCRUD : true,
    columnSettings:pc=>[
      pc.ProductSerialNumber,
      pc.Product_Name,
      pc.unit_type,
      pc.category
    ],
    gridButtons:[
      {
        name:'טען מוצרים ללקוח מאקסל',
        click: async () =>{
          await this.context.openDialog(ImportExcelComponentCustomer_products,i=>i.args={
            customerId:this.args.customerId
          });
          this.products.reloadData();
        }
      }
    ]
  

  })

  ngOnInit() {
  }

}