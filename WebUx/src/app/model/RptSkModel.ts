import { RptSkMimpModel } from "./RptSkMimpModel";

export class RptSkModel { 

 rptId : number;
 rptStatusId : number;
 fCoName : string; 
 fCoRegNo : string;
 fCoAdd1 : string;
 fCoAdd2 : string;
 fCoAdd3 : string;
 fCoAdd4 : string;
 fCoTel : string;
 fCoFax : string;
 fCoEmail : string;
 fCoWebsite : string;
 fCoLogo : string;
 fCoSplno : string;
 fCoGstno : string;
 rptDate : Date;
 refNo : string;
 letterDate : Date;
 lrcptDept : string;
 lrcptBr : string;
 lrcptAdd1 : string;
 lrcptAdd2 : string;
 lrcptAdd3 : string;
 lrcptAdd4 : string;
 signedByEmpId : number;
 signedByPos : string;
 signedByName : string;
 signedByIdno : string;
 signedDate : Date;
 fImpCost : number;
 fGstcost : number;
 signedByNameImp : string;
 signedByIdnoImp : string;
 signedByPosImp : string; 
 rptSkMimp : RptSkMimpModel[];
}