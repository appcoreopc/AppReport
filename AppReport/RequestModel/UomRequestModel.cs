using System;

namespace AppReport.RequestModel
{
    public class UomRequestModel
    {
        public int UomId { get; set; }
        public string UomCode { get; set; }
        public string UomName { get; set; }
        public int? UomTypeId { get; set; } 
    }
}

