using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class JobTitleService : AppDataObject
    {
        private PTSContext _context;

        public JobTitleService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<JobTitle> GetAll()
        {
            return _context.JobTitle;
        }

        public IEnumerable<JobTitle> GetAll(int skipAmount, int takeAmount)
        {
            return _context.JobTitle.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }

        public bool Save(JobTitleRequestModel requestUser)
        {
            return true;
        }


    }
}
