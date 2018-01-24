using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class StncustomService : AppDataObject
    {
        private PTSContext _context;

        public StncustomService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Stncustom> GetAll()
        {
            return _context.Stncustom;
        }

        public IEnumerable<Stncustom> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Stncustom.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Stncustom>(id);
        }
        
        public bool Save(Stncustom d)
        {
            return base.Save<Stncustom>(d, d.StncustomId);
        }

        public bool Save(int id)
        {
            var d = FindById<Stncustom>(id);
            if (d != null)
                return Save(d);
            else
                return false;
        }
    }
}
