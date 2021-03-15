import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn } from '@remult/core';

@EntityClass
export class Orders extends IdEntity {
    Customer_ID = new IdColumn();
    Creation_Date = new DateColumn();
    Delivery_Date = new DateColumn();
    constructor() {
        super({
            name: "Orders",
            allowApiCRUD:true,
            allowApiRead:true
        });
    }
} 