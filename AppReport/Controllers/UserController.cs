using Microsoft.AspNetCore.Mvc;
using AppReport.Services.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private PTSContext _ptsContext;

        /// <summary>
        /// 
        /// 
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
            var users = new UserService(_ptsContext).GetAllUsers();
            return new JsonResult(users);
        }
        
        [HttpPost]
        public IActionResult Save(UserRequestModel user)
        {
            return new CreatedResult("", "ok");
        }
        
        [HttpDelete]
        public IActionResult Delete(UserRequestModel user)
        {          
            return new OkResult(); // if fails return new NoContentResult();
        }
    }

}