using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AppReport.Controllers
{
    public class UOMController : Controller
    {
        private PTSContext _ptsContext;

        public UOMController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var itemList = new UOMService(_ptsContext).GetAll();
            return new JsonResult(itemList);
        }

        [HttpGet]
        public IActionResult Get(int start, int size)
        {
            var suppliers = new UOMService(_ptsContext).GetAll(start, size);
            return new JsonResult(suppliers);
        }    
      
    }
}