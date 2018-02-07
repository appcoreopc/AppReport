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
            if (!requestModel.RptId.HasValue)
            {
                var newData = new RptSk()
                {
                    RefNo = requestModel.RefNo,
                    RptDate = requestModel.RptDate,

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

                if (base.Save<RptSk>(newData, null))
                {
                    if (requestModel?.RptSkMimp != null)
                    {
                        foreach (var item in requestModel.RptSkMimp)
                        {
                            var newEntryItem = new RptSkMimp
                            {
                                FCustomNo = item.FCustomNo,
                                FGstcost = item.FGstcost,
                                FImpCost = item.FImpCost,
                                FImpDate = item.FImpDate,
                                FImpWgt = item.FImpWgt,
                                Note = item.Note,
                                RptId = newData.RptId,
                                TxnId = item.TxnId.HasValue ? item.TxnId.Value : 0
                            };
                            Save<RptSkMimp>(newEntryItem, null);
                        }                       
                    }
                }

                return base.Save<RptSk>(newData, null);
            }
            else
            {
                var data = base.FindById<RptSk>(requestModel.RptId.Value);
                if (data != null)
                {
                }

                return base.Save<RptSk>(data, requestModel.RptId);

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
