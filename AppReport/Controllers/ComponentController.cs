using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;
using System;

namespace AppReport.Controllers
{
    public class ComponentController : Controller
    {
        private PTSContext _ptsContext;

        public ComponentController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var d = new ComponentService(_ptsContext).GetAll();
            return new JsonResult(d);
        }

        [HttpPost]
        public IActionResult Save([FromBody]  ComponentRequestModel reqData)
        {
            if (reqData != null && !string.IsNullOrEmpty(reqData.ComponentName))
            {
                var d = new Component()
                {
                    ComponentId = reqData.ComponentId
                };

                var result = new ComponentService(_ptsContext).Save<Component>(d, Convert.ToInt32(d.ComponentId));
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(ComponentRequestModel requestData)
        {
            if (requestData.ComponentId > 0)
            {
                var result = new ComponentService(_ptsContext).Delete(Convert.ToInt32(requestData.ComponentId));
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}