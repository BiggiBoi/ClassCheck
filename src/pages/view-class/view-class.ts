import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';
import { AddStudentPage } from '../../pages/add-student/add-student';
import { ClassList } from '../../providers/classlist';
@Component({
  selector: 'page-view-class',
  templateUrl: 'view-class.html'
})
export class ViewClassPage {
  private classList:ClassList;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public zone: NgZone,
              public Service: ClassCheckService) {
  }

  ionViewDidLoad() {
    this.getPupil();
  }

  edit(student:any) {
    let modal = this.modalCtrl.create(AddStudentPage,{pupil:student});
    modal.present();
  }

  getPupil(){
    this.Service.getPupil()
      .then(data=>{this.zone.run(() => {
        this.Service.pupilSort(data.pupil);
        this.classList=data;
      })
    }).catch(console.error.bind(console))
  }
}
