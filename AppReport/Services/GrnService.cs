using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class GrnService : AppDataObject
    {
        private PTSContext _context;

        public GrnService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Grn> GetAll()
        {
            return _context.Grn;
        }

        public IEnumerable<Grn> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Grn.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Grn>(id);
        }
         

        public bool Save(GrnRequestModel d)
        {
            if (d.Grnid <= 0)
            { 
                var data = new Grn()
                {
                    Grnid = d.Grnid,
                    Grndate = d.Grndate,
                    Lotno = d.Lotno,
                    SupplierId = d.SupplierId,
                    Rmid = d.Rmid,
                    Height = d.Height,
                    HeightUom = d.HeightUom,
                    Width = d.Width,
                    WidthUom = d.WidthUom,
                    Thick = d.Thick,
                    ThickUom = d.ThickUom,
                    Wgt = d.Wgt,
                    Roll = d.Roll,
                    RollUom = d.RollUom,
                    Dom = d.Dom,
                    Dono = d.Dono,
                    StncustomId = d.StncustomId,
                    ComponentId = d.ComponentId,
                    Kaswgt = d.Kaswgt,
                    DutyImp = d.DutyImp,
                    Gst = d.Gst,
                    Cif = d.Cif,
                    CustomDate = d.CustomDate,
                    CustomNo = d.CustomNo,
                    InvoiceNo = d.InvoiceNo,
                    CurrencyId = d.CurrencyId,
                    AmountCurrency = d.AmountCurrency,
                    ExRate = d.ExRate,
                    Amount = d.AmountCurrency * d.ExRate,
                    Pono = d.Pono,
                    Otdlate = d.Otdlate,
                    FwdInvNo = d.FwdInvNo,
                    Amt = d.Amt,
                    Forwarder = d.Forwarder,
                    DocRefNo = d.DocRefNo,
                    Vcarno = d.Vcarno,
                    ImpFreight = d.ImpFreight,
                    CurrencyAdj = d.CurrencyAdj,
                    TermChrg = d.TermChrg,
                    AprtTxFee = d.AprtTxFee,
                    Delivery = d.Delivery,
                    HandFwd = d.HandFwd,
                    CustomExamFee = d.CustomExamFee,
                    CollectFee = d.CollectFee,
                    CargoPrmt = d.CargoPrmt,
                    DocFee = d.DocFee,
                    BreakBulk = d.BreakBulk,
                    Edifee = d.Edifee,
                    FreightGst = d.FreightGst,
                    TotalFreightCost = d.ImpFreight + d.TermChrg + d.AprtTxFee + d.Delivery + d.HandFwd + d.CustomExamFee + d.CollectFee + d.DocFee + d.BreakBulk + d.Edifee + d.FreightGst,
                    DutyExcise = d.DutyExcise
                };
                data.TotalFreightRmcost = data.TotalFreightCost + data.Amount;

                return base.Save<Grn>(data, null);
            }
            else
            {
                var data = base.FindById<Grn>(Convert.ToInt32(d.Grnid));
                if (data != null)
                {
                    data.Grndate = d.Grndate;
                    data.Lotno = d.Lotno;
                    data.SupplierId = d.SupplierId;
                    data.Rmid = d.Rmid;
                    data.Height = d.Height;
                    data.HeightUom = d.HeightUom;
                    data.Width = d.Width;
                    data.WidthUom = d.WidthUom;
                    data.Thick = d.Thick;
                    data.ThickUom = d.ThickUom;
                    data.Wgt = d.Wgt;
                    data.Roll = d.Roll;
                    data.RollUom = d.RollUom;
                    data.Dom = d.Dom;
                    data.Dono = d.Dono;
                    data.StncustomId = d.StncustomId;
                    data.ComponentId = d.ComponentId;
                    data.Kaswgt = d.Kaswgt;
                    data.DutyImp = d.DutyImp;
                    data.Gst = d.Gst;
                    data.Cif = d.Cif;
                    data.CustomDate = d.CustomDate;
                    data.CustomNo = d.CustomNo;
                    data.InvoiceNo = d.InvoiceNo;
                    data.CurrencyId = d.CurrencyId;
                    data.AmountCurrency = d.AmountCurrency;
                    data.ExRate = d.ExRate;
                    data.Amount = d.AmountCurrency * d.ExRate;
                    data.Pono = d.Pono;
                    data.Otdlate = d.Otdlate;
                    data.FwdInvNo = d.FwdInvNo;
                    data.Amt = d.Amt;
                    data.Forwarder = d.Forwarder;
                    data.DocRefNo = d.DocRefNo;
                    data.Vcarno = d.Vcarno;
                    data.ImpFreight = d.ImpFreight;
                    data.CurrencyAdj = d.CurrencyAdj;
                    data.TermChrg = d.TermChrg;
                    data.AprtTxFee = d.AprtTxFee;
                    data.Delivery = d.Delivery;
                    data.HandFwd = d.HandFwd;
                    data.CustomExamFee = d.CustomExamFee;
                    data.CollectFee = d.CollectFee;
                    data.CargoPrmt = d.CargoPrmt;
                    data.DocFee = d.DocFee;
                    data.BreakBulk = d.BreakBulk;
                    data.Edifee = d.Edifee;
                    data.FreightGst = d.FreightGst;
                    data.TotalFreightCost = d.ImpFreight + d.TermChrg + d.AprtTxFee + d.Delivery + d.HandFwd + d.CustomExamFee + d.CollectFee + d.DocFee + d.BreakBulk + d.Edifee + d.FreightGst;
                    data.TotalFreightRmcost = data.TotalFreightCost + data.Amount;
                    data.DutyExcise = d.DutyExcise;
                }

                return base.Save<Grn>(data, Convert.ToInt32(d.Grnid));

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
