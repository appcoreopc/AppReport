using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class JobTitle
    {
        public int JobTitleId { get; set; }
        public string JobTitleName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
