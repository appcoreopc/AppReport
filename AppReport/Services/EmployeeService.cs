using AppReport.Services.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.Services
{
    public class EmployeeService
    {
        PTSContext _context;

        EmployeeService(PTSContext context)
        {
            _context = context;
        }
    }
}
