using System;

namespace AppReport.RequestModel
{
    public class SupplierRequestModel
    {
        public int? SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }

    }
}

