import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ViewClassPage} from '../pages/view-class/view-class';
import { AddStudentPage } from '../pages/add-student/add-student';
import { ClassCheckService } from '../providers/class-check';
import { HistoryPage } from '../pages/history/history';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewClassPage,
  	AddStudentPage,
	HistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewClassPage,
	AddStudentPage,
	HistoryPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ClassCheckService]
})
export class AppModule {}
