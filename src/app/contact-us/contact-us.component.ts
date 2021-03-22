import { Component, OnInit } from '@angular/core';
import { Context } from '@remult/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor(public context:Context) { }

  ngOnInit() {
  }

}
