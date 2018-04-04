using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RawMaterialService : AppDataObject
    {
        private PTSContext _context;

        public RawMaterialService(PTSContext context):base(context)
        {
            _context = context;
        }
        
        public IEnumerable<Rmaterial> GetAll()
        {
            return _context.Rmaterial;
        }

        public IEnumerable<Rmaterial> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Rmaterial.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Rmaterial>(id);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Rmaterial>(deleteItems);
        }
        public bool Save(RawMaterialRequestModel requestModel)
        {
            if (!requestModel.Rmid.HasValue)
            {
                var rawMaterial = new Rmaterial()
                {
                    RmcatId = requestModel.RmcatId.Value,
                    Rmcode = requestModel.Rmcode,
                    Rmdesc = requestModel.Rmdesc,
                    CountryList = requestModel.CountryList,
                    CreatedDt = requestModel.CreatedDt,
                    DutyImpRate = requestModel.DutyImpRate,
                    EditedDt = requestModel.EditedDt,
                    Gstrate = requestModel.Gstrate,
                    TariffCode = requestModel.TariffCode,
                    Uomid = requestModel.Uomid,
                    CreatedByUserId = requestModel.CreatedByUserId,
                    EditedByUserId = requestModel.EditedByUserId
                };

                Save<Rmaterial>(rawMaterial, null);
            }
            else
            {
                var rawMaterial = base.FindById<Rmaterial>(requestModel.Rmid.Value);

                if (rawMaterial != null)
                {
                    rawMaterial.RmcatId = requestModel.RmcatId.Value;
                    rawMaterial.Rmcode = requestModel.Rmcode;
                    rawMaterial.Rmdesc = requestModel.Rmdesc;
                    rawMaterial.CountryList = requestModel.CountryList;
                    rawMaterial.CreatedDt = requestModel.CreatedDt;
                    rawMaterial.DutyImpRate = requestModel.DutyImpRate;
                    rawMaterial.EditedDt = requestModel.EditedDt;
                    rawMaterial.Gstrate = requestModel.Gstrate;
                    rawMaterial.TariffCode = requestModel.TariffCode;
                    rawMaterial.Uomid = requestModel.Uomid;
                    rawMaterial.CreatedByUserId = requestModel.CreatedByUserId;
                    rawMaterial.EditedByUserId = requestModel.EditedByUserId;

                    return Save<Rmaterial>(rawMaterial, requestModel.Rmid);
                }   
                
            }

            return false;

        }
    }    
}
