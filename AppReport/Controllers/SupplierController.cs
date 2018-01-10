using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;

namespace AppReport.Controllers
{
    
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
                var supplier = new Supplier()
                {
                    SupplierId = supplierRequest.SupplierId.HasValue ? supplierRequest.SupplierId.Value : 0,
                    SupplierName = supplierRequest.SupplierName,
                    CreatedByUserId = supplierRequest.CreatedByUserId, 
                    EditedByUserId = supplierRequest.EditedByUserId
                };

                var result = new UserService(_ptsContext).Save<Supplier>(supplier, supplier.SupplierId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(UserRequestModel requestData)
        {
            if (requestData.Id.HasValue)
            {
                var result = new UserService(_ptsContext).Delete(requestData.Id.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}