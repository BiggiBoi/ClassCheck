import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClassCheckService } from '../../providers/class-check';
@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
	private Date:any;
	private maxDate:any;
	private dates:any;
	private dat: any;
	private outClass:any;
	private isNull:boolean=true;
	private message:string;


  constructor(
	public navCtrl: NavController,
	private Service:ClassCheckService
	) {}

  ionViewDidLoad() {
    this.Date= new Date().toISOString();
    this.maxDate = this.splitDate();
    this.selectDate()
  }

  selectDate(){
	  this.dates = this.splitDate();
    this.Service.attendanceToday(this.dates).then(data=>{
		if(data !== null) {
			if (data.outClass.length > 0) {
				this.dat = data.date;
			  this.outClass = data.outClass;
			  this.isNull = false;
			} else {
				this.message= 'В этот день все учaщиеся были на уроках';
			}
		} else {
			this.outClass = [];
			this.isNull = true;
			this.message = 'В этот день пропуски не отмечались'
		}
    }).catch(console.error.bind(console))
  }

  private splitDate(){
	let temp = this.Date.split('T');
	return temp[0];
  }

}
