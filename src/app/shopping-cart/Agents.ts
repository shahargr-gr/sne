import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn } from '@remult/core';

@EntityClass
export class Agents extends IdEntity {
    Name = new StringColumn();
    Phone = new NumberColumn();
    static Id: any;
    constructor() {
        super({
            name: "Agents",
            allowApiCRUD:true,
            allowApiRead:true
        });
    }
} 