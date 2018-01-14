using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptM1MstkService : AppDataObject
    {
        private PTSContext _context;

        public RptM1MstkService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptM1Mstk> GetAll()
        {
            return _context.RptM1Mstk;
        }

        public List<RptM1Mstk> Get(int id)
        {
            if (_context.RptM1Mstk == null ||  _context.RptM1Mstk.Count() == 0)
                return null;

            return _context.RptM1Mstk.Where(i => i.RptId == id).OrderBy(i => i.FRmdesc).OrderBy(i => i.InvoiceNo).ToList();
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptM1Mstk rpt)
        {
            return base.Save<RptM1Mstk>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptM1Mstk>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
