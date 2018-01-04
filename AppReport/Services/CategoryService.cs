using AppReport.Services.PTSDataModel;

namespace AppReport.Services
{
    public class CategoryService
    {
        PTSContext _context;
        public CategoryService(PTSContext context)
        {
            _context = context;
        }
}
}
