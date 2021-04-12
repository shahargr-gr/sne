import { IdEntity, EntityClass, NumberColumn, IdColumn, Context } from '@remult/core';
import { sneUserInfo } from '../users/users';


@EntityClass
export class ShoppingCart extends IdEntity {
    Product_ID = new IdColumn();
    Customer_ID = new IdColumn();
    Number_Of_Units = new NumberColumn("מספר יחידות");
    constructor(private context: Context) {
        super({
            name: "ShoppingCart",
            allowApiCRUD: context.isSignedIn(),
            allowApiRead: c => context.isSignedIn(),
            apiDataFilter: () => {
                return this.Customer_ID.isEqualTo((<sneUserInfo>context.user).customerId);
            }
        });
    }
}
