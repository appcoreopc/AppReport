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

        [HttpPost]
        public IActionResult Save([FromBody] MaterialCategoryRequestModel materialCategory)
        {
            if (materialCategory != null && !string.IsNullOrEmpty(materialCategory.RMCatName))
            {
                var supplier = new Rmcat()
                {
                    RmcatId = materialCategory.RMCatId.HasValue ? materialCategory.RMCatId.Value : 0,
                    RmcatName = materialCategory.RMCatName,
                    CreatedByUserId = materialCategory.CreatedByUserId,
                    EditedByUserId = materialCategory.EditedByUserId
                };

                var result = new UOMService(_ptsContext).Save<Rmcat>(supplier, supplier.RmcatId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(MaterialCategoryRequestModel requestData)
        {   
            if (requestData.RMCatId.HasValue)
            {
                var result = new UOMService(_ptsContext).Delete(requestData.RMCatId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}