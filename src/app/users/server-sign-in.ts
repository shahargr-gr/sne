import { Roles } from './roles';
import { JWTCookieAuthorizationHelper } from '@remult/server';
import { ServerFunction } from '@remult/core';
import { UserInfo, Context } from '@remult/core';
import { sneUserInfo, Users } from './users';
import { Customers } from '../shopping-cart/Customers';
export class ServerSignIn {
    static helper: JWTCookieAuthorizationHelper;
    @ServerFunction({ allowed: () => true })
    static async signIn(user: string, password: string, context?: Context) {
        
        let result: sneUserInfo;
        let u = await context.for(Users).findFirst(h => h.name.isEqualTo(user));
        if (u)
            if (!u.realStoredPassword.value || Users.passwordHelper.verify(password, u.realStoredPassword.value)) {
                result = {
                    id: u.id.value,
                    customerId:u.customer.value,
                    customerName:(await context.for(Customers).lookupAsync(u.customer)).name.value,
                    roles: [],
                    name: u.name.value
                };
                if (u.admin.value) {
                    result.roles.push(Roles.admin);
                }
            }

        if (result) {
            return ServerSignIn.helper.createSecuredTokenBasedOn(<any>result);
        }
        return undefined;
    }
}
