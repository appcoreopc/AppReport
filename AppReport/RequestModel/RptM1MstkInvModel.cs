using System;

namespace AppReport.RequestModel
{
    public class RptM1MstkInvModel
    {
        public int? MstkInvId { get; set; }
        public int? RptId { get; set; }
        public int? MstkId { get; set; }
        public string InvoiceNo { get; set; }
        public decimal? FImpWgt { get; set; }
        public decimal? FImpFreightCost { get; set; }
        public decimal? FLocWgt { get; set; }
        public decimal? FLocFreightCost { get; set; }
    }
}
