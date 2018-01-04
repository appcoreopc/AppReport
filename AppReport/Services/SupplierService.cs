using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppReport.Services
{
    public class SupplierService
    {
        private PTSContext _context;

        public SupplierService(PTSContext context)
        {
            _context = context;
        }
    }
       

}
