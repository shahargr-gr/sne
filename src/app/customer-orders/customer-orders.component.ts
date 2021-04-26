import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import { Orders } from '../shopping-cart/Orders';
import { Products_in_Order } from '../products-in-order/Products_in_Order';
import { ProductsInOrderComponent } from '../products-in-order/products-in-order.component';
import { ExportExcelComponent } from '../products-in-order/export-to-excel.component';
import * as xlsx from 'xlsx';//https://sheetjs.com/
import { Customers } from '../shopping-cart/Customers';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.scss']
})
export class CustomerOrdersComponent implements OnInit {

  constructor(private context: Context) { }

  args: {
    customerId: string
  };

  customerOrders = this.context.for(Orders).gridSettings({
    where: co => co.Customer_ID.isEqualTo(this.args.customerId),
    enterRow: co => {
      if (co.isNew())
        co.Customer_ID.value = this.args.customerId;
    },

    allowCRUD: true,
    columnSettings: o => [
      o.Creation_Date,
      o.Delivery_Date,
    ],
    gridButtons: [
      {
        name: 'ייצא לקובץ אקסל',
        click: async () => {
          await this.context.openDialog(ExportExcelComponent, i => i.args = {
            customerId: this.args.customerId
          });
          this.customerOrders.reloadData();
        }
      }
    ],
    rowButtons: [{
      textInMenu: ' מוצרים בהזמנה',
      click: async c => {
        this.context.openDialog(ProductsInOrderComponent,
          d => d.args = { orderId: c.id.value });
      }
    },
    {
      textInMenu: ' ייצא לקובץ אקסל',
      click: async o => {
        let result = [];
        let c = await this.context.for(Customers).findId(o.Customer_ID);
        result.push(["מס לקוח"
          , "שם לקוח",
          "איש קשר",
          "הגדרת תפקיד",
          "תאריך הזמנה"]);
        result.push([c.CustomerNumber.value, c.name.value, "", "", o.Creation_Date.displayValue]);
        result.push(['מק"ט',
          "תאור מוצר",
          "קוד סוג אריזה",
          "מס. אריזות",
          "מחיר ליחידה",
          "כמות",
          "יתרה לאספקה",
          "כשרות",
          "סהכ מחיר"]);
        for await (const p of this.context.for(Products_in_Order).iterate({
          where: p => p.Order_ID.isEqualTo(o.id.value)
        })) {
          result.push([
            p.ProductSerialNumber.value,
            p.Product_Name.value,
            "","","",
            p.Number_Of_Units.value,
            "","",""
          ])
        }
        console.log(result);
        let wb = xlsx.utils.book_new();
        wb.Workbook = {Views:[{RTL:true}]};
        xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(result, { skipHeader: true }));
        xlsx.writeFile(wb, "products.xlsx");
      }
    }
    ],

  })

  ngOnInit() {
  }

}
