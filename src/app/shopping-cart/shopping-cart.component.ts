import { Component, OnInit } from '@angular/core';
import { BoolColumn, Context, DateColumn } from '@remult/core';
import { InputAreaComponent } from '../common/input-area/input-area.component';
import { Agents } from './Agents';
import { Areas } from './Areas';
import { Customers } from './Customers';
import { Orders } from './Orders';
import { Products_in_Order, ShoppingCart } from './Products_in_Order';
import { Products_to_Customer } from './Products_to_Customer';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private context: Context) { }
  shoppingCart: ShoppingCart[];

  async ngOnInit() {
    this.shoppingCart = await this.context.for(ShoppingCart).find({ limit: 100 });
  }
  product(sc: ShoppingCart) {
    return this.context.for(Products_to_Customer).lookup(sc.Product_ID);
  }
  createOrder() {
    var order = this.context.for(Orders).create();

    var d = new Date();
    d.setDate(d.getDate() + 1);
    order.Delivery_Date.value = d;

    this.context.openDialog(InputAreaComponent, area => {
      area.args = {
        title: 'הוסף הזמנה',
        columnSettings: () => [order.Delivery_Date,
        order.IsAddition],
        ok: async () => { 
          await order.createTheOrder();
          this.shoppingCart = [];
        }
      }
    });

  }

}
