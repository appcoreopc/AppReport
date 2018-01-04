﻿using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptM1
    {
        public int RptId { get; set; }
        public int? RptStatusId { get; set; }
        public DateTime? RptDate { get; set; }
        public int? RptMth { get; set; }
        public int? RptYr { get; set; }
        public string RefNo { get; set; }
        public DateTime? LetterDate { get; set; }
        public string LrcptDept { get; set; }
        public string LrcptBr { get; set; }
        public string LrcptAdd1 { get; set; }
        public string LrcptAdd2 { get; set; }
        public string LrcptAdd3 { get; set; }
        public string LrcptAdd4 { get; set; }
        public decimal? ExpQuota { get; set; }
        public decimal? LocalSalesQuota { get; set; }
        public DateTime? Gpbdate { get; set; }
        public decimal? PurchRm { get; set; }
        public decimal? PurchEq { get; set; }
        public decimal? SalesExpCont { get; set; }
        public decimal? SalesGpb { get; set; }
        public decimal? SalesFiz { get; set; }
        public decimal? SalesLocal { get; set; }
        public int? SignedByEmpId { get; set; }
        public string FSignedByPos { get; set; }
        public string FSignedByName { get; set; }
        public string FSignedByIdno { get; set; }
        public DateTime? SignedDate { get; set; }
        public decimal? RmdutyImp { get; set; }
        public decimal? Rmgst { get; set; }
        public decimal? RmdutyExcise { get; set; }
        public decimal? FRmtaxLost { get; set; }
        public decimal? EqDutyImp { get; set; }
        public decimal? EqGst { get; set; }
        public decimal? EqDutyExcise { get; set; }
        public decimal? FEqTaxLost { get; set; }
        public decimal? FSumDutyImp { get; set; }
        public decimal? FSumGst { get; set; }
        public decimal? FSumDutyExcise { get; set; }
        public decimal? FSumTaxLost { get; set; }
        public int? CreatedByEmpId { get; set; }
        public string FCreatedByPos { get; set; }
        public string FCreatedByName { get; set; }
        public string FCreatedByIdno { get; set; }
        public int? AppdByEmpId { get; set; }
        public string FAppdByPos { get; set; }
        public string FAppdByName { get; set; }
        public string FAppdByIdno { get; set; }
        public decimal? FOpenBal { get; set; }
        public decimal? FImpWgt { get; set; }
        public decimal? FImpFreightCost { get; set; }
        public decimal? FLocalWgt { get; set; }
        public decimal? FLocalFreightCost { get; set; }
        public decimal? FUsedCost { get; set; }
        public decimal? FWastedCost { get; set; }
        public decimal? FTotalRm { get; set; }
        public decimal? FCloseBal { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}