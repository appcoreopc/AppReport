using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using System;
using Microsoft.AspNetCore.Cors;

namespace AppReport.Controllers
{
    [EnableCors("DevPolicy")]
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
                var result = new UserService(_ptsContext).Save(requestUser);
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
                var result = new UserService(_ptsContext).Delete(requestData.DeleteItems);
                return HttpResultIntention.GetStatusCode(ActionIntent.Delete, result, null);
            }
            else
                return new BadRequestResult();
        }

        [HttpPost]
        public IActionResult Login([FromBody] UserRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.Username))
            {
                (var user, var status) = new UserService(_ptsContext).AuthenticateUser(requestUser);

                return HttpResultIntention.GetStatusCode(ActionIntent.Save, status, null);
            }
            return new BadRequestResult();
        }

    }
}