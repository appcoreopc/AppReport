using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptM1MstkInvService : AppDataObject
    {
        private PTSContext _context;

        public RptM1MstkInvService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptM1MstkInv> GetAll()
        {
            return _context.RptM1MstkInv;
        }

        public List<RptM1MstkInv> Get(int id)
        {
            if (_context.RptM1MstkInv == null ||  _context.RptM1MstkInv.Count() == 0)
                return null;

            return _context.RptM1MstkInv.Where(i => i.RptId == id).OrderBy(i => i.InvoiceNo).ToList();
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }
        
        public bool Save(RptM1MstkInv rpt)
        {
            return base.Save<RptM1MstkInv>(rpt, rpt.RptId);
        }

        public bool Save(int userId)
        {
            var rpt = FindById<RptM1MstkInv>(userId);
            if (rpt != null)
                return Save(rpt);
            else
                return false;
        }
    }
}
