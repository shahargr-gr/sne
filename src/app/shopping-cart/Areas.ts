import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn } from '@remult/core';

@EntityClass
export class Areas extends IdEntity {
    name = new StringColumn();
    Delivery_Days = new StringColumn();
    static Id: any;
    constructor() {
        super({
            name: "Areas",
            allowApiCRUD:true,
            allowApiRead:true
        });
    }
} 

