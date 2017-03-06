import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';
import { AddStudentPage } from '../../pages/add-student/add-student';
import { Student } from '../../providers/student';
/*
 Generated class for the AddStudent page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-view-class',
  templateUrl: 'view-class.html'
})
export class ViewClassPage {
  public student = {name: '', soname:''};
  public studentList:Student[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public zone: NgZone,
              public Service: ClassCheckService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewClassPage');
    this.Service.initDB();
    this.getAllStudent();
  }

  edit(student:any) {
    let modal = this.modalCtrl.create(AddStudentPage,{student:student});
    modal.present();
  }

  getAllStudent() {
    this.Service.getAllStudent()
      .then(data => {this.zone.run(() => {
        this.studentList = data;
          console.log (this.studentList);
      })
    }).catch(console.error.bind(console));
  }
}
