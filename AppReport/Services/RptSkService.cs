using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptSkService : AppDataObject
    {
        private PTSContext _context;

        public RptSkService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptSk> GetAll()
        {
            return _context.RptSk;
        }

        public RptSk Get(int id)
        {
            if (_context.RptSk == null || _context.RptSk.Count() == 0)
                return null;

            return _context.RptSk.Where(i => i.RptId == id).Single();
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptSk rpt)
        {
            return base.Save<RptSk>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptSk>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
