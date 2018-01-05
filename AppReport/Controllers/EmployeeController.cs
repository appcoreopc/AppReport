using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {

        private PTSContext _ptsContext;

        public EmployeeController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = new EmployeeService(_ptsContext).GetAll();
            return new JsonResult(users);
        }

        [HttpPost]
        public IActionResult Save(EmployeeRequestModel requestEmployee)
        {
            var user = new Employee()
            {
                EmpName = requestEmployee.Name,
            };
            var result = new EmployeeService(_ptsContext).Save(user);
            return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
        }

        [HttpDelete]
        public IActionResult Delete(EmployeeRequestModel user)
        {
            if (user.Id.HasValue)
            {
                var result = new EmployeeService(_ptsContext).Delete(user.Id.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}