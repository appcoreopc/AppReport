using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptSkMimpService : AppDataObject
    {
        private PTSContext _context;

        public RptSkMimpService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptSkMimp> GetAll()
        {
            return _context.RptSkMimp;
        }

        public IEnumerable<RptSkMimp> Get(int id)
        {
            return _context.RptSkMimp.Where(i => i.RptId == id).ToList().OrderBy(i => i.FImpDate);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptSkMimp rpt)
        {
            return base.Save<RptSkMimp>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptSkMimp>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
