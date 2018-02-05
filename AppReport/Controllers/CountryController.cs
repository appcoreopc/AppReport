using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;

namespace AppReport.Controllers
{
  
    public class CountryController : Controller
    {

        private PTSContext _ptsContext;

        public CountryController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = new CountryService(_ptsContext).GetAll();
            return new JsonResult(users);
        }

        [HttpPost]
        public IActionResult Save([FromBody] CountryRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.CountryName))
            {                           
                var result = new CountryService(_ptsContext).Save(requestUser);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(CountryRequestModel requestData)
        {
            /*if (requestData.CountryId.HasValue)
            {
                var result = new UserService(_ptsContext).Delete(requestData.CountryId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else*/
            return new BadRequestResult();
        }
    }
}