using Microsoft.AspNetCore.Mvc;

namespace AppReport.Controllers
{
    public class HealthController : Controller
    {

        [HttpOptions]
        public IActionResult Index()
        {
            // 
            return Ok("POST,GET,PUT,DELETE");
        }
    }
}