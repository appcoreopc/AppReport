using AppReport.DataServices.PTSDataModel;

namespace AppReport.Services
{
    public class CategoryService  : AppDataObject
    {
        private PTSContext _context;
        public CategoryService(PTSContext context):base(context)
        {
            _context = context;
        }
            
    }
}
