using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.Services;
using AppReport.RequestModel;
using AppReport.Util;

namespace AppReport.Controllers
{
       
    public class StmCustomController : Controller
    {
        private PTSContext _ptsContext;

        public StmCustomController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suppliers = new StmService(_ptsContext).GetAll();
            return new JsonResult(suppliers);
        }

        [HttpGet]
        public IActionResult Get(int start, int size)
        {
            var suppliers = new RawMaterialService(_ptsContext).GetAll(start, size);
            return new JsonResult(suppliers);
        }

        [HttpPost]
        public IActionResult Save([FromBody] StncustomRequestModel rawMaterial)
        {
            if (rawMaterial != null && !string.IsNullOrEmpty(rawMaterial.StncustomName))
            {
                var result = new StmService(_ptsContext).Save(rawMaterial);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(StncustomRequestModel requestData)
        {
            if (requestData != null 
                && requestData.StncustomId.HasValue)
            {
                var result = new StmService(_ptsContext).Delete(requestData.StncustomId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}