import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn } from '@remult/core';

@EntityClass
export class Products_to_Customer extends IdEntity {
    Customer_ID = new IdColumn();
    Product_ID = new IdColumn();
    Product_Name = new StringColumn();
    packege_type = new StringColumn();
    Last_Update = new DateColumn();
    Kosher = new BoolColumn();
    constructor() {
        super({
            name: "Products_to_Customer",
            allowApiCRUD:true,
            allowApiRead:true
        });
    }
} 