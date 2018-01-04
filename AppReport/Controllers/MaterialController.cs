using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.Services.PTSDataModel;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class MaterialController : Controller
    {
        PTSContext _ptsContext;

        public MaterialController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }


        public IActionResult Index()
        {
            return View();
        }
    }
}