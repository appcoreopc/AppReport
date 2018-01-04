using Microsoft.AspNetCore.Mvc;
using AppReport.Services.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {

        private PTSContext _ptsContext;

        public EmployeeController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        public IActionResult Index()
        {
            return View();
        }



    }
}