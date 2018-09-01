using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class FactoryStatusService : AppDataObject
    {
        private PTSContext _context;

        public FactoryStatusService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<FactoryStatus> GetAll()
        {
            return _context.FactoryStatus;
        }
         

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<FactoryStatus>(deleteItems);
        }

        public bool Save(FactoryStatus d)
        {
            return Save<FactoryStatus>(d, d.FactoryStatusId);
        }

        public bool Save(int id)
        {
            var d = FindById<FactoryStatus>(id);
            if (d != null)
                return Save(d);
            else
                return false;
        }
    }
}
