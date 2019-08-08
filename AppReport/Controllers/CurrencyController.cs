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
    public class CurrencyController : Controller
    {
        private PTSContext _ptsContext;

        public CurrencyController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var d = new CurrencyService(_ptsContext).GetAll();
            return new JsonResult(d);
        }

        [HttpPost]
        public IActionResult Save([FromBody]  CurrencyRequestModel reqData)
        {
            if (reqData != null && !string.IsNullOrEmpty(reqData.CurrencyCode))
            {
                var d = new Currency()
                {
                   CurrencyId = reqData.CurrencyId
                };

                var result = new CurrencyService(_ptsContext).Save<Currency>(d, Convert.ToInt32(d.CurrencyId));
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
                var result = new CurrencyService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}