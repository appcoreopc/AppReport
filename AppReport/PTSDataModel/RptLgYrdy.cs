using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class RptLgYrdy
    {
        public int TxnId { get; set; }
        public int? RptId { get; set; }
        public string StkDesc { get; set; }
        public string TariffCode { get; set; }
        public int? Qty { get; set; }
        public decimal? Cost { get; set; }
        public decimal? DutyImpRate { get; set; }
        public decimal? DutyImpCost { get; set; }
        public decimal? Gstrate { get; set; }
        public decimal? Gstcost { get; set; }
        public decimal? TaxCost { get; set; }
    }
}
