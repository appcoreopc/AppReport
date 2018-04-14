using System;

namespace AppReport.RequestModel
{
    public class MaterialCategoryRequestModel 
    { 
        public int? RmcatId { get; set; }
        public string RmcatName { get; set; }
        public string TariffCode { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }

    }
}

