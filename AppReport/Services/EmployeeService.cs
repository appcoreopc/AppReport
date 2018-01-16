using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class EmployeeService : AppDataObject
    {
        private PTSContext _context;

        public EmployeeService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Employee> GetAll()
        {
            return _context.Employee;
        }

        public IEnumerable<Employee> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Employee.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(Employee user)
        {
            return base.Save<Employee>(user, user.EmpId);
        }

        public bool Save(int userId)
        {
            var user = FindById<Employee>(userId);
            if (user != null)
                return Save(user);
            else
                return false;
        }
    }
}
