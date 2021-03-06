import { Component, OnInit } from '@angular/core';
import { Users } from './users';
import { Context, ServerFunction } from '@remult/core';

import { DialogService } from '../common/dialog';
import { Roles } from './roles';
import { Customers } from '../shopping-cart/Customers';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private dialog: DialogService, public context: Context) {
  }
  isAdmin() {
    return this.context.isAllowed(Roles.admin);
  }

  users = this.context.for(Users).gridSettings({
    allowDelete: true,
    allowInsert: true,
    allowUpdate: true,
    numOfColumnsInGrid: 3,
    get: {
      orderBy: h => [h.name],
      limit: 100
    },
    columnSettings: users => [
      users.name,
      {
        column:users.customer,
        valueList:this.context.for(Customers).getValueList()

      },
      users.admin


    ],
    confirmDelete: async (h) => {
      return await this.dialog.confirmDelete(h.name.value)
    },


  });


  async resetPassword() {
    if (await this.dialog.yesNoQuestion("האם אתה בטוח שתרצה לשנות את הסיסמא של " + this.users.currentRow.name.value + "?")) {
      await UsersComponent.resetPassword(this.users.currentRow.id.value);
      this.dialog.info("Password deleted");
    };

  }
  @ServerFunction({ allowed: c => c.isAllowed(Roles.admin) })
  static async resetPassword(userId: string, context?: Context) {
    let u = await context.for(Users).findId(userId);
    if (u){
      u.realStoredPassword.value = '';
      await u.save();
    }
  }



  ngOnInit() {
  }

}
