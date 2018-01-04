using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;

namespace AppReport.Controllers
{
    public class ComponentController : Controller
    {
        private PTSContext _ptsContext;

        public ComponentController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}