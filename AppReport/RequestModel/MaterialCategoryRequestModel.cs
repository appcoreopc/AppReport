using System;

namespace AppReport.RequestModel
{
    public class MaterialCategoryRequestModel
    {
        public int? RMCatId { get; set; }
        public string RMCatName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }

    }
}

