import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, Context } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';

@EntityClass
export class Agents extends IdEntity {
    Name = new StringColumn('שם');
    Phone = new NumberColumn('טלפון');
    constructor(private context:Context) {
        super({
            name: "Agents",
            allowApiCRUD:Roles.admin,
            allowApiRead:c=>context.isSignedIn(),
        });
    }
} 