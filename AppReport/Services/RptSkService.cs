using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<RptSk> GetAllRptDetails()
        {
            return _context.RptSk.Include(x => x.RptSkMimp).ToList();
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

        public bool Save(RptSkRequestModel requestModel)
        { 
            var newData = new RptSk()
            {
                RefNo = requestModel.RefNo,
                RptDate = requestModel.RptDate,

                LetterDate = requestModel.LetterDate,
                LrcptBr = requestModel.LrcptBr,
                LrcptDept = requestModel.LrcptDept,

                LrcptAdd1 = requestModel.LrcptAdd1,
                LrcptAdd2 = requestModel.LrcptAdd2,
                LrcptAdd3 = requestModel.LrcptAdd3,
                LrcptAdd4 = requestModel.LrcptAdd4,

                SignedByEmpId = requestModel.SignedByEmpId,
                SignedByName = requestModel.SignedByName,
                SignedByIdno = requestModel.SignedByIdno,
                SignedByPos = requestModel.SignedByPos
            };
 
            if (requestModel.RptId.HasValue)
            {
                newData.RptId = (int)requestModel.RptId;
            }
            else
            {
                newData.RptId = 0;
            }

            var result = (base.Save<RptSk>(newData, requestModel.RptId));

            if (result)
            {
                if (requestModel?.RptSkMimp != null)
                {
                    HandleChildUpdateItems(requestModel.RptSkMimp);
                }
            }

            return result;

        }

        private void HandleChildUpdateItems(IEnumerable<RptSkMimpModel> requestItemDetails)
        {
            /// loops through items to see if we need to update 
            
            foreach (var item in requestItemDetails)
            {                
                if (item.TxnId.HasValue)
                {
                    // update    
                    var targetUpdateItem = base.FindById<RptSkMimp>(item.TxnId.Value);

                    if (targetUpdateItem != null)
                    {
                        targetUpdateItem.RptId = item.RptId;
                        targetUpdateItem.Note = item.Note;
                        targetUpdateItem.FImpWgt = item.FImpWgt;
                        targetUpdateItem.FImpDate = item.FImpDate;
                        targetUpdateItem.FImpCost = item.FImpCost;
                        targetUpdateItem.FGstcost = item.FGstcost;
                        targetUpdateItem.FCustomNo = item.FCustomNo;

                        // Persist into database
                        Save(targetUpdateItem, targetUpdateItem.TxnId);
                    }
                }
                else
                {
                    // add 
                    var targetAddItem = new RptSkMimp();

                    targetAddItem.RptId = item.RptId;
                    targetAddItem.Note = item.Note;
                    targetAddItem.FImpWgt = item.FImpWgt;
                    targetAddItem.FImpDate = item.FImpDate;
                    targetAddItem.FImpCost = item.FImpCost;
                    targetAddItem.FGstcost = item.FGstcost;
                    targetAddItem.FCustomNo = item.FCustomNo;
                    
                    base.Save<RptSkMimp>(targetAddItem, null);

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
