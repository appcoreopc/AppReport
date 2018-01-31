using AppReport.DataServices.PTSDataModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class RptSk
    {
        // Lazy loading 
        // public virtual ICollection<RptSkMimp> RptSkMimp { get; set; }

        public ICollection<RptSkMimp> RptSkMimp { get; set; }

    }
}
