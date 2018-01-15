using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class Stncustom
    {
        public int StncustomId { get; set; }
        public string StncustomName { get; set; }
        public bool? IsLocal { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
