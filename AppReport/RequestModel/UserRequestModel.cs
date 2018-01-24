using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.RequestModel
{
    public class UserRequestModel
    {
        public int? UserId { get; set; }
             
        public string Username { get; set; }

        public int? UserTypeId { get; set; }

        public string Password { get; set; }

    }
}
