import { IdEntity, StringColumn, EntityClass, NumberColumn, DateColumn, IdColumn, Context, BoolColumn, ServerMethod, DataControlInfo } from '@remult/core';
import { Roles } from '../users/roles';
import { sneUserInfo } from '../users/users';
import { Products_in_Order, ShoppingCart } from './Products_in_Order';
import { Products_to_Customer } from './Products_to_Customer';
import { ShoppingCartComponent } from './shopping-cart.component';

@EntityClass
export class Orders extends IdEntity {
    Customer_ID = new IdColumn();
    Creation_Date = new DateColumn('תאריך יצירת הזמנה');
    IsAddition = new BoolColumn('האם זו תוספת להזמנה קיימת?');
    Delivery_Date = new DateColumn('בחר תאריך למשלוח');
  CustomerID: any;
  ProductSerialNumber: DataControlInfo<Orders>;
  Product_Name: DataControlInfo<Orders>;
    constructor(private context: Context) {
        super({
            name: "Orders",
            allowApiCRUD: false,
            allowApiRead: c => context.isSignedIn(),
            apiDataFilter: () => {
                if (!context.isAllowed(Roles.admin)) {
                    return this.Customer_ID.isEqualTo((<sneUserInfo>context.user).customerId);
                }

            }
        });
    }
    @ServerMethod({ allowed: context => context.isSignedIn() })
    async createTheOrder() {
        if (!this.isNew()){
            throw "invalid";
        }
        this.Customer_ID.value = (<sneUserInfo>this.context.user).customerId;
        this.Creation_Date.value = new Date();
        await this.save();
        for await (const shoppingCartItem of this.context.for(ShoppingCart).iterate({where:sc=>sc.Customer_ID.isEqualTo(this.Customer_ID)})) {
            var pod = this.context.for(Products_in_Order).create();
            pod.Order_ID.value = this.id.value;
            pod.Customer_ID.value=  this.Customer_ID.value;
            pod.Number_Of_Units.value = shoppingCartItem.Number_Of_Units.value;
            var p =await  this.context.for(Products_to_Customer).findId(shoppingCartItem.Product_ID);
            pod.Product_Name.value =  p.Product_Name.value;
            pod.ProductSerialNumber.value = p.ProductSerialNumber.value;
            pod.unit_type.value = p.unit_type.value;
            await pod.save();
            await shoppingCartItem.delete();
        }
    }
}