import { Component, OnInit } from '@angular/core';
import { BoolColumn, Context, DateColumn } from '@remult/core';
import { InputAreaComponent } from '../common/input-area/input-area.component';
import { Agents } from './Agents';
import { Areas } from './Areas';
import { Customers } from './Customers';
import { Orders } from './Orders';
import { Products_in_Order } from '../products-in-order/Products_in_Order';
import { ShoppingCart } from "./ShoppingCart";
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
    this.shoppingCart = await this.context.for(ShoppingCart).find({ limit: 100,
    where:s=>s.Number_Of_Units.isDifferentFrom(0) });
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

  async add(sc: ShoppingCart, quantity: number) {
    var sc1 = sc;
    if (sc1.Number_Of_Units.value + quantity > 0) {
      sc1.Number_Of_Units.value += quantity;
      await sc.save();
    }
  }

  async less1Unit(sc: ShoppingCart, quantity: number) {
    var sc1 = sc;
    if (sc1.Number_Of_Units.value - quantity > 0) {
      sc1.Number_Of_Units.value -= quantity;
      await sc.save();
    }
  }

  async delProduct(sc: ShoppingCart) {
    var sc1 = sc;
    if (sc1.Number_Of_Units.value  > 0) {
      sc1.Number_Of_Units.value = 0;
      await sc.save();
    }
    this.ngOnInit();
    
  }

}