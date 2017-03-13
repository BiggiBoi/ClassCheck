import {Component, NgZone} from '@angular/core';

import { NavController } from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';
import { Student } from '../../providers/student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public myDate:any = new Date().toISOString();
  private outClass:Student[];
  private inClass:Student[];
  private tempIn=[];
  private tempOut=[];

  constructor(
    public navCtrl: NavController,
    private zone:NgZone,
    private Service: ClassCheckService) {}

  ionViewDidLoad() {
    this.Service.initDB();

  }

  selectItem(item:any) {
    /*this.tempIn.push(item);
    this.inClass = this.Service.studentSort(this.tempIn);
    this.outClass.splice(this.Service.findIndex(this.outClass,item),1);
    this.tempOut = this.outClass;
    this.Service.studentSort(this.outClass);*/
  }

  returnItem(item:any){/*
    this.tempOut.push(item);
    this.outClass = this.Service.studentSort(this.tempOut);
    this.inClass.splice(this.Service.findIndex(this.inClass, item),1);
    this.tempIn = this.inClass;
    this.Service.studentSort(this.outClass);*/
  }


}
