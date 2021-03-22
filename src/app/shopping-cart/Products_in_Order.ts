// import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn } from '@remult/core';
import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';
@EntityClass
export class Products_in_Order extends IdEntity {
    Product_ID = new IdColumn();
    Order_ID = new IdColumn();
    Number_Of_Units = new NumberColumn();
    constructor() {
        super({
            name: "Products_in_Order",
            allowApiCRUD:true,
            allowApiRead:true
        });
    }
} 