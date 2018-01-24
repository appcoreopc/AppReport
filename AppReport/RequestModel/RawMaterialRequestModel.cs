using System;

namespace AppReport.RequestModel
{
    public class RawMaterialRequestModel
    {
        public int? Rmid { get; set; }
        public string Rmcode { get; set; }
        public int? RmcatId { get; set; }
        public string Rmdesc { get; set; }
        public int? Uomid { get; set; }
        public string TariffCode { get; set; }
        public string CountryList { get; set; }
        public decimal? DutyImpRate { get; set; }
        public decimal? Gstrate { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }

    }
}
