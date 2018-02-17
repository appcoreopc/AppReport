using AppReport.DataServices.PTSDataModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptM1
    {
        // Lazy loading 
        // public virtual ICollection<RptSkMimp> RptSkMimp { get; set; }

        public ICollection<RptM1Mstk> RptM1Mstk { get; set; }
        public ICollection<RptM1MstkInv> RptM1MstkInv { get; set; }
         
    }
}
