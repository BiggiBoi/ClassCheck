import {Component} from '@angular/core';

import {NavController, LoadingController} from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public date:any;
  private dates:any;
  private outClass:any[];
  private inClass:any[];
  private tempIn=[];
  private tempOut=[];
  private isCreate:boolean = true;
  private isEdit:boolean = true;
  private UnlockBotton:boolean;


  constructor(
    public navCtrl: NavController,
    private loadCtrl: LoadingController,
    private Service: ClassCheckService) {}

  ionViewDidLoad() {
    this.date = new Date().toISOString();
    this.dates = this.date.split('T');
    this.Service.initDB();
    this.visitToday();
  }

  selectItem(item:any) {
    this.tempIn.push(item);
    this.inClass = this.Service.pupilSort(this.tempIn);
    this.outClass.splice(this.Service.findIndex(this.outClass,item),1);
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

  loadData(){
    this.Service.getClassList().then(data=>{
      this.outClass=data;
      this.isEdit = true;
    }).catch(console.error.bind(console))
  }

  visitToday(){
    let today = this.dates[0];
    this.Service.attendanceToday(today).then(data=>{
      this.outClass=data.outClass;
      this.tempOut=data.outClass;
      this.inClass =data.inClass;
      this.tempIn= data.inClass;

      if(this.dates[0] == data._id){
        this.isCreate = false;
        this.isEdit = false;
      }
    }).catch(console.error.bind(console))
  }

  saveAttend(){
    this.Service.saveAttend(this.dates[0],this.outClass, this.inClass);
  }

  setEdit(){
    this.isEdit = true;
  }
}
