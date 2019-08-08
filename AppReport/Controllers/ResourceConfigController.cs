using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    [EnableCors("DevPolicy")]
    public class ResourceConfigController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}