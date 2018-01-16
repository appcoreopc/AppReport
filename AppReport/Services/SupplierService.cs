﻿using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class SupplierService : AppDataObject
    {
        private PTSContext _context;

        public SupplierService(PTSContext context): base(context)
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

        public bool SaveUser(Supplier supplier)
        {
            return base.Save<Supplier>(supplier, supplier.SupplierId);
        }

        public bool Delete(int supplierId)
        {
            return Remove<Supplier>(supplierId);
        }

    }

}