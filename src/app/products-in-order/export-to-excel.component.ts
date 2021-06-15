import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';
import * as xlsx from 'xlsx';//https://sheetjs.com/
import { Products_in_Order } from './Products_in_Order';
import { sneUserInfo } from '../users/users';

@Component({
  selector: 'app-export-to-excel',
  template: `
    <button mat-raised-button (click)="doExport()">Export products to excel</button>
  `,
  styles: []
})
export class ExportExcelComponent implements OnInit {
    args:{
        customerId:string
    }

  constructor(private context: Context) { }

  ngOnInit() {
  }
  async doExport() {

    let result = [];

    for await (const p of  this.context.for(Products_in_Order).iterate()) {
      let item = {};
      let row = [];
      for (const col of p.columns) {
        row.push( col.value);
      }
      result.push(row);
    }
    console.log(result);
    let wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(result,{skipHeader:true}));
    xlsx.writeFile(wb, "10001_15.06.2021.xlsx");

  }

}