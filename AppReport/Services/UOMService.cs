using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class UOMService : AppDataObject
    {
        private PTSContext _context;

        public UOMService(PTSContext context):base(context)
        {
            _context = context;
        }
        public IEnumerable<Uom> GetAll()
        {
            return _context.Uom;
        }

        public IEnumerable<Uom> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Uom.Skip(skipAmount).Take(takeAmount);
        }

        public bool Save(Uom uomItem)
        {
            return base.Save<Uom>(uomItem, uomItem.UomId);
        }

        public bool Delete(int uomId)
        {
            return Remove<Uom>(uomId);
        }
    }
}
