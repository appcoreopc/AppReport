using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;

namespace AppReport.Controllers
{
   
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
        
        [HttpGet]
        public IActionResult GetUser(int start, int size)
        {
            var users = new UserService(_ptsContext).GetAll(start, size);
            return new JsonResult(users);
        }

        [HttpPost]        
        public IActionResult Save([FromBody] UserRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.Username))
            {
                var user = new Users()
                {                    
                    UserId = requestUser.Id.HasValue ? requestUser.Id.Value : 0,
                    Username = requestUser.Username,
                    //Password = requestUser.Password
                };

                var result = new UserService(_ptsContext).Save<Users>(user, user.UserId);
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