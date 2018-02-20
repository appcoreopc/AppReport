using AppReport.DataServices.PTSDataModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptLg
    {
        // Lazy loading 
        // public virtual ICollection<RptSkMimp> RptSkMimp { get; set; }

        public ICollection<RptLgYbgt> RptLgYbgt { get; set; }
        public ICollection<RptLgYexp> RptLgYexp { get; set; }
        public ICollection<RptLgYimp> RptLgYimp { get; set; } 
        public ICollection<RptLgYrdy> RptLgYrdy { get; set; }

    }
}
