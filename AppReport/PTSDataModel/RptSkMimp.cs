using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class RptSkMimp
    {
        public int TxnId { get; set; }
        public int? RptId { get; set; }
        public DateTime? FImpDate { get; set; }
        public string FCustomNo { get; set; }
        public decimal? FImpWgt { get; set; }
        public decimal? FImpCost { get; set; }
        public decimal? FGstcost { get; set; }
        public string Note { get; set; }
    }
}
