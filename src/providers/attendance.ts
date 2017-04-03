export interface Attendance {
	_id:string;
	_rev:string;
	outClass: Array <{id: number, lastName:string, firstName:string}>;
	inClass:  Array <{id: number, lastName:string, firstName:string}>;
}
