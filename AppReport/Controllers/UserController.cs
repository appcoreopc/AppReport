using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private PTSContext _ptsContext;

        /// <summary>     
        /// http://hamidmosalla.com/2017/03/29/asp-net-core-action-results-explained/
        /// </summary>
        /// <param name="ptsContext"></param>
        public UserController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var users = new UserService(_ptsContext).GetAll();
            return new JsonResult(users);
        }     

        [HttpPost]
        public IActionResult Save(UserRequestModel requestUser)
        {
            var user = new User()
            {
                Name = requestUser.Name,
            };

            if (user != null && !string.IsNullOrEmpty(user.Name))
            {
                var result = new UserService(_ptsContext).Save<User>(user, user.Id);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }

            return new BadRequestResult();

        }
        
        [HttpDelete]
        public IActionResult Delete(UserRequestModel user)
        {
            if (user.Id.HasValue)
            {
                var result = new UserService(_ptsContext).Delete(user.Id.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();

        }
    }

}