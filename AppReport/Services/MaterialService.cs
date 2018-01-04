using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.Services
{
    public class MaterialService
    {
        private PTSContext _context;

        public MaterialService(PTSContext context)
        {
            _context = context;
        }
        
        public IEnumerable<Rmaterial> GetAllUsers()
        {
            return _context.Rmaterial;
        }

        public IEnumerable<Rmaterial> GetAllUsers(int skipAmount, int takeAmount)
        {
            return _context.Rmaterial.Skip(skipAmount).Take(takeAmount);
        }
    }
}
