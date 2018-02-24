using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptLgYexpService : AppDataObject
    {
        private PTSContext _context;

        public RptLgYexpService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptLgYexp> GetAll()
        {
            return _context.RptLgYexp;
        }

        public IEnumerable<RptLgYexp> Get(int id, int y)
        {
            if(id == 0)
                return _context.RptLgYexp.Where(i => i.RptY == y).ToList().OrderBy(i => i.StkDesc);

            return _context.RptLgYexp.Where(i => i.RptId == id && i.RptY == y).ToList().OrderBy(i => i.StkDesc);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptLgYexp rpt)
        {
            return base.Save<RptLgYexp>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptLgYexp>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
