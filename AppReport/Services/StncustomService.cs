using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class StncustomService : AppDataObject
    {
        private PTSContext _context;

        public StncustomService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Stncustom> GetAll()
        {
            return _context.Stncustom;
        }

        public IEnumerable<Stncustom> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Stncustom.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Stncustom>(id);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Stncustom>(deleteItems);
        }

        public bool Save(StncustomRequestModel request)
        {            
            if (!request.StncustomId.HasValue)
            {
                var stncustom = new Stncustom()
                {
                    StncustomName = request.StncustomName,
                    IsLocal = request.IsLocal
                };

                Add<Stncustom>(stncustom);
            }
            else
            {
                var stnCustomItem = FindById<Stncustom>(request.StncustomId.Value);

                if (stnCustomItem != null)
                {
                    stnCustomItem.StncustomName = request.StncustomName;
                    stnCustomItem.IsLocal = request.IsLocal;
                    base.Save<Stncustom>(stnCustomItem, stnCustomItem.StncustomId);
                }
            }
            return false;
        }


        public bool Save(int id)
        {
            var d = FindById<Stncustom>(id);
            if (d != null)
                return Save(d, d.StncustomId);
            else
                return false;
        }
    }
}
