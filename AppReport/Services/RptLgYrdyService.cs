using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptLgYrdyService : AppDataObject
    {
        private PTSContext _context;

        public RptLgYrdyService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptLgYrdy> GetAll()
        {
            return _context.RptLgYrdy;
        }

        public IEnumerable<RptLgYrdy> Get(int id)
        {
            return _context.RptLgYrdy.Where(i => i.RptId == id).ToList().OrderBy(i => i.StkDesc);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptLgYrdy rpt)
        {
            return base.Save<RptLgYrdy>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptLgYrdy>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
