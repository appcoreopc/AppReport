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
    }
}
