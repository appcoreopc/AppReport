using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class SupplierController : Controller
    {
        private PTSContext _ptsContext;
        public SupplierController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}