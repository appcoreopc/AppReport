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
            var d = new MaterialCategoryService(_ptsContext).GetAll();
            return new JsonResult(d);
        }

        [HttpGet]
        public IActionResult Get(int start, int size)
        {
            var d = new MaterialCategoryService(_ptsContext).GetAll(start, size);
            return new JsonResult(d);
        }

        [HttpPost]
        public IActionResult Save([FromBody] MaterialCategoryRequestModel materialCategory)
        {
            if (materialCategory != null && !string.IsNullOrEmpty(materialCategory.RmcatName))
            {
                var result = new MaterialCategoryService(_ptsContext).Save(materialCategory);
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
                var result = new MaterialCategoryService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            return new BadRequestResult();
        }
    }
}