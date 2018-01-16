using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using AppReport.Services;
using AppReport.Util;
using AppReport.RequestModel;

namespace AppReport.Controllers
{
  
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
        public IActionResult Save([FromBody] EmployeeRequestModel requestUser)
        {
            //if (requestUser != null && !string.IsNullOrEmpty(requestUser.EmpName))
            //{
            //    var user = new Employee()
            //    {
            //        EmpId = requestUser.EmpId,
            //        EmpName = requestUser.EmpName,
            //        EmpAd1 = requestUser.EmpAd1,
            //        EmpAd2 = requestUser.EmpAd2,
            //        EmpAd3 = requestUser.EmpAd3,
            //        EmpIdno = requestUser.EmpIdno
            //    };

            //    var result = new EmployeeService(_ptsContext).Save<Employee>(user, user.EmpId);
            //    return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            //}
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