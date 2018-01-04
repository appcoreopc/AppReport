using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.Services.PTSDataModel;
using AppReport.Config;
using Microsoft.Extensions.Options;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]

    public class JobController : Controller
    {
        private PTSContext _ptsContext;

        public JobController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
       
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}