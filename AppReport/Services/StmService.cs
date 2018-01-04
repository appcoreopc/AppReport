using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.Services
{
    public class StmService
    {
        private PTSContext _context;

        public StmService(PTSContext context)
        {
            _context = context;
        }

        public IEnumerable<Stncustom> GetAllUsers()
        {
            return _context.Stncustom;
        }

        public IEnumerable<Stncustom> GetAllUsers(int skipAmount, int takeAmount)
        {
            return _context.Stncustom.Skip(skipAmount).Take(takeAmount);
        }
    }

}
