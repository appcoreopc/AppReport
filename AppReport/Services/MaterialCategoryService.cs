using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class MaterialCategoryService : AppDataObject
    {
        private PTSContext _context;

        public MaterialCategoryService(PTSContext context):base(context)
        {
            _context = context;
        }
        public IEnumerable<Rmcat> GetAll()
        {
            return _context.Rmcat;
        }

        public IEnumerable<Rmcat> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Rmcat.Skip(skipAmount).Take(takeAmount);
        }

        public bool Save(MaterialCategoryRequestModel d)
        {

            if (!d.RmcatId.HasValue)
            {
                var rmcat = new Rmcat()
                {
                    RmcatName = d.RmcatName,
                    TariffCode = d.TariffCode 
                 };
                return base.Save<Rmcat>(rmcat, null);
            }
            else
            {
                var rmcat = FindById<Rmcat>(d.RmcatId.Value);

                if (rmcat != null)
                {
                    rmcat.RmcatId = d.RmcatId.Value;
                    rmcat.RmcatName = d.RmcatName;
                    rmcat.TariffCode = d.TariffCode;
                    return base.Save<Rmcat>(rmcat, rmcat.RmcatId);
                }
            } 

            return false;
        }

        public bool Delete(int materialCategoryId)
        {
            return Remove<Rmcat>(materialCategoryId);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Rmcat>(deleteItems);
        }
    }
}
