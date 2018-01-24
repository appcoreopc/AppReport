using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    public class MaterialCategoryController : Controller
    {
        private PTSContext _ptsContext;

        public MaterialCategoryController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suppliers = new MaterialCategoryService(_ptsContext).GetAll();
            return new JsonResult(suppliers);
        }

        [HttpGet]
        public IActionResult Get(int start, int size)
        {
            var suppliers = new MaterialCategoryService(_ptsContext).GetAll(start, size);
            return new JsonResult(suppliers);
        }

        [HttpPost]
        public IActionResult Save([FromBody] MaterialCategoryRequestModel materialCategory)
        {
            if (materialCategory != null && !string.IsNullOrEmpty(materialCategory.RMCatName))
            {
                var result = new MaterialCategoryService(_ptsContext).Save(materialCategory);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(MaterialCategoryRequestModel requestData)
        {            
            if (requestData.RMCatId.HasValue)
            {
                var result = new MaterialCategoryService(_ptsContext).Delete(requestData.RMCatId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}