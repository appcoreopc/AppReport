using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class EmployeeService : AppDataObject
    {
        private PTSContext _context;

        EmployeeService(PTSContext context) : base(context)
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

        public bool DeleteUser(int id)
        {
            return Remove<User>(id);
        }
        
        public bool SaveUser(Employee user)
        {
            return base.Save<Employee>(user);
        }

        public bool SaveUser(int userId)
        {
            var user = FindById<Employee>(userId);
            if (user != null)
                return Save(user);
            else
                return false;
        }
    }
}
