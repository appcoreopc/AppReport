using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.RequestModel
{
    public class StncustomRequestModel
    {
        public int? StncustomId { get; set; }
        public string StncustomName { get; set; }
        public bool? IsLocal { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
