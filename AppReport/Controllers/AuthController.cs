using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Util;
using AppReport.Services;
using Microsoft.AspNetCore.Cors;

namespace AppReport.Controllers
{ 
    [EnableCors("DevPolicy")]
    public class AuthController : Controller
    {
        private PTSContext _ptsContext;

        public AuthController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }
        public IActionResult Index()
        {
            return View();
        }


        [EnableCors("DevPolicy")]
        [HttpPost]
        public IActionResult Login([FromBody] UserRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.Username))
            {
                (var user, var status) = new UserService(_ptsContext).AuthenticateUser(requestUser);

                return HttpResultIntention.GetStatusCode(ActionIntent.Login, status, null);
            }
            return new BadRequestResult();
        }


    }
}