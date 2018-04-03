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
    public class StncustomController : Controller
    {
        private PTSContext _ptsContext;
        public StncustomController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var d = new StncustomService(_ptsContext).GetAll();
            return new JsonResult(d);
        }

        [HttpPost]
        public IActionResult Save([FromBody]  StncustomRequestModel reqData)
        {
            if (reqData != null && !string.IsNullOrEmpty(reqData.StncustomName))
            {              
                var result = new  StncustomService(_ptsContext).Save(reqData);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete( StncustomRequestModel requestData)
        {
            if (requestData != null 
                && requestData.StncustomId > 0)
            {
                var result = new  StncustomService(_ptsContext).Delete(Convert.ToInt32(requestData.StncustomId));
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}