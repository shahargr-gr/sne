import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Agents } from './Agents';
import { Areas } from './Areas';
import { Customers } from './Customers';
import { Orders } from './Orders';
import { Products_in_Order } from './Products_in_Order';
import { Products_to_Customer } from './Products_to_Customer';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private context: Context) { }
  Agents = this.context.for(Agents).gridSettings({
    allowCRUD: true
  });
  Areas = this.context.for(Areas).gridSettings({
    allowCRUD: true
  });
  Customers = this.context.for(Customers).gridSettings({
    allowCRUD: true
  });
  Orders = this.context.for(Orders).gridSettings({
    allowCRUD: true
  });
  Products_to_Customer = this.context.for(Products_to_Customer).gridSettings({
    allowCRUD: true
  });
  Products_in_Order = this.context.for(Products_in_Order).gridSettings({
    allowCRUD: true
  });

  ngOnInit() {
  }

}
