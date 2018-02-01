using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class RptLgYexp
    {
        public int TxnId { get; set; }
        public int? RptId { get; set; }
        public int? RptY { get; set; }
        public string StkDesc { get; set; }
        public string TariffCode { get; set; }
        public decimal? OpenBalQty { get; set; }
        public decimal? OpenBalCost { get; set; }
        public decimal? MadeQty { get; set; }
        public decimal? MadeCost { get; set; }
        public decimal? ExpQty { get; set; }
        public decimal? ExpCost { get; set; }
        public decimal? LocSalesQty { get; set; }
        public decimal? LocSalesCost { get; set; }
        public decimal? DamagedQty { get; set; }
        public decimal? DamagedCost { get; set; }
        public decimal? CloseBalQty { get; set; }
        public decimal? CloseBalCost { get; set; }
    }
}
