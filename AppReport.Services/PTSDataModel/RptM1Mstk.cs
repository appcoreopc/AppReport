using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptM1Mstk
    {
        public int TxnId { get; set; }
        public int? RptId { get; set; }
        public int? Rmid { get; set; }
        public string FRmcatName { get; set; }
        public string FRmdesc { get; set; }
        public string FUomcode { get; set; }
        public string FTariffCode { get; set; }
        public decimal? FOpenBal { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? FImpWgt { get; set; }
        public decimal? FImpFreightCost { get; set; }
        public decimal? FLocWgt { get; set; }
        public decimal? FLocFreightCost { get; set; }
        public decimal? UsedCost { get; set; }
        public decimal? WastedCost { get; set; }
        public decimal? FTotalRm { get; set; }
        public decimal? FCloseBal { get; set; }
    }
}
