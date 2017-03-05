import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { Student } from '../providers/student';

@Injectable()
export class ClassCheckService {
	private _db;
	public _student: Student[] = [];

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

	getAllStudent(){
	  //if (this._student) {
	    console.log('true', this._student);
      return this._db.allDocs({include_docs: true})
        .then(doc => {
          doc.rows.forEach(row => {
            this._student.push(row.doc);
          });

          this._db.changes({live:true, since:'now', include_docs:true})
            .on('change',function (change) {
              if (change.deleted) {
                console.log('delete');
              } else {
              console.log('change:', change);
            }});
          return this._student;
        });
    //} else {
    //  console.log('false',this._student);
	  //  return Promise.resolve(this._student);
    //}
	}

  private onDatabaseChange = (change) => {
	  console.log(change)
  }
}
