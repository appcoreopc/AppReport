using System;

namespace AppReport.RequestModel
{
    public class EmployeeRequestModel
    {
        public int? EmpId { get; set; }

        public string EmpName { get; set; }

        public string EmpIdno { get; set; }

        public string EmpAd1 { get; set; }

        public string EmpAd2 { get; set; }

        public string EmpAd3 { get; set; }

        public int? CreatedByUserId { get; set; }

        public DateTime? CreatedDt { get; set; }

        public int? EditedByUserId { get; set; }

        public DateTime? EditedDt { get; set; }
    

    }
}

