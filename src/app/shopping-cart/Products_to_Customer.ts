import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';

@EntityClass
export class Products_to_Customer extends IdEntity {
    Customer_ID = new IdColumn();
    Product_ID = new IdColumn();
    Product_Name = new StringColumn();
    packege_type = new StringColumn();
    Last_Update = new DateColumn();
    Kosher = new BoolColumn();
    constructor(private context:Context) {
        super({
            name: "Products_to_Customer",
            allowApiCRUD:Roles.admin,
            allowApiRead:c=>context.isSignedIn(),
            apiDataFilter:()=>{
                if (!context.isAllowed(Roles.admin)){
                    return this.Customer_ID.isEqualTo((<sneUserInfo>context.user).customerId);
                }

            }
        });
    }
} 