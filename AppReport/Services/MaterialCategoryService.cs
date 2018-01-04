using AppReport.DataServices.PTSDataModel;

namespace AppReport.Services
{
    public class MaterialCategoryService
    {
        private PTSContext _context;

        public MaterialCategoryService(PTSContext context)
        {
            _context = context;
        }
    }
}
