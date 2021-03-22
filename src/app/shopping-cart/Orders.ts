import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';

@EntityClass
export class Orders extends IdEntity {
    Customer_ID = new IdColumn();
    Creation_Date = new DateColumn();
    Delivery_Date = new DateColumn();
    constructor(private context:Context) {
        super({
            name: "Orders",
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