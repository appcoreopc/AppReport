import { RptM1MstkModel } from "./RptM1MstkModel";
import { RptM1MstkInvModel } from "./RptM1MstkInvModel";

export class RptM1Model { 

  rptId : number;
  rptStatusId : number;
  rptDate : string;
  refNo : string;
  letterDate : string;
 /* fCoName : string;
  fCoRegNo : string;
  fCoAdd1 : string;
  fCoAdd2 : string;
  fCoAdd3 : string;
  fCoAdd4 : string;
  fCoTel : string;
  fCoFax : string;
  fCoEmail : string;
  fCoWebsite : string;
  fCoLogo : string;*/
  lrcptDept : string;
  lrcptBr : string;
  lrcptAdd1 : string;
  lrcptAdd2 : string;
  lrcptAdd3 : string;
  lrcptAdd4 : string;
  expQuota : number;
 localSalesQuota : number;
 gpbdate : string;
 //purchRm : number;
 purchEq : number;
 salesExpCont : number;
 salesGpb : number;
 salesFiz : number;
 salesLocal : number;
 signedByEmpId : number;
 signedByPos : string;
 signedByName : string;
 signedByIdno : string;
 signedDate : string;
 licenseNo : string;
  //rmdutyImp : number;
  //rmgst : number;
 rmdutyExcise : number;
  //fRmtaxLost : number;
 eqDutyImp : number;
 eqGst : number;
 eqDutyExcise : number;
 fEqTaxLost : number;
  //fSumDutyImp : number;
  //fSumGst : number;
 fSumDutyExcise : number;
  //fSumTaxLost : number;
 createdByEmpId : number;
 createdByPos : string;
 createdByName : string;
 createdByIdno : string;
 appdByEmpId : number;
 appdByPos : string;
 appdByName : string;
 appdByIdno : string;
 /*fOpenBal : number;
 fImpWgt : number;
 fImpFreightCost : number;
 fLocalWgt : number;
 fLocalFreightCost : number;
 fUsedCost : number;
 fWastedCost : number;
 fTotalRm : number;
 fCloseBal : number; */

 rptM1Mstk : RptM1MstkModel[];
 rptM1MstkInv : RptM1MstkInvModel[];
}