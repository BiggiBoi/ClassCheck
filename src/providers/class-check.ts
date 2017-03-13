import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { Student } from '../providers/student';
import { Pupil } from '../providers/pupil';

@Injectable()
export class ClassCheckService {
	private _db;
	public _student:Student[];
	public _List:Student[];
  public classList:Pupil= new Pupil();

	initDB(){
		this._db = new PouchDB ('studentList', {adapter: 'websql', auto_compaction: true})
	}

	addStudent(student) {
		this._db.post(student)
	}

	updateStudent (student) {
		return this._db.put (student)
	}

	deleteStudent (student) {
		return this._db.remove(student)
	}

  addPupil(pupil:any){
    if (this.classList._id === undefined){
      this.classList._id='classlist'
    };
    pupil.id = (this.classList.pupil.length)+1;
    this.classList.pupil.push(pupil);
    this.pupilSort(this.classList.pupil);
    this._db.put(this.classList);
  }

  updatePupil(pupil:any){
    let index = this.findIndex(this.classList.pupil, pupil);
    this.classList.pupil[index]=pupil;
    this.pupilSort(this.classList.pupil);
    this._db.put(this.classList);
  }

  deletePupil(pupil:any){
    let index = this.findIndex(this.classList.pupil, pupil);
    this.classList.pupil.splice(index,1);
    this.pupilSort(this.classList.pupil);
    this._db.put(this.classList);
  }

  getPupil(){
   return this._db.allDocs({include_docs:true, key: 'classlist'})
     .then(data=>{
       data.rows.forEach(docs=>{
         this.classList=docs.doc;
       });
       this._db.changes({live:true, since:'now', doc_ids:['classlist']})
         .on('change', (change)=>{
           this.classList._rev= change.changes[0].rev;
         });
       return this.classList;
     })
  }

	getAllStudent(){
	  if (!this._student) {
      return this._db.allDocs({include_docs: true})
        .then(doc => {
        	this._student = doc.rows.map(row => {
            return row.doc;
          });

          this._db.changes({live:true, since:'now', include_docs:true})
            .on('change', this.onDatabaseChange);

          //this.studentSort(this._student);
          return this._student;
        });
    } else {
	    return Promise.resolve(this._student);
    }
	}

	private onDatabaseChange = (change) => {
		let index = this.findIndex(this._student, change.id);
		let student = this._student[index];

		if (change.deleted) {
			if (student) {
				this._student.splice(index, 1); // delete
			}
		} else {
			if (student && student._id === change.id) {
				this._student[index] = change.doc; // update
        //this.studentSort(this._student);
			} else {
				this._student.splice(index, 0, change.doc);// insert
        //this.studentSort(this._student);
			}
		}
	};

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

}
