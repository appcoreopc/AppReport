using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]

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