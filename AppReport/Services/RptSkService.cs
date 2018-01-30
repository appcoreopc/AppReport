using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
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

        public IEnumerable<RptSk> GetAll(int skipAmount, int takeAmount)
        {
            return _context.RptSk.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<RptSk>(id);
        }


        public bool Save(RptSkRequestModel d)
        {
            if (d.RptId <= 0)
            {
                var data = new RptSk()
                { 
                };
                return base.Save<RptSk>(data, null);
            }
            else
            {
                var data = base.FindById<RptSk>(d.RptId);
                if (data != null)
                { 
                }

                return base.Save<RptSk>(data, d.RptId);

            }
        }

        public bool Save(int userId)
        {
            /* var user = FindById<Grn>(userId);
             if (user != null)
                 return Save(user);
             else*/
            return false;
        }
    }
}
