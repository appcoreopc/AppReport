using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptLgService : AppDataObject
    {
        private PTSContext _context;

        public RptLgService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptLg> GetAll()
        {
            return _context.RptLg;
        }

        public RptLg Get(int id)
        {
            if (_context.RptLg==null ||  _context.RptLg.Count() == 0)
                return null;

            return _context.RptLg.Where(i => i.RptId == id).Single();
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptLg rpt)
        {
            return base.Save<RptLg>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptLg>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
