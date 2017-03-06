import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myDate:any = new Date().toISOString();

  constructor(public navCtrl: NavController) {
    
  }
}
