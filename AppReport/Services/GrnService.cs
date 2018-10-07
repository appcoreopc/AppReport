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
                    SizeCount = d.SizeCount,

                    Height1 = d.Height1,
                    HeightUom1 = d.HeightUom1,
                    Width1 = d.Width1,
                    WidthUom1 = d.WidthUom1,
                    Thick1 = d.Thick1,
                    ThickUom1 = d.ThickUom1,
                    Wgt1 = d.Wgt1,
                    Roll1 = d.Roll1,
                    RollUom1 = d.RollUom1, 

                    Height2 = d.Height2,
                    HeightUom2 = d.HeightUom2,
                    Width2 = d.Width2,
                    WidthUom2 = d.WidthUom2,
                    Thick2 = d.Thick2,
                    ThickUom2 = d.ThickUom2,
                    Wgt2 = d.Wgt2,
                    Roll2 = d.Roll2,
                    RollUom2 = d.RollUom2,

                    Height3 = d.Height3,
                    HeightUom3 = d.HeightUom3,
                    Width3 = d.Width3,
                    WidthUom3 = d.WidthUom3,
                    Thick3 = d.Thick3,
                    ThickUom3 = d.ThickUom3,
                    Wgt3 = d.Wgt3,
                    Roll3 = d.Roll3,
                    RollUom3 = d.RollUom3,

                    Height4 = d.Height4,
                    HeightUom4 = d.HeightUom4,
                    Width4 = d.Width4,
                    WidthUom4 = d.WidthUom4,
                    Thick4 = d.Thick4,
                    ThickUom4 = d.ThickUom4,
                    Wgt4 = d.Wgt4,
                    Roll4 = d.Roll4,
                    RollUom4 = d.RollUom4,

                    Height5 = d.Height5,
                    HeightUom5 = d.HeightUom5,
                    Width5 = d.Width5,
                    WidthUom5 = d.WidthUom5,
                    Thick5 = d.Thick5,
                    ThickUom5 = d.ThickUom5,
                    Wgt5 = d.Wgt5,
                    Roll5 = d.Roll5,
                    RollUom5 = d.RollUom5,

                    Height6 = d.Height6,
                    HeightUom6 = d.HeightUom6,
                    Width6 = d.Width6,
                    WidthUom6 = d.WidthUom6,
                    Thick6 = d.Thick6,
                    ThickUom6 = d.ThickUom6,
                    Wgt6 = d.Wgt6,
                    Roll6 = d.Roll6,
                    RollUom6 = d.RollUom6,

                    Height7 = d.Height7,
                    HeightUom7 = d.HeightUom7,
                    Width7 = d.Width7,
                    WidthUom7 = d.WidthUom7,
                    Thick7 = d.Thick7,
                    ThickUom7 = d.ThickUom7,
                    Wgt7 = d.Wgt7,
                    Roll7 = d.Roll7,
                    RollUom7 = d.RollUom7,

                    Height8 = d.Height8,
                    HeightUom8 = d.HeightUom8,
                    Width8 = d.Width8,
                    WidthUom8 = d.WidthUom8,
                    Thick8 = d.Thick8,
                    ThickUom8 = d.ThickUom8,
                    Wgt8 = d.Wgt8,
                    Roll8 = d.Roll8,
                    RollUom8 = d.RollUom8,

                    Height9 = d.Height9,
                    HeightUom9 = d.HeightUom9,
                    Width9 = d.Width9,
                    WidthUom9 = d.WidthUom9,
                    Thick9 = d.Thick9,
                    ThickUom9 = d.ThickUom9,
                    Wgt9 = d.Wgt9,
                    Roll9 = d.Roll9,
                    RollUom9 = d.RollUom9,

                    Height10 = d.Height10,
                    HeightUom10 = d.HeightUom10,
                    Width10 = d.Width10,
                    WidthUom10 = d.WidthUom10,
                    Thick10 = d.Thick10,
                    ThickUom10 = d.ThickUom10,
                    Wgt10 = d.Wgt10,
                    Roll10 = d.Roll10,
                    RollUom10 = d.RollUom10,

                    Height11 = d.Height11,
                    HeightUom11 = d.HeightUom11,
                    Width11 = d.Width11,
                    WidthUom11 = d.WidthUom11,
                    Thick11 = d.Thick11,
                    ThickUom11 = d.ThickUom11,
                    Wgt11 = d.Wgt11,
                    Roll11 = d.Roll11,
                    RollUom11 = d.RollUom11,

                    Height12 = d.Height12,
                    HeightUom12 = d.HeightUom12,
                    Width12 = d.Width12,
                    WidthUom12 = d.WidthUom12,
                    Thick12 = d.Thick12,
                    ThickUom12 = d.ThickUom12,
                    Wgt12 = d.Wgt12,
                    Roll12 = d.Roll12,
                    RollUom12 = d.RollUom12,

                    Height13 = d.Height13,
                    HeightUom13 = d.HeightUom13,
                    Width13 = d.Width13,
                    WidthUom13 = d.WidthUom13,
                    Thick13 = d.Thick13,
                    ThickUom13 = d.ThickUom13,
                    Wgt13 = d.Wgt13,
                    Roll13 = d.Roll13,
                    RollUom13 = d.RollUom13,

                    Height14 = d.Height14,
                    HeightUom14 = d.HeightUom14,
                    Width14 = d.Width14,
                    WidthUom14 = d.WidthUom14,
                    Thick14 = d.Thick14,
                    ThickUom14 = d.ThickUom14,
                    Wgt14 = d.Wgt14,
                    Roll14 = d.Roll14,
                    RollUom14 = d.RollUom14,

                    Height15 = d.Height15,
                    HeightUom15 = d.HeightUom15,
                    Width15 = d.Width15,
                    WidthUom15 = d.WidthUom15,
                    Thick15 = d.Thick15,
                    ThickUom15 = d.ThickUom15,
                    Wgt15 = d.Wgt15,
                    Roll15 = d.Roll15,
                    RollUom15 = d.RollUom15,

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
                    data.SizeCount = d.SizeCount;

                    data.Height1 = d.Height1;
                    data.HeightUom1 = d.HeightUom1;
                    data.Width1 = d.Width1;
                    data.WidthUom1 = d.WidthUom1;
                    data.Thick1 = d.Thick1;
                    data.ThickUom1 = d.ThickUom1;
                    data.Wgt1 = d.Wgt1;
                    data.Roll1 = d.Roll1;
                    data.RollUom1 = d.RollUom1;

                    data.Height2 = d.Height2;
                    data.HeightUom2 = d.HeightUom2;
                    data.Width2 = d.Width2;
                    data.WidthUom2 = d.WidthUom2;
                    data.Thick2 = d.Thick2;
                    data.ThickUom2 = d.ThickUom2;
                    data.Wgt2 = d.Wgt2;
                    data.Roll2 = d.Roll2;
                    data.RollUom2 = d.RollUom2;

                    data.Height3 = d.Height3;
                    data.HeightUom3 = d.HeightUom3;
                    data.Width3 = d.Width3;
                    data.WidthUom3 = d.WidthUom3;
                    data.Thick3 = d.Thick3;
                    data.ThickUom3 = d.ThickUom3;
                    data.Wgt3 = d.Wgt3;
                    data.Roll3 = d.Roll3;
                    data.RollUom3 = d.RollUom3;

                    data.Height4 = d.Height4;
                    data.HeightUom4 = d.HeightUom4;
                    data.Width4 = d.Width4;
                    data.WidthUom4 = d.WidthUom4;
                    data.Thick4 = d.Thick4;
                    data.ThickUom4 = d.ThickUom4;
                    data.Wgt4 = d.Wgt4;
                    data.Roll4 = d.Roll4;
                    data.RollUom4 = d.RollUom4;

                    data.Height5 = d.Height5;
                    data.HeightUom5 = d.HeightUom5;
                    data.Width5 = d.Width5;
                    data.WidthUom5 = d.WidthUom5;
                    data.Thick5 = d.Thick5;
                    data.ThickUom5 = d.ThickUom5;
                    data.Wgt5 = d.Wgt5;
                    data.Roll5 = d.Roll5;
                    data.RollUom5 = d.RollUom5;

                    data.Height6 = d.Height6;
                    data.HeightUom6 = d.HeightUom6;
                    data.Width6 = d.Width6;
                    data.WidthUom6 = d.WidthUom6;
                    data.Thick6 = d.Thick6;
                    data.ThickUom6 = d.ThickUom6;
                    data.Wgt6 = d.Wgt6;
                    data.Roll6 = d.Roll6;
                    data.RollUom6 = d.RollUom6;

                    data.Height7 = d.Height7;
                    data.HeightUom7 = d.HeightUom7;
                    data.Width7 = d.Width7;
                    data.WidthUom7 = d.WidthUom7;
                    data.Thick7 = d.Thick7;
                    data.ThickUom7 = d.ThickUom7;
                    data.Wgt7 = d.Wgt7;
                    data.Roll7 = d.Roll7;
                    data.RollUom7 = d.RollUom7;

                    data.Height8 = d.Height8;
                    data.HeightUom8 = d.HeightUom8;
                    data.Width8 = d.Width8;
                    data.WidthUom8 = d.WidthUom8;
                    data.Thick8 = d.Thick8;
                    data.ThickUom8 = d.ThickUom8;
                    data.Wgt8 = d.Wgt8;
                    data.Roll8 = d.Roll8;
                    data.RollUom8 = d.RollUom8;

                    data.Height9 = d.Height9;
                    data.HeightUom9 = d.HeightUom9;
                    data.Width9 = d.Width9;
                    data.WidthUom9 = d.WidthUom9;
                    data.Thick9 = d.Thick9;
                    data.ThickUom9 = d.ThickUom9;
                    data.Wgt9 = d.Wgt9;
                    data.Roll9 = d.Roll9;
                    data.RollUom9 = d.RollUom9;

                    data.Height10 = d.Height10;
                    data.HeightUom10 = d.HeightUom10;
                    data.Width10 = d.Width10;
                    data.WidthUom10 = d.WidthUom10;
                    data.Thick10 = d.Thick10;
                    data.ThickUom10 = d.ThickUom10;
                    data.Wgt10 = d.Wgt10;
                    data.Roll10 = d.Roll10;
                    data.RollUom10 = d.RollUom10;

                    data.Height11 = d.Height11;
                    data.HeightUom11 = d.HeightUom11;
                    data.Width11 = d.Width11;
                    data.WidthUom11 = d.WidthUom11;
                    data.Thick11 = d.Thick11;
                    data.ThickUom11 = d.ThickUom11;
                    data.Wgt11 = d.Wgt11;
                    data.Roll11 = d.Roll11;
                    data.RollUom11 = d.RollUom11;

                    data.Height12 = d.Height12;
                    data.HeightUom12 = d.HeightUom12;
                    data.Width12 = d.Width12;
                    data.WidthUom12 = d.WidthUom12;
                    data.Thick12 = d.Thick12;
                    data.ThickUom12 = d.ThickUom12;
                    data.Wgt12 = d.Wgt12;
                    data.Roll12 = d.Roll12;
                    data.RollUom12 = d.RollUom12;

                    data.Height13 = d.Height13;
                    data.HeightUom13 = d.HeightUom13;
                    data.Width13 = d.Width13;
                    data.WidthUom13 = d.WidthUom13;
                    data.Thick13 = d.Thick13;
                    data.ThickUom13 = d.ThickUom13;
                    data.Wgt13 = d.Wgt13;
                    data.Roll13 = d.Roll13;
                    data.RollUom13 = d.RollUom13;

                    data.Height14 = d.Height14;
                    data.HeightUom14 = d.HeightUom14;
                    data.Width14 = d.Width14;
                    data.WidthUom14 = d.WidthUom14;
                    data.Thick14 = d.Thick14;
                    data.ThickUom14 = d.ThickUom14;
                    data.Wgt14 = d.Wgt14;
                    data.Roll14 = d.Roll14;
                    data.RollUom14 = d.RollUom14;

                    data.Height15 = d.Height15;
                    data.HeightUom15 = d.HeightUom15;
                    data.Width15 = d.Width15;
                    data.WidthUom15 = d.WidthUom15;
                    data.Thick15 = d.Thick15;
                    data.ThickUom15 = d.ThickUom15;
                    data.Wgt15 = d.Wgt15;
                    data.Roll15 = d.Roll15;
                    data.RollUom15 = d.RollUom15;

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
