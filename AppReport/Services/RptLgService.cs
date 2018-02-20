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
            return _context.RptLg.Include(x => x.RptLgYexp).Include(x => x.RptLgYimp).ToList();
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
                RptSdateY1 = requestModel.RptSdateY1,
                RptEdateY1 = requestModel.RptEdateY1,
                RptSdateY2 = requestModel.RptSdateY2,
                RptEdateY2 = requestModel.RptEdateY2,
                RptSdateY3 = requestModel.RptSdateY3,
                RptEdateY3 = requestModel.RptEdateY3,
                RefNo = requestModel.RefNo,
                Ldate = requestModel.Ldate,
                LrcptDept = requestModel.LrcptDept,
                LrcptBr = requestModel.LrcptBr, 
                LrcptAdd1 = requestModel.LrcptAdd1,
                LrcptAdd2 = requestModel.LrcptAdd2,
                LrcptAdd3 = requestModel.LrcptAdd3,
                LrcptAdd4 = requestModel.LrcptAdd4,
                PbbcekNo = requestModel.PbbcekNo,
                LicenseFee = requestModel.LicenseFee,

                SignedByEmpId = requestModel.SignedByEmpId,
                SignedByName = requestModel.SignedByName, 
                SignedByPos = requestModel.SignedByPos,
                SignedDate = requestModel.SignedDate,

                AppByEmpId = requestModel.AppByEmpId,
                AppByPos = requestModel.AppByPos,
                AppByName = requestModel.AppByName,
                AppByIdno = requestModel.AppByIdno,
                AppCoName = requestModel.AppCoName,
                AppAdd1 = requestModel.AppAdd1,
                AppAdd2 = requestModel.AppAdd2,
                AppAdd3 = requestModel.AppAdd3,
                AppAdd4 = requestModel.AppAdd4,
                AppDate = requestModel.AppDate,
                BrcptDept = requestModel.BrcptDept,
                BrcptBr = requestModel.BrcptBr,
                BrcptAdd1 = requestModel.BrcptAdd1,
                BrcptAdd2 = requestModel.BrcptAdd2,
                BrcptAdd3 = requestModel.BrcptAdd3,
                BrcptAdd4 = requestModel.BrcptAdd4,
                RptCoName = requestModel.RptCoName,
                RptSignedByEmpId = requestModel.RptSignedByEmpId,
                RptSignedByPos = requestModel.RptSignedByPos,
                RptSignedByIdno = requestModel.RptSignedByIdno,
                RptSignedByName = requestModel.RptSignedByName,
                MfdGoodY2 = requestModel.MfdGoodY2,
                MfdGoodY3 = requestModel.MfdGoodY3,
                MfdLicenseSdate = requestModel.MfdLicenseSdate,
                MfdLicenseEdate = requestModel.MfdLicenseEdate,
                IsChgCoName = requestModel.IsChgCoName,
                IsChgCoMember = requestModel.IsChgCoMember,
                IsChgAddress = requestModel.IsChgAddress,
                IsChgFtyStr = requestModel.IsChgFtyStr,
                IsChgEq = requestModel.IsChgEq,
                BgtRmcost = requestModel.BgtRmcost,
                BgtRdyGoodCost = requestModel.BgtRdyGoodCost,
                MktExpRate = requestModel.MktExpRate,
                BgtMktExpCost = requestModel.BgtMktExpCost,
                BgtMktExpRate = requestModel.BgtMktExpRate,
                LocalSalesRate = requestModel.LocalSalesRate,
                BgtLocSalesCost = requestModel.BgtLocSalesCost,
                BgtLocSalesRate = requestModel.BgtLocSalesRate,
                IpcRdc = requestModel.IpcRdc,
                ValueAdded = requestModel.ValueAdded,
                RepairSvc = requestModel.RepairSvc,
                SparePart = requestModel.SparePart

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
                if (requestModel?.RptLgYimp != null)
                {
                    HandleChildUpdateItems_1(requestModel.RptLgYimp);
                }
            }

            return result;
        }

        private void HandleChildUpdateItems_1(IEnumerable<RptLgYimpModel> requestItemDetails)
        {
            /// loops through items to see if we need to update 

            foreach (var item in requestItemDetails)
            {
                if (item.TxnId.HasValue)
                {
                    // update    
                    var targetUpdateItem = base.FindById<RptLgYimp>(item.TxnId.Value);

                    if (targetUpdateItem != null)
                    {
                        targetUpdateItem.RptId = item.RptId;
                        targetUpdateItem.UsedRmcost = item.UsedRmcost;
                        targetUpdateItem.UsedRmwgt = item.UsedRmwgt;
                        targetUpdateItem.ReturnedWgt = item.ReturnedWgt; 

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
