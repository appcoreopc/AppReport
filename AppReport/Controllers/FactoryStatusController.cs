using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;
using System;
using Microsoft.AspNetCore.Cors;

namespace AppReport.Controllers
{
    [EnableCors("DevPolicy")]
    public class FactoryStatusController : Controller
    {
        private PTSContext _ptsContext;

        public FactoryStatusController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var d = new FactoryStatusService(_ptsContext).GetAll();
            return new JsonResult(d);
        }

        [HttpPost]
        public IActionResult Save([FromBody]  FactoryStatusRequestModel reqData)
        {
            if (reqData != null && !string.IsNullOrEmpty(reqData.FactoryStatusName))
            {
                var d = new FactoryStatus()
                {
                    FactoryStatusId = reqData.FactoryStatusId
                };

                var result = new FactoryStatusService(_ptsContext).Save<FactoryStatus>(d, Convert.ToInt32(d.FactoryStatusId));
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
                var result = new FactoryStatusService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}