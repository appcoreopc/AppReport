using System;

namespace AppReport.RequestModel
{
    public class ConfigRequestModel
    {
        public int ConfigId { get; set; }
        public string ConfigKey { get; set; }
        public string ConfigData { get; set; }
        public int? ModuleId { get; set; }
        public int? Id { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }

    }
}

