import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ViewClassPage} from '../pages/view-class/view-class';
import { AddStudentPage } from '../pages/add-student/add-student';
import { ClassCheckService } from '../providers/class-check';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ViewClassPage,
  	AddStudentPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ViewClassPage,
	  AddStudentPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ClassCheckService]
})
export class AppModule {}
