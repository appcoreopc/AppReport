using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class UomService : AppDataObject
    {
        private PTSContext _context;

        public UomService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Uom> GetAll()
        {
            return _context.Uom;
        }

        public IEnumerable<Uom> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Uom.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Uom>(id);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Uom>(deleteItems);
        }
        
        public bool Save(Uom d)
        {
            return base.Save<Uom>(d, d.UomId);
        }

        public bool Save(int id)
        {
            var d = FindById<Uom>(id);
            if (d != null)
                return Save(d);
            else
                return false;
        }
    }
}
