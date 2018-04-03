using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;

namespace AppReport.Controllers
{
  
    public class JobTitleController : Controller
    {

        private PTSContext _ptsContext;

        public JobTitleController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = new JobTitleService(_ptsContext).GetAll();
            return new JsonResult(users);
        }

        [HttpPost]
        public IActionResult Save([FromBody] JobTitleRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.JobTitleName))
            {                           
                var result = new JobTitleService(_ptsContext).Save(requestUser);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(JobTitleRequestModel requestData)
        {
            if (requestData != null && 
                requestData.JobTitleId > 0)
            {
                var result = new JobTitleService(_ptsContext).Delete(requestData.JobTitleId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}