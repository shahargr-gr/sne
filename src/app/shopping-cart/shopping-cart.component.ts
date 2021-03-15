import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Agents } from './Agents';
import { Areas } from './Areas';
import { Customers } from './Customers';

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

  ngOnInit() {
  }

}
