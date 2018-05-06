using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;

namespace AppReport
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //var host = new WebHostBuilder()
            //    .UseKestrel()
            //    .UseContentRoot(Directory.GetCurrentDirectory())
            //    .UseStartup<Startup>().UseUrls("http://0.0.0.0:5050")
            //    .UseApplicationInsights()
            //    .Build();
            //host.Run();

            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
       => WebHost.CreateDefaultBuilder(args).CaptureStartupErrors(true)
         .UseStartup<Startup>()
         .Build();
    }
}
