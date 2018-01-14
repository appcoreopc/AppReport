using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptLgYbgtService : AppDataObject
    {
        private PTSContext _context;

        public RptLgYbgtService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptLgYbgt> GetAll()
        {
            return _context.RptLgYbgt;
        }

        public IEnumerable<RptLgYbgt> Get(int id, bool isLocal)
        {
            return _context.RptLgYbgt.Where(i => i.RptId == id && i.IsLocal == isLocal).ToList().OrderBy(i => i.FRmdesc);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptLgYbgt rpt)
        {
            return base.Save<RptLgYbgt>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptLgYbgt>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
