using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
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
        public IActionResult Delete(ReadyStockRequestModel requestData)
        {
            if (requestData.ReadyStockId.HasValue)
            {
                var result = new ReadyStockService(_ptsContext).Delete(requestData.ReadyStockId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}