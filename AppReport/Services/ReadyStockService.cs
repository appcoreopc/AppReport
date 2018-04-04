using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class ReadyStockService : AppDataObject
    {
        private PTSContext _context;

        public ReadyStockService(PTSContext context):base(context)
        {
            _context = context;
        }
        
        public IEnumerable<ReadyStock> GetAll()
        {
            return _context.ReadyStock;
        }
         
        public bool Delete(int id)
        {
            return Remove<ReadyStock>(id);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<ReadyStock>(deleteItems);
        }

        public bool Save(ReadyStockRequestModel requestModel)
        { 
            if (!requestModel.ReadyStockId.HasValue)
            {
                var readyStock = new ReadyStock()
                { 
                    ReadyStockDesc = requestModel.ReadyStockDesc,
                    TariffCode = requestModel.TariffCode,
                    CreatedDt = requestModel.CreatedDt,
                    DutyImpRate = requestModel.DutyImpRate,
                    Gstrate = requestModel.Gstrate, 
                    CreatedByUserId = requestModel.CreatedByUserId,
                    EditedByUserId = requestModel.EditedByUserId
                };

                return Save<ReadyStock>(readyStock, null);
            }
            else
            {
                var readyStock = base.FindById<ReadyStock>(requestModel.ReadyStockId.Value);

                if (readyStock != null)
                { 
                    readyStock.ReadyStockDesc = requestModel.ReadyStockDesc;
                    readyStock.TariffCode = requestModel.TariffCode;
                    readyStock.CreatedDt = requestModel.CreatedDt;
                    readyStock.DutyImpRate = requestModel.DutyImpRate;
                    readyStock.Gstrate = requestModel.Gstrate;
                    readyStock.CreatedByUserId = requestModel.CreatedByUserId;
                    readyStock.EditedByUserId = requestModel.EditedByUserId; 

                    return Save<ReadyStock>(readyStock, requestModel.ReadyStockId);
                }   
                
            }

            return false;

        }
    }    
}
