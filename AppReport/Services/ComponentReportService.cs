using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;

namespace AppReport.Services
{
    public class ComponentReportService
    {
        PTSContext _context;

        public ComponentReportService(PTSContext context)
        {
            _context = context;
        }
      
    }
}
