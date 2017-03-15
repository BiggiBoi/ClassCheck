import {Component, NgZone} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';
import { Student } from '../../providers/student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public date = new Date().toISOString();
  //private monthArray:string[]=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
  //private dayArray:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  //private selectMonth:string=this.monthArray[this.month];
  //private selectDay:number=this.day;
  private dates:any;// = this.myDate.split('T');
  private outClass:any[];
  private inClass:any[];
  private tempIn=[];
  private tempOut=[];


  constructor(
    public navCtrl: NavController,
    private zone:NgZone,
    private Service: ClassCheckService) {}

  ionViewDidLoad() {
    this.Service.initDB();
    this.Service.getList().then(data=>{
      this.outClass=data;
      console.log('1',this.outClass);
    });
  }

  selectItem(item:any) {
    console.log('2',this.outClass);
    this.tempIn.push(item);
    this.inClass = this.Service.pupilSort(this.tempIn);
    this.outClass.splice(this.Service.findIndex(this.outClass,item),1);
     console.log('3',this.outClass);
    this.tempOut = this.outClass;
    this.Service.pupilSort(this.outClass);
  }

  returnItem(item:any){
    this.tempOut.push(item);
    this.outClass = this.Service.pupilSort(this.tempOut);
    this.inClass.splice(this.Service.findIndex(this.inClass, item),1);
    this.tempIn = this.inClass;
    this.Service.pupilSort(this.outClass);
  }

onChange(){
  console.log(this.date);

}


}
