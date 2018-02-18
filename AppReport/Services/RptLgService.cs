using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptLgService : AppDataObject
    {
        private PTSContext _context;

        public RptLgService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptLg> GetAll()
        {
            return _context.RptLg;
        }

        public IEnumerable<RptLg> GetAllRptDetails()
        {
            return _context.RptLg.Include(x => x.RptLgYexp).ToList();
        }

       /* public IEnumerable<RptLg> GetAllRptInvoices()
        {
            return _context.RptLg.Include(x => x.RptLgMstk).Include(x => x.RptLgMstkInv).ToList();
        }*/

        public RptLg Get(int id)
        {
            if (_context.RptLg == null || _context.RptLg.Count() == 0)
                return null;

            return _context.RptLg.Where(i => i.RptId == id).Single();
        }

        public bool Delete(int id)
        {
            return Remove<RptLg>(id);
        }

        public bool Save(RptLgRequestModel requestModel)
        {
            var newData = new RptLg()
            {
                RefNo = requestModel.RefNo,
                RptEdateY1 = requestModel.RptEdateY1,
                RptEdateY2 = requestModel.RptEdateY2,
                 
                LrcptBr = requestModel.LrcptBr,
                LrcptDept = requestModel.LrcptDept,

                LrcptAdd1 = requestModel.LrcptAdd1,
                LrcptAdd2 = requestModel.LrcptAdd2,
                LrcptAdd3 = requestModel.LrcptAdd3,
                LrcptAdd4 = requestModel.LrcptAdd4, 

                SignedByEmpId = requestModel.SignedByEmpId,
                SignedByName = requestModel.SignedByName, 
                SignedByPos = requestModel.SignedByPos,
                SignedDate = requestModel.SignedDate,
                 
            };

            if (requestModel.RptId.HasValue)
            {
                newData.RptId = (int)requestModel.RptId;
            }
            else
            {
                newData.RptId = 0;
            }

            var result = (base.Save<RptLg>(newData, requestModel.RptId));

            if (result)
            {
                if (requestModel?.RptLgYbgt != null)
                {
                    HandleChildUpdateItems(requestModel.RptLgYbgt);
                }
            }

            return result;
        }

        private void HandleChildUpdateItems(IEnumerable<RptLgYbgtModel> requestItemDetails)
        {
            /// loops through items to see if we need to update 

            foreach (var item in requestItemDetails)
            {
                if (item.TxnId.HasValue)
                {
                    // update    
                    var targetUpdateItem = base.FindById<RptLgYbgt>(item.TxnId.Value);

                    if (targetUpdateItem != null)
                    {
                        targetUpdateItem.RptId = item.RptId;
                        /*targetUpdateItem.UsedCost = item.UsedCost;
                        targetUpdateItem.WastedCost = item.WastedCost;*/

                        // Persist into database
                        Save(targetUpdateItem, targetUpdateItem.TxnId);
                    }
                }
                else
                {
                    // add 
                    var targetAddItem = new RptLgYbgt();

                    targetAddItem.RptId = item.RptId;
                    /*targetAddItem.UsedCost = item.UsedCost;
                    targetAddItem.WastedCost = item.WastedCost;*/

                    base.Save<RptLgYbgt>(targetAddItem, null);

                }
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
