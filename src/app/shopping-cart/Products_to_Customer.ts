import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, BoolColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';

@EntityClass
export class Products_to_Customer extends IdEntity {
    CustomerId = new StringColumn();
    ProductSerialNumber = new StringColumn('מק"ט');
    Product_Name = new StringColumn();
    unit_type = new StringColumn();
    Last_Update = new DateColumn();
    Kosher = new BoolColumn();
    category= new StringColumn();
    constructor(private context:Context) {
        super({
            name: "Products_to_Customer",
            allowApiCRUD:Roles.admin,
            allowApiRead:c=>context.isSignedIn(),
            defaultOrderBy:()=>this.Product_Name,
            apiDataFilter:()=>{
                if (!context.isAllowed(Roles.admin)){
                    return this.CustomerId.isEqualTo((<sneUserInfo>context.user).customerId);
                }

            }
        });
    }
} 