using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{

    [Route("api/[controller]")]
    public class StmCustomController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}