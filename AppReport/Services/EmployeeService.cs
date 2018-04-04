using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;
using AppReport.Util;


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

        public bool Delete(string deleteItems)
        {
            if (deleteItems != null)
            {
                return Remove<Employee>(deleteItems.SplitByComma().ToIntList());
            }            
            return false;
        }

        public bool Save(EmployeeRequestModel requestUser)
        {
            if (!requestUser.EmpId.HasValue)
            {
                var user = new Employee()
                {
                    EmpName = requestUser.EmpName,
                    EmpAd1 = requestUser.EmpAd1,
                    EmpAd2 = requestUser.EmpAd2,
                    EmpAd3 = requestUser.EmpAd3,
                    EmpIdno = requestUser.EmpIdno,
                    JobTitleId = requestUser.JobTitleId
                };
                return base.Save<Employee>(user, null);
            }
            else
            {
                var employee = base.FindById<Employee>(requestUser.EmpId.Value);
                if (employee != null)
                {
                    employee.EmpName = requestUser.EmpName;
                    employee.EmpAd1 = requestUser.EmpAd1;
                    employee.EmpAd2 = requestUser.EmpAd2;
                    employee.EmpAd3 = requestUser.EmpAd3;
                    employee.EmpIdno = requestUser.EmpIdno;
                    employee.JobTitleId = requestUser.JobTitleId;
                }
                return base.Save<Employee>(employee, employee.EmpId);
            }
        }

    }
}
