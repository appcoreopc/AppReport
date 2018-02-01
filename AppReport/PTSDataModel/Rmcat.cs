using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class Rmcat
    {
        public int RmcatId { get; set; }
        public string RmcatName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
