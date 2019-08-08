using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using AppReport.DataServices.PTSDataModel;
using AppReport.Config;
using Microsoft.AspNetCore.Cors;

namespace ACC.IDS.NetCore.Service.SelfHost.Controllers
{
    [EnableCors("DevPolicy")]
    [Route("api/[controller]")]
    public class HealthController : Controller
    {
        private PTSContext _ptsContext;
        private AppConfig _accessConfig;

        public HealthController(PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _ptsContext = ptsContext;
            _accessConfig = accessConfig?.Value;
        }
        
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {                    
             return TestDatabaseConnection();         
        }
                       
        private string[] TestDatabaseConnection()
        {
            try
            {
                var conn = _ptsContext.Database.GetDbConnection();

                if (conn.State == System.Data.ConnectionState.Closed)
                    conn.Open();
                
                return new string[] {
                    "DatabaseConnection",  $"{_accessConfig?.ConnectionStrings.PTSDatabase}",
                    "ConnectionState: " , conn.State.ToString(), "PTS File Path" , _accessConfig.ConnectionStrings.ReportFilePath
                };
            }
            catch (Exception ex)
            {
                return new string[] {
                    "DatabaseConnection",  "Error connecting to database."
                };
            }
        }     
      
    }
}
