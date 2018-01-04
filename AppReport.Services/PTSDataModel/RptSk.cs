using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptSk
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
        public int? SignedByEmpId { get; set; }
        public string FSignedByPos { get; set; }
        public string FSignedByName { get; set; }
        public string FSignedByIdno { get; set; }
        public DateTime? SignedDate { get; set; }
        public decimal? FImpCost { get; set; }
        public decimal? FGstcost { get; set; }
        public string SignedByNameImp { get; set; }
        public string SignedByIdnoImp { get; set; }
        public string SignedByPosImp { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
