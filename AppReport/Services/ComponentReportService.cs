using AppReport.Services.PTSDataModel;

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
