using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;
using Microsoft.AspNetCore.Cors;

namespace AppReport.Controllers
{
    [EnableCors("DevPolicy")]
    public class SupplierController : Controller
    {
        private PTSContext _ptsContext;
        public SupplierController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suppliers = new SupplierService(_ptsContext).GetAll();
            return new JsonResult(suppliers);
        }

        [HttpGet]
        public IActionResult GetUser(int start, int size)
        {
            var suppliers = new SupplierService(_ptsContext).GetAll(start, size);
            return new JsonResult(suppliers);
        }

        [HttpPost]
        public IActionResult Save([FromBody] SupplierRequestModel supplierRequest)
        {
            if (supplierRequest != null && !string.IsNullOrEmpty(supplierRequest.SupplierName))
            {                
                var result = new SupplierService(_ptsContext).Save(supplierRequest);
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
                var result = new SupplierService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}