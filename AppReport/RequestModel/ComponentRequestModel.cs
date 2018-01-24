using System;

namespace AppReport.RequestModel
{
    public class ComponentRequestModel
    {
        public int ComponentId { get; set; }
        public string ComponentName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}

