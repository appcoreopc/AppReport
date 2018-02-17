using System;

namespace AppReport.RequestModel
{ 
    public class RptM1MstkModel
    {
        public int? MstkId { get; set; }
        public int? RptId { get; set; }
        public int? Rmid { get; set; }
        public string FRmcatName { get; set; }
        public string FRmdesc { get; set; }
        public string FUomcode { get; set; }
        public string FTariffCode { get; set; }
        public decimal? FOpenBal { get; set; }
        public decimal? UsedCost { get; set; }
        public decimal? WastedCost { get; set; }
        public decimal? FTotalRm { get; set; }
        public decimal? FCloseBal { get; set; }
    }
}


