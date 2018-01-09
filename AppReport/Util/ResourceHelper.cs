using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using AppReport.Resources;

namespace AppReport.Util
{
    public class ResourceHelper
    {
        public static string Get(string val)
        {
            return ReportResource.ResourceManager?.GetString(val) != null ? ReportResource.ResourceManager.GetString(val) : val;
        }
    }
}
