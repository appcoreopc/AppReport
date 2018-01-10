using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    public class RawMaterialController : Controller
    {
        private PTSContext _ptsContext;

        public RawMaterialController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suppliers = new RawMaterialService(_ptsContext).GetAll();
            return new JsonResult(suppliers);
        }

        [HttpGet]
        public IActionResult GetUser(int start, int size)
        {
            var suppliers = new RawMaterialService(_ptsContext).GetAll(start, size);
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

                var result = new RawMaterialService(_ptsContext).Save<Rmcat>(supplier, supplier.RmcatId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(MaterialCategoryRequestModel requestData)
        {
            if (requestData.RMCatId.HasValue)
            {
                var result = new RawMaterialService(_ptsContext).Delete(requestData.RMCatId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}