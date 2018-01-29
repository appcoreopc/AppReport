
using Microsoft.AspNetCore.Mvc;

namespace AppReport.Util
{
    class HttpResultIntention
    {
        public static IActionResult GetStatusCode(ActionIntent requestIntent, bool status, object data)
        {
            switch (requestIntent)
            {
                case ActionIntent.Get:
                    return new JsonResult(data);
                case ActionIntent.Login:
                    return new OkResult();
                case ActionIntent.Update:
                    return status ? (IActionResult)new OkResult() : new BadRequestResult();
                case ActionIntent.Save:
                    return status ? (IActionResult)new OkResult() : new BadRequestResult();
                case ActionIntent.Delete:
                    return status ? (IActionResult)new OkResult() : new BadRequestResult();
                default:
                    return new OkResult();
            }
        }
    }

    enum ActionIntent
    {
        Get,
        Update,
        Save,
        Delete, 
        Login
    }

}
