using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptLgYimp
    {
        public int TxnId { get; set; }
        public int? RptId { get; set; }
        public int? RptY { get; set; }
        public int? Rmid { get; set; }
        public string FRmcatName { get; set; }
        public string FRmdesc { get; set; }
        public string FUomcode { get; set; }
        public string FTariffCode { get; set; }
        public decimal? FOpenBalWgt { get; set; }
        public decimal? FOpenBalCost { get; set; }
        public decimal? FImpRmwgt { get; set; }
        public decimal? FImpRmcost { get; set; }
        public decimal? FLocRmwgt { get; set; }
        public decimal? FLocRmcost { get; set; }
        public decimal? UsedRmwgt { get; set; }
        public decimal? UsedRmcost { get; set; }
        public decimal? ReturnedWgt { get; set; }
        public decimal? FCloseBalWgt { get; set; }
        public decimal? FCloseBalCost { get; set; }
    }
}
