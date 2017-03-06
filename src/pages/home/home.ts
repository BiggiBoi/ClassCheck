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
  private studentList:Student[];
  private inClass:Student[]=[];

  constructor(public navCtrl: NavController, public Service: ClassCheckService) {}

  ionViewDidLoad() {
    this.Service.initDB();
    this.getAllStudent();
  }

  selectItem(item:any) {
    this.inClass.push(item);
    this.studentList.splice(this.findIndex(this.studentList,item),1);
  }

  returnItem(item:any){
    this.studentList.push(item);
    this.inClass.splice(this.findIndex(this.inClass, item),1);
  }

  getAllStudent() {
    this.Service.getAllStudent()
      .then(data => {this.zone.run(() => {
        this.studentList = data;
      })
      }).catch(console.error.bind(console));
  }

  private findIndex(array:any,item:any){
    let index = array.findIndex(e => {
      return e._id == item._id;
    });
    return index;
  }

}
