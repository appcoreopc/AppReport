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
    public class GrnController : Controller
    {
        private PTSContext _ptsContext;

        public GrnController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = new GrnService(_ptsContext).GetAll();
            return new JsonResult(users);
        }

        [HttpPost]
        public IActionResult Save([FromBody] GrnRequestModel d)
        {

            if (d != null && !string.IsNullOrEmpty(d.Lotno))
            {
                if (d.Grndate.HasValue)
                   d.Grndate = d.Grndate.Value.ToLocalTime(); 

                if (d.Dom.HasValue)
                    d.Dom = d.Dom.Value.ToLocalTime();

                if (d.CustomDate.HasValue)
                    d.CustomDate = d.CustomDate.Value.ToLocalTime();

                var result = new GrnService(_ptsContext).Save(d);
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
                var result = new GrnService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}