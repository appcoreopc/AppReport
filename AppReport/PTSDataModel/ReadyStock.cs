using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class ReadyStock
    {
        public int ReadyStockId { get; set; }
        public string ReadyStockDesc { get; set; }
        public string TariffCode { get; set; }
        public decimal? DutyImpRate { get; set; }
        public decimal? Gstrate { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
