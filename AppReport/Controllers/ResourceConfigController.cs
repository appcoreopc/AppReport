using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    
    public class ResourceConfigController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}