using AppReport.DataServices.PTSDataModel;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    public class MaterialCategoryController : Controller
    {
        private PTSContext _ptsContext;

        public MaterialCategoryController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }
        
        public IActionResult Index()
        {
            return View();
        }
    }
}