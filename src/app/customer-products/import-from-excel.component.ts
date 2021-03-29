import { Component, OnInit } from '@angular/core';
import { Context, ServerFunction } from '@remult/core';
import * as xlsx from 'xlsx';//https://sheetjs.com/
import { Customers } from '../shopping-cart/Customers';
import { Products_to_Customer } from '../shopping-cart/Products_to_Customer';
import { Roles } from '../users/roles';

@Component({
    selector: 'app-import-excel',
    template: `
      <input #fileInput type="file" (input)="onFileInput($event)" />
  `,
    styles: []
})
export class ImportExcelComponentCustomer_products {
    args:{
        customerId:string
    }

    async onFileInput(eventArgs: any) {
        for (const file of eventArgs.target.files) {
            let f: File = file;
            await new Promise((res) => {
                var fileReader = new FileReader();

                fileReader.onload = async (e: any) => {

                    // pre-process data
                    var binary = "";
                    var bytes = new Uint8Array(e.target.result);
                    var length = bytes.byteLength;
                    for (var i = 0; i < length; i++) {
                        binary += String.fromCharCode(bytes[i]);
                    }
                    // call 'xlsx' to read the file
                    var oFile = xlsx.read(binary, { type: 'binary', cellDates: true, cellStyles: true });
                    let sheets = oFile.SheetNames;
                    var dataArray = xlsx.utils.sheet_to_json(oFile.Sheets[sheets[0]], { header: 1 });



                    let processed = await ImportExcelComponentCustomer_products.ImportCustomer_Products(this.args.customerId,dataArray);
                    alert("loaded " + processed + " customers");
                };
                fileReader.readAsArrayBuffer(f);
            });
            return;//to import the first file only
        }
    }

    @ServerFunction({ allowed: Roles.admin })
    static async ImportCustomer_Products(customerId:string,dataArray: any, context?: Context) {
        
        
            let i = 0;
            for (let index = 3; index < dataArray.length; index++) {
                i++;
                const row = dataArray[index];
                let p = await context.for(Products_to_Customer).findFirst(p =>
                    p.CustomerId.isEqualTo(customerId).and(
                     p.ProductSerialNumber.isEqualTo(row[xlsx.utils.decode_col("A")])));
                if (!p) {
                    p = context.for(Products_to_Customer).create();
                    p.ProductSerialNumber.value = row[xlsx.utils.decode_col("A")];
                    p.CustomerId.value = customerId;
                }
                p.Product_Name.value = row[xlsx.utils.decode_col("E")];
                p.category.value= row[xlsx.utils.decode_col("O")];
                await p.save();
            }

            return i;
        

    }

}