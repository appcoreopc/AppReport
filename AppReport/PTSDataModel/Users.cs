using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class Users
    {
        public int UserId { get; set; }
        public int? UserTypeId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
