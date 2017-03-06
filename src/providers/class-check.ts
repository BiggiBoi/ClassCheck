import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import { Student } from '../providers/student';

@Injectable()
export class ClassCheckService {
	private _db;
	public _student: Student[];

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
	  if (!this._student) {
      return this._db.allDocs({include_docs: true})
        .then(doc => {
        	this._student = doc.rows.map(row => {
            return row.doc;
          });

          this._db.changes({live:true, since:'now', include_docs:true})
            .on('change', this.onDatabaseChange);

          this.studentSort();
          this.addIndex();
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
                this.addIndex();
			}
		} else {
			if (student && student._id === change.id) {
				this._student[index] = change.doc; // update
                this.studentSort();
                this.addIndex();
			} else {
				this._student.splice(index, 0, change.doc);// insert
                this.studentSort();
                this.addIndex();
			}
		}
	};

	private findIndex(array, id) {
		let low = 0, high = array.length, mid;
		while (low < high) {
			mid = (low + high) >>> 1;
			array[mid]._id < id ? low = mid + 1 : high = mid
		}
		return low;
	};

	private addIndex(){
		console.log (this._student);
		for (let i = 0; i < this._student.length; i++) {
			this._student[i]._index = i+1;
		}
	}

	private studentSort(){
        this._student.sort(function (a,b) {
            if (a.soname < b.soname){return -1}
            if (a.soname > b.soname){return 1}
            return 0;
        });
    }

}
