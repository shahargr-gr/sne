import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { JwtSessionManager } from '@remult/angular';
import { Context } from '@remult/core';
import { ServerSignIn } from "../../users/server-sign-in";
import { DialogService } from '../dialog';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private dialog: DialogService,
    private authService: JwtSessionManager,
    public dialogRef: MatDialogRef<SignInComponent>,private context:Context) { }
  user: string;
  password: string;
  ngOnInit() {
  }
  async signIn() {
    if (this.canceling)
      return;
    if (!this.user || this.user.length < 2 || !(await this.authService.setToken(await ServerSignIn.signIn(this.user, this.password)))) {
      this.dialog.error("פרטי ההתחברות שגויים.");
    }
    else
      this.dialogRef.close();
      
  }
  canceling = false;
  cancel() {
    this.canceling = true;
    this.dialogRef.close();
  }

}
