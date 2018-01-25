using System;

namespace AppReport.RequestModel
{
    public class MaterialCategoryRequestModel

    {

        public int? RMId { get; set; }

        public int? RMCatId { get; set; }

        public string RmCode { get; set; }

        public string RmDesc { get; set; }

        public int? CreatedByUserId { get; set; }

        public DateTime? CreatedDt { get; set; }

        public int? EditedByUserId { get; set; }

        public DateTime? EditedDt { get; set; }

    }
}

