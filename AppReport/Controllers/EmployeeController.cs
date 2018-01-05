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
        public IActionResult Save(UserRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.Name))
            {
                var user = new Employee()
                {
                    EmpId = requestUser.Id.HasValue ? requestUser.Id.Value : 0,
                    EmpName = requestUser.Name,
                };

                var result = new EmployeeService(_ptsContext).Save<Employee>(user, user.EmpId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(UserRequestModel requestData)
        {
            if (requestData.Id.HasValue)
            {
                var result = new UserService(_ptsContext).Delete(requestData.Id.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}