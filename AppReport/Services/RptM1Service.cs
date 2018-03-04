using AppReport.DataServices.PTSDataModel; 
using AppReport.RequestModel;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class RptM1Service : AppDataObject
    {
        private PTSContext _context;

        public RptM1Service(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<RptM1> GetAll()
        {
            return _context.RptM1;
        }

        public IEnumerable<RptM1> GetAllRptDetails()
        {
            return _context.RptM1.Include(x => x.RptM1Mstk).ToList();
        }
         
        public IEnumerable<RptM1> GetAllRptInvoices()
        {
            return _context.RptM1.Include(x => x.RptM1Mstk).Include(x => x.RptM1MstkInv).ToList();
        }

        public RptM1 Get(int id)
        {
            if (_context.RptM1 == null ||  _context.RptM1.Count() == 0)
                return null;

            return _context.RptM1.Where(i => i.RptId == id).Single();
        }

        public bool Delete(int id)
        {
            return Remove<RptM1>(id);
        }
        
        public bool Save(RptM1RequestModel requestModel)
        {
            var newData = new RptM1()
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

                ExpQuota = requestModel.ExpQuota,
                LocalSalesQuota = requestModel.LocalSalesQuota,
                Gpbdate = requestModel.Gpbdate,
                LicenseNo = requestModel.LicenseNo,

                SalesExpCont = requestModel.SalesExpCont,
                SalesFiz = requestModel.SalesFiz,
                SalesGpb = requestModel.SalesGpb,
                SalesLocal = requestModel.SalesLocal,

                SignedByEmpId = requestModel.SignedByEmpId,
                SignedByName = requestModel.SignedByName,
                SignedByIdno = requestModel.SignedByIdno,
                SignedByPos = requestModel.SignedByPos,
                SignedDate = requestModel.SignedDate,

                CreatedByEmpId = requestModel.CreatedByEmpId,
                CreatedByName = requestModel.CreatedByName,
                CreatedByIdno = requestModel.CreatedByIdno,
                CreatedByPos = requestModel.CreatedByPos,
                 
                AppdByEmpId = requestModel.AppdByEmpId,
                AppdByName = requestModel.AppdByName,
                AppdByIdno = requestModel.AppdByIdno,
                AppdByPos = requestModel.AppdByPos,

                PurchEq = requestModel.PurchEq,
                EqDutyImp = requestModel.EqDutyImp,
                EqGst = requestModel.EqGst,
                EqDutyExcise = requestModel.EqDutyExcise,

            };

            if (requestModel.RptId.HasValue)
            {
                newData.RptId = (int)requestModel.RptId;
            }
            else
            {
                newData.RptId = 0;
            }

            var result = (base.Save<RptM1>(newData, requestModel.RptId));

            if (result)
            {
                if (requestModel?.RptM1Mstk != null)
                {
                    HandleChildUpdateItems(requestModel.RptM1Mstk);
                }
            }

            return result;
        }

        private void HandleChildUpdateItems(IEnumerable<RptM1MstkModel> requestItemDetails)
        {
            /// loops through items to see if we need to update 

            foreach (var item in requestItemDetails)
            {
                if (item.MstkId.HasValue)
                {
                    // update    
                    var targetUpdateItem = base.FindById<RptM1Mstk>(item.MstkId.Value);

                    if (targetUpdateItem != null)
                    {
                        targetUpdateItem.RptId = item.RptId;
                        targetUpdateItem.UsedCost = item.UsedCost;
                        targetUpdateItem.WastedCost = item.WastedCost;
                        targetUpdateItem.FOpenBal = item.FOpenBal;

                        // Persist into database
                        Save(targetUpdateItem, targetUpdateItem.MstkId);
                    }
                }
                else
                {
                    // add 
                    var targetAddItem = new RptM1Mstk();

                    targetAddItem.RptId = item.RptId;
                    targetAddItem.UsedCost = item.UsedCost;
                    targetAddItem.WastedCost = item.WastedCost;
                    targetAddItem.FOpenBal = item.FOpenBal;

                    base.Save<RptM1Mstk>(targetAddItem, null);

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
