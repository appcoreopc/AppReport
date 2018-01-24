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
  
    public class UomController : Controller
    {

        private PTSContext _ptsContext;

        public UomController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {

            var d = new UomService(_ptsContext).GetAll();
            return new JsonResult(d);
        }

        [HttpPost]
        public IActionResult Save([FromBody] UomRequestModel reqData)
        {
            if (reqData != null && !string.IsNullOrEmpty(reqData.UomCode))
            {
                var d = new Uom()
                {
                    UomId = reqData.UomId 
                };

                var result = new UomService(_ptsContext).Save<Uom>(d, Convert.ToInt32(d.UomId));
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(UomRequestModel requestData)
        {
            if (requestData.UomId > 0)
            {
                var result = new UomService(_ptsContext).Delete(Convert.ToInt32(requestData.UomId));
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
                   

        [HttpGet]
        public IActionResult Get(int start, int size)
        {
            var itemList = new UomService(_ptsContext).GetAll();
            return new JsonResult(itemList);
        }    

    }
}