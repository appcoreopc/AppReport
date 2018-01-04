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
    }
}
