import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ViewClassPage } from '../pages/view-class/view-class';
import { HistoryPage } from '../pages/history/history';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
@ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  pages: Array <{title: string, component: any}>;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });

	this.pages = [
	{title:'Посещаемость', component:HomePage},
	{title:'История', component:HistoryPage},
	{title:'Список класса', component:ViewClassPage}
	];

  }

  openPage(page){
	this.nav.setRoot(page.component);
  }

}
