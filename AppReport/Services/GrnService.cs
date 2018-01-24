using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class GrnService : AppDataObject
    {
        private PTSContext _context;

        public GrnService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Grn> GetAll()
        {
            return _context.Grn;
        }

        public IEnumerable<Grn> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Grn.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Grn>(id);
        }
        
        public bool Save(Grn user)
        {
            return base.Save<Grn>(user, Convert.ToInt32(user.Grnid));
        }

        public bool Save(int userId)
        {
            var user = FindById<Grn>(userId);
            if (user != null)
                return Save(user);
            else
                return false;
        }
    }
}
