using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;

namespace AppReport.Controllers
{    
    public class ConfigController : Controller
    {
        private PTSContext _ptsContext;
        public ConfigController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var cfg = new ConfigService(_ptsContext).GetAll();
            return new JsonResult(cfg);
        }
         

        [HttpPost]
        public IActionResult Save([FromBody] ConfigRequestModel configRequest)
        {
            if (configRequest != null && !string.IsNullOrEmpty(configRequest.ConfigKey))
            {                
                var result = new ConfigService(_ptsContext).Save(configRequest);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(ConfigRequestModel requestData)
        {
            if (requestData.ConfigId > 0)
            {
                var result = new ConfigService(_ptsContext).Delete(requestData.ConfigId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}