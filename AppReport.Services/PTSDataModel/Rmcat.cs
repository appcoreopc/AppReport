using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class Rmcat
    {
        public int RmcatId { get; set; }
        public string RmcatName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
        public string TariffCode { get; set; }
        public bool? IsLocal { get; set; }
        public decimal? DutyImpRate { get; set; }
        public decimal? Gstrate { get; set; }
        public int? Uomid { get; set; }
    }
}
