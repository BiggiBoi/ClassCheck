import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public Service: ClassCheckService,
    public formBuilder: FormBuilder ) {
    this.form = formBuilder.group({
     "lastName":["",[Validators.required,Validators.pattern("[а-яЁёА-Я]*")]],
    "firstName":["",[Validators.required,Validators.pattern("[а-яЁёА-Я]*")]],
    "id":[""]
    })
  }

  ionViewDidLoad() {
     let editStudent = this.navParams.get('pupil');

     if (editStudent){
       this.action = 'Изменить';
       this.isNew = false;
       this.form.controls['lastName'].setValue(editStudent.lastName);
       this.form.controls['firstName'].setValue(editStudent.firstName);
       this.form.controls['id'].setValue(editStudent.id);
     }
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
  onSubmit(){
    if (this.form.valid){
      if (this.isNew) {
      this.Service.addPupil(this.form.value);
    } else {
      this.Service.updatePupil(this.form.value);
    }
    this.dismiss();
  }
  }

}
