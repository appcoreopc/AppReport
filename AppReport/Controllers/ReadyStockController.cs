using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    [EnableCors("DevPolicy")]
    public class ReadyStockController : Controller
    {
        private PTSContext _ptsContext;

        public ReadyStockController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suppliers = new ReadyStockService(_ptsContext).GetAll();
            return new JsonResult(suppliers);
        }

        /*[HttpGet]
        public IActionResult Get(int start, int size)
        {
            var suppliers = new ReadyStockService(_ptsContext).GetAll(start, size);
            return new JsonResult(suppliers);
        }*/

        [HttpPost]
        public IActionResult Save([FromBody] ReadyStockRequestModel readyStock)
        {
            if (readyStock != null && !string.IsNullOrEmpty(readyStock.ReadyStockDesc))
            {              
                var result = new ReadyStockService(_ptsContext).Save(readyStock);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] DeleteRequestModel requestData)
        {
            if (requestData != null &&
                !string.IsNullOrEmpty(requestData.DeleteItems))
            {
                var result = new ReadyStockService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}