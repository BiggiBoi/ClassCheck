import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';

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
  private pupil:any = {};
  private isNew:boolean = true;
  private action:string = 'Добавить';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public Service: ClassCheckService ) {}

  ionViewDidLoad() {
     let editStudent = this.navParams.get('pupil');

     if (editStudent){
       this.action = 'Изменить';
       this.isNew = false;
       this.pupil = editStudent;
     }
  }

  save() {
    if (this.isNew) {
      this.Service.addPupil(this.pupil);
    } else {
      this.Service.updatePupil(this.pupil);
    }
    this.dismiss();
  }

  deletes() {
    if (!this.isNew) {
      this.Service.deletePupil(this.pupil)
    }
    this.dismiss();
  }
  dismiss():void{
    this.viewCtrl.dismiss(this.pupil);
  }

}
