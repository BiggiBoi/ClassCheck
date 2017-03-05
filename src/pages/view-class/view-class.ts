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
  public studentList:Student[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public zone: NgZone,
              public Service: ClassCheckService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStudentPage');
    this.Service.initDB();
    this.getAllStudent();
  }

  edit(student:any) {
    let modal = this.modalCtrl.create(AddStudentPage,{student:student});
    modal.present();
  }

  deletes(student: any) {
    this.Service.deleteStudent(student)
      .catch(console.error.bind(console));
    this.navCtrl.setRoot(ViewClassPage);
  }

  getAllStudent() {
    this.studentList=[];
    console.log('list', this.studentList);
    this.Service.getAllStudent()
      //.then(data => {this.zone.run(() => {
      //  console.log('data',data);
      //  this.studentList = data;
      //})
    //}).catch(console.error.bind(console));
      .then(docs => {
        console.log('docs',docs);
        if (this.studentList.length !== docs.length) {
          this.studentList = docs;
          console.log('studentList', this.studentList);
        }
      //let doc = [];
      //doc = docs.rows;
      //doc.forEach(row => {
        //this.studentList.push(row.doc);
      //})
    });
  }

}
