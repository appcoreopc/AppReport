using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;
using AppReport.Util;

namespace AppReport.Controllers
{  
    public class EmployeeController : Controller
    {

        private PTSContext _ptsContext;

        public EmployeeController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }


        [HttpDelete]
        public IActionResult Delete([FromBody] DeleteRequestModel requestData)
        {
            if (requestData != null && 
                !string.IsNullOrEmpty(requestData.DeleteItems))
            {
                var result = new EmployeeService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = new EmployeeService(_ptsContext).GetAll();
            return new JsonResult(users);
        }

        [HttpPost]
        public IActionResult Save([FromBody] EmployeeRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.EmpName))
            {                           
                var result = new EmployeeService(_ptsContext).Save(requestUser);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

       
    }
}