import { RptLgYexpModel } from "./RptLgYexpModel";
import { RptLgYimpModel } from "./RptLgYimpModel";
import { RptLgYbgtModel } from "./RptLgYbgtModel";
import { RptLgYrdyModel } from "./RptLgYrdyModel";

export class RptLgModel { 

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
  rptY1 : number;
  rptY2 : number;
  rptSdateY1 : string;
  rptEdateY1 : string;
  rptSdateY2 : string;
  rptEdateY2 : string;
  rptSdateY3 : string;
  rptEdateY3 : string;
  refNo : string;
  ldate : string;
  lrcptDept : string;
  lrcptBr : string;
  lrcptAdd1 : string;
  lrcptAdd2 : string;
  lrcptAdd3 : string;
  lrcptAdd4 : string;
  pbbcekNo : string;
  licenseFee : number;
  signedByEmpId : number;
  signedByPos : string;
  signedByName : string;
  signedDate : string;
  appByEmpId : number;
  appByPos : string;
  appByName : string;
  appByIdno : string;
  appCoName : string;
  appAdd1 : string;
  appAdd2 : string;
  appAdd3 : string;
  appAdd4 : string;
  appDate : string;
  brcptDept : string;
  brcptBr : string;
  brcptAdd1 : string;
  brcptAdd2 : string;
  brcptAdd3 : string;
  brcptAdd4 : string;
  rptCoName : string;
  rptSignedByEmpId : number;
  rptSignedByPos : string;
  rptSignedByIdno : string;
  rptSignedByName : string;
  mfdGoodY1 : string;
  mfdGoodY2 : string;
  mfdGoodY3 : string;
  mfdLicenseSdate : string;
  mfdLicenseEdate : string;
  isChgCoName : boolean;
  isChgCoMember : boolean;
  isChgAddress : boolean;
  isChgFtyStr : boolean;
  isChgEq : boolean;
  rmcost : number;
  bgtRmcost : number;
  rdyGoodCost : number;
  bgtRdyGoodCost : number;
  mktExpCost : number;
  mktExpRate : number;
  bgtMktExpCost : number;
  bgtMktExpRate : number;
  localSalesCost : number;
  localSalesRate : number;
  bgtLocSalesCost : number;
  bgtLocSalesRate : number;
  ipcRdc : string;
  valueAdded : string;
  repairSvc : string;
  sparePart : string;
  fImpOpenBalWgtY1 : number;
  fImpOpenBalCostY1 : number;
  fImpImpRmwgtY1 : number;
  fImpImpRmcostY1 : number;
  fImpLocRmwgtY1 : number;
  fImpLocRmcostY1 : number;
  fImpUsedRmwgtY1 : number;
  fImpUsedRmcostY1 : number;
  fImpReturnedWgtY1 : number;
  fImpCloseBalWgtY1 : number;
  fImpCloseBalCostY1 : number;
  fImpOpenBalWgtY2 : number;
  fImpOpenBalCostY2 : number;
  fImpRmwgtY2 : number;
  fImpRmcostY2 : number;
  fImpLocRmwgtY2 : number;
  fImpLocRmcostY2 : number;
  fImpUsedRmwgtY2 : number;
  fImpUsedRmcostY2 : number;
  fImpReturnedWgtY2 : number;
  fImpCloseBalWgtY2 : number;
  fImpCloseBalCostY2 : number;
  fExpOpenBalQtyY1 : number;
  fExpOpenBalCostY1 : number;
  fExpMadeQtyY1 : number;
  fExpMadeCostY1 : number;
  fExpQtyY1 : number;
  fExpCostY1 : number;
  fExpLocSalesQtyY1 : number;
  fExpLocSalesCostY1 : number;
  fExpDamagedQtyY1 : number;
  fExpDamagedCostY1 : number;
  fExpCloseQtyY1 : number;
  fExpCloseCostY1 : number;
  fExpOpenBalQtyY2 : number;
  fExpOpenBalCostY2 : number;
  fExpMadeQtyY2 : number;
  fExpMadeCostY2 : number;
  fExpQtyY2 : number;
  fExpCostY2 : number;
  fExpLocSalesQtyY2 : number;
  fExpLocSalesCostY2 : number;
  fExpDamagedQtyY2 : number;
  fExpDamagedCostY2 : number;
  fExpCloseQtyY2 : number;
  fExpCloseCostY2 : number;
  fRdyCost : number;
  fRdyDutyImpCost : number;
  fRdyGstcost : number;
  fRdyTaxCost : number;
  fBgtQtyLoc : number;
  fBgtCostLoc : number;
  fBgtDutyImpCostLoc : number;
  fBgtGstcostLoc : number;
  fBgtTaxCostLoc : number;
  fBgtQtyImp : number;
  fBgtCostImp : number;
  fBgtDutyImpCostImp : number;
  fBgtGstcostImp : number;
  fBgtTaxCostImp : number;   

  rptLgYimp : RptLgYimpModel[];
  rptLgYimpY1 : RptLgYimpModel[];
  rptLgYimpY2 : RptLgYimpModel[];
  rptLgYexp : RptLgYexpModel[];
  rptLgYexpY1 : RptLgYexpModel[];
  rptLgYexpY2 : RptLgYexpModel[];
  rptLgYbgt : RptLgYbgtModel[];
  rptLgYbgtL : RptLgYbgtModel[];
  rptLgYbgtE : RptLgYbgtModel[];
  //rptLgYimp : RptLgYimpModel[];
  rptLgYrdy : RptLgYrdyModel[];
}