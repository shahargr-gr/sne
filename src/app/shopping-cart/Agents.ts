import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';

@EntityClass
export class Agents extends IdEntity {
    Name = new StringColumn();
    Phone = new NumberColumn();
    static Id: any;
    Customer_ID: any;
    constructor(private context:Context) {
        super({
            name: "Agents",
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