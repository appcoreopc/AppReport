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

        public IEnumerable<Supplier> GetAll()
        {
            return _context.Supplier;
        }

        public IEnumerable<Supplier> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Supplier.Skip(skipAmount).Take(takeAmount);
        }
    }
       

}
