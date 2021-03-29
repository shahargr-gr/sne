import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Products_to_Customer } from '../shopping-cart/Products_to_Customer';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit {

  constructor(private context:Context) { }
  products:Products_to_Customer[];

  async ngOnInit() {
    this.products = await this.context.for(Products_to_Customer).find({limit:100});
  }

}