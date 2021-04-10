// import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn } from '@remult/core';
import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';
@EntityClass
export class Products_in_Order extends IdEntity {
    
    Order_ID = new IdColumn();
    Number_Of_Units = new NumberColumn('כמות יחידות');
    Customer_ID = new StringColumn();
    ProductSerialNumber = new StringColumn('מק"ט');
    Product_Name = new StringColumn('שם המוצר');
    unit_type = new StringColumn('יחידת מידה');
    
    constructor(private context: Context) {
        super({
            name: "Products_in_Order",
            allowApiCRUD: Roles.admin,
            allowApiRead: c => context.isSignedIn(),
            apiDataFilter: () => {
                if (!context.isAllowed(Roles.admin)) {
                    return this.Customer_ID.isEqualTo((<sneUserInfo>context.user).customerId);
                }

            }
        });
    }
}

@EntityClass
export class ShoppingCart extends IdEntity {
    Product_ID = new IdColumn();
    Customer_ID = new IdColumn();
    Number_Of_Units = new NumberColumn("מספר יחידות");
    constructor(private context: Context) {
        super({
            name: "ShoppingCart",
            allowApiCRUD: false,
            allowApiRead: c => context.isSignedIn(),
            apiDataFilter: () => {
                return this.Customer_ID.isEqualTo((<sneUserInfo>context.user).customerId);
            }
        });
    }
}