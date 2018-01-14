using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class Uom
    {
        public int UomId { get; set; }
        public string UomCode { get; set; }
        public string UomName { get; set; }
        public int? UomTypeId { get; set; }
    }
}
