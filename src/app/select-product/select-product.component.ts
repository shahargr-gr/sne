import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { ShoppingCart } from '../shopping-cart/Products_in_Order';
import { Products_to_Customer } from '../shopping-cart/Products_to_Customer';
import { sneUserInfo } from '../users/users';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {

  constructor(private context: Context) { }
  products: Products_to_Customer[];



  async ngOnInit() {
    this.products = await this.context.for(Products_to_Customer).find({ limit: 100 });
    for (const itemInShoppingCart of await this.context.for(ShoppingCart).find({
      where: s => s.Customer_ID.isEqualTo(((<sneUserInfo>this.context.user).customerId)),
      limit: 100
    })) {
      this.shoppingCartMap.set(itemInShoppingCart.Product_ID.value, itemInShoppingCart);
    }

  }
  shoppingCartMap = new Map<string, ShoppingCart>();
  productInShoppingCart(p: Products_to_Customer) {
    var r = this.shoppingCartMap.get(p.id.value);
    if (!r) {
      r = this.context.for(ShoppingCart).create();
      r.Customer_ID.value = ((<sneUserInfo>this.context.user).customerId);
      r.Product_ID.value = p.id.value;
      r.Number_Of_Units.value = 0;
      this.shoppingCartMap.set(p.id.value,r);
    }
    return r;
  }
  async add(p: Products_to_Customer, quantity: number) {
    var sc = this.productInShoppingCart(p);
    if (sc.Number_Of_Units.value + quantity > 0) {
      sc.Number_Of_Units.value += quantity;
      await sc.save();
    }
  }
  shouldSave(p: Products_to_Customer) {
    var r = this.productInShoppingCart(p);
    if (r.isNew())
      return r.Number_Of_Units.value > 0;
    else
      return r.Number_Of_Units.value != r.Number_Of_Units.originalValue;


  }

}