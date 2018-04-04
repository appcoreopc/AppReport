using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class StmService : AppDataObject
    {
        private PTSContext _context;

        public StmService(PTSContext context):base(context)
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

        public bool Save(StncustomRequestModel request)
        {
            if (!request.StncustomId.HasValue)
            {
                var supplier = new Stncustom()
                {
                    StncustomId = request.StncustomId.Value,
                    StncustomName = request.StncustomName,
                    IsLocal = request.IsLocal,
                    EditedDt = DateTime.Now
                };
                return base.Save<Stncustom>(supplier, null);
            }
            else
            {
                var stnCustom = FindById<Stncustom>(request.StncustomId.Value);
                if (stnCustom != null)
                {
                    stnCustom.StncustomName = request.StncustomName;
                    stnCustom.IsLocal = request.IsLocal;
                    stnCustom.EditedDt = DateTime.Now;

                    return base.Save<Stncustom>(stnCustom, stnCustom.StncustomId);
                }
            }
            return false;
        }

        public bool Delete(int stnCustomId)
        {
            return Remove<Stncustom>(stnCustomId);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Stncustom>(deleteItems);
        }

    }

}
