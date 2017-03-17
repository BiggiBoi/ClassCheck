import {Component} from '@angular/core';

import {NavController, LoadingController} from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public Date:any;
  private dates:any;
  private localeDate:any;
  private outClass:any[];
  private inClass:any[];
  private tempIn:any=[];
  private tempOut:any=[];
  private isCreate:boolean = true;
  private isSave:boolean = false;
  private isEdit:boolean = true;


  constructor(
    public navCtrl: NavController,
    private loadCtrl: LoadingController,
    private Service: ClassCheckService) {}

  ionViewDidLoad() {
    this.Date = new Date().toISOString();
    this.dates = this.splitDate();
    this.localeDate = new Date().toLocaleString("ru", {weekday: 'long',month: 'long', day: 'numeric'});
    this.Service.initDB();
    this.loadData();
  }

  selectItem(item:any) {
    if (this.isEdit) {
      this.tempIn.push(item);
      this.inClass = this.Service.pupilSort(this.tempIn);
      this.outClass.splice(this.Service.findIndex(this.outClass, item), 1);
      this.tempOut = this.outClass;
      this.Service.pupilSort(this.outClass);
    }
  }

  returnItem(item:any){
    if (this.isEdit) {
      this.tempOut.push(item);
      this.outClass = this.Service.pupilSort(this.tempOut);
      this.inClass.splice(this.Service.findIndex(this.inClass, item), 1);
      this.tempIn = this.inClass;
      this.Service.pupilSort(this.outClass);
    }
  }

  loadClassList(){
    this.Service.getClassList().then(data=>{
      this.outClass=data;
      this.isCreate = false;
    }).catch(console.error.bind(console))
  }

  loadData(){
    this.Service.attendanceToday(this.dates).then(data=>{
      this.outClass=data.outClass;
      this.tempOut=data.outClass;
      this.inClass =data.inClass;
      this.tempIn= data.inClass;

      if(this.dates == data._id){
        this.isCreate = false;
        this.isSave = true;
        this.isEdit = false;
      }
    }).catch(console.error.bind(console))
  }

  saveAttend(){
    this.Service.saveAttend(this.dates,this.localeDate,this.outClass, this.inClass);
    this.isEdit = false;
	this.isSave = true;
	
  }

  setEdit(){
    this.isEdit = true;
  }
  
  private splitDate(){
	let temp = this.Date.split('T');
	return temp[0];
  }
}
