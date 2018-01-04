using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class EmpJobTitle
    {
        public int EmpJobTitleId { get; set; }
        public int? EmpId { get; set; }
        public int JobTitleId { get; set; }
    }
}
