using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.Config
{
    public class AppConfig
    {       
        public ConfigItem ConnectionStrings { get; set; }
        
    }

    public class ConfigItem
    {
        public string PTSDatabase { get; set; }
        
        public string ReportFilePath { get; set; }

    }
}
