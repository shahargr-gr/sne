import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, Context } from '@remult/core';
import { Agent } from 'http';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';
import { Agents } from './Agents';
import { Areas } from './Areas';

@EntityClass
export class Customers extends IdEntity {
    name = new StringColumn('שם');
    Area_ID = new IdColumn();
    Agent_ID= new IdColumn();
    CustomerNumber = new NumberColumn('מספר לקוח');
    constructor(private context:Context) {
        super({
            name: "Customers",
            allowApiCRUD:Roles.admin,
            allowApiRead:c=>context.isSignedIn(),
            apiDataFilter:()=>{
                if (!context.isAllowed(Roles.admin)){
                    return this.id.isEqualTo((<sneUserInfo>context.user).customerId);
                }

            }
        });
    }
} 
