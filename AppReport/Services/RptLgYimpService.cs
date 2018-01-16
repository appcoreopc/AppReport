using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptLgYimpService : AppDataObject
    {
        private PTSContext _context;

        public RptLgYimpService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptLgYimp> GetAll()
        {
            return _context.RptLgYimp;
        }

        public IEnumerable<RptLgYimp> Get(int id, int y)
        {
            return _context.RptLgYimp.Where(i => i.RptId == id && i.RptY == y).ToList().OrderBy(i => i.FRmdesc);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptLgYimp rpt)
        {
            return base.Save<RptLgYimp>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptLgYimp>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
