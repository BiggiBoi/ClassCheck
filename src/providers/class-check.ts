import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { ClassList } from '../providers/classlist';
import { Attendance } from '../providers/attendance';
import {ToastController} from "ionic-angular";

@Injectable()
export class ClassCheckService {
	private _db;
  private class:ClassList// = new ClassList();
  private classList:ClassList// = new ClassList();
  public attendance:Attendance// = new Attendance();

	initDB(){
		this._db = new PouchDB ('studentList', {adapter: 'websql', auto_compaction: true})
	}

	constructor(private toastCtrl: ToastController) {}

	toast(){
	 let toast = this.toastCtrl.create({
	   message: 'сохранено',
     duration: 3000,
     position: 'bottom'
   });
    toast.present();
  }

  addPupil(pupil:any){
    if (this.class._id === undefined){
      this.class._id='classlist'
    }
    pupil.id = (this.class.pupil.length)+1;
    this.class.pupil.push(pupil);
    this.pupilSort(this.class.pupil);
    this._db.put(this.class);
  }

  updatePupil(pupil:any){
    let index = this.findIndex(this.class.pupil, pupil);
    this.class.pupil[index]=pupil;
    this.pupilSort(this.class.pupil);
    this._db.put(this.class);
  }

  deletePupil(pupil:any){
    let index = this.findIndex(this.class.pupil, pupil);
    this.class.pupil.splice(index,1);
    this.pupilSort(this.class.pupil);
    this._db.put(this.class);
  }

  getPupil(){
   return this._db.allDocs({include_docs:true, key: 'classlist'})
     .then(data=>{
       data.rows.forEach(docs=>{
         this.class=docs.doc;
       });
       this._db.changes({live:true, since:'now', doc_ids:['classlist']})
         .on('change', (change)=>{
           this.class._rev= change.changes[0].rev;
         });
       return this.class;
     })
  }

  findIndex(array:any,item:any){
    let index = array.findIndex(e => {
      return e.id == item.id;
    });
    return index;
  }

  pupilSort(array:any){
       let ar =  array.sort(function (a,b) {
            if (a.lastName < b.lastName){return -1}
            if (a.lastName > b.lastName){return 1}
            return 0;
        });
       return ar;
    }
    
  getClassList(){
    return this._db.allDocs({include_docs:true,key: 'classlist'})
      .then(data=>{
        data.rows.forEach(docs=>{
          this.classList = docs.doc.pupil
        });
        return this.classList
      })
  }

	attendanceToday(key:string){
    return this._db.allDocs({include_docs:true,key: key})
      .then(data=>{
		if (data.rows.length > 0) {
        data.rows.forEach(docs=>{
          this.attendance = docs.doc
        });
		} else {
			this.attendance = null
		}
		this._db.changes({live:true, since:'now', doc_ids:[key]})
         .on('change', (change)=>{
           this.attendance._rev= change.changes[0].rev;
         });
        return this.attendance
      })
  }

	saveAttend(_id:string, date:string, outClass:any[], inClass:any[]){
		let attend:any = {};
		attend._id = _id;
		attend.date = date;
		console.log('rev', this.attendance);
		if(this.attendance !== undefined){
		  attend._rev = this.attendance._rev
		}
		attend.outClass = outClass;
		attend.inClass = inClass;
		this._db.put(attend);
    this.toast();
	}

}
