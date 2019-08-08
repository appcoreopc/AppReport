using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.AspNetCore.Cors;

namespace AppReport.Controllers
{
    [EnableCors("DevPolicy")]
    public class ReportingController : Controller
    {
        PTSContext _ptsContext;
        public ReportingController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }
        
        public IActionResult Index()
        {
            return View();
        }
    }
}