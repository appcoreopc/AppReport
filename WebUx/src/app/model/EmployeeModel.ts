export class EmployeeModel { 
    empId? : number;
    empName : string;
    empIdno : number;
    empAd1 : string;
    empAd2 : string;
    empAd3 : string;
    jobTitleId : number;
    createdByUserId : number;
    createdDt : Date; 
    editedByUserId : number;
    editedDt : Date;
    jobTitle? : string;

    constructor(init? : Partial<EmployeeModel>) {
     Object.assign(this, init);
    }
}