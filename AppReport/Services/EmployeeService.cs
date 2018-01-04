using AppReport.DataServices.PTSDataModel;
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
        
        public IEnumerable<Employee> GetAllUsers()
        {
            return _context.Employee;
        }

        public IEnumerable<Employee> GetAllUsers(int skipAmount, int takeAmount)
        {
            return _context.Employee.Skip(skipAmount).Take(takeAmount);
        }
    }
}
