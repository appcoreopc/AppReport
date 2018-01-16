using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptM1Service : AppDataObject
    {
        private PTSContext _context;

        public RptM1Service(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptM1> GetAll()
        {
            return _context.RptM1;
        }

        public RptM1 Get(int id)
        {
            if (_context.RptM1 == null ||  _context.RptM1.Count() == 0)
                return null;

            return _context.RptM1.Where(i => i.RptId == id).Single();
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptM1 rpt)
        {
            return base.Save<RptM1>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptM1>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
