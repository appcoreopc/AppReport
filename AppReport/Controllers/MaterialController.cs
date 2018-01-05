using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AppReport.DataServices.PTSDataModel;
using AppReport.Services;
using AppReport.RequestModel;
using AppReport.Util;

namespace AppReport.Controllers
{
    [Route("api/[controller]")]
    public class MaterialController : Controller
    {
        PTSContext _ptsContext;

        public MaterialController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }
        
        [HttpGet]
        public IActionResult Index()
        {
            var data = new MaterialService(_ptsContext).GetAll();
            return new JsonResult(data);
        }

        [HttpPost]
        public IActionResult Save(UserRequestModel requestUser)
        {
            if (requestUser != null && !string.IsNullOrEmpty(requestUser.Name))
            {
                var rawMaterial = new Rmaterial()
                {
                    Rmid = requestUser.Id.HasValue ? requestUser.Id.Value : 0,
                    Rmcode = requestUser.Name,
                };

                var result = new MaterialService(_ptsContext).Save<Rmaterial>(rawMaterial, rawMaterial.Rmid);
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