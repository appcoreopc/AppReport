using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class Supplier
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
