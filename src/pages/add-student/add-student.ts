import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';
import { ViewClassPage } from '../../pages/view-class/view-class';

/*
 Generated class for the ViewClass page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html'
})
export class AddStudentPage {
  public student:any = {};
  public isNew:boolean = true;
  public action:string = 'Добавить';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public Service: ClassCheckService ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewClassPage');
     let editStudent = this.navParams.get('student');

     if (editStudent){
       this.action = 'Изменить';
       this.isNew = false;
       this.student = editStudent;
       console.log(this.student);
     }
  }

  save() {
    if (this.isNew) {
      this.Service.addStudent(this.student);
    } else {
      this.Service.updateStudent(this.student);
    }
    this.dismiss();
  }

  //if (this.student.name !== '') {
  //this.Service.updateStudent(this.student)
  // .catch(console.error.bind(console));
  //}

  dismiss() {
    this.navCtrl.setRoot(ViewClassPage);
    this.viewCtrl.dismiss(this.student);

  }

}
