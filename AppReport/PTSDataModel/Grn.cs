using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class Grn
    {
        public long Grnid { get; set; }
        public DateTime? Grndate { get; set; }
        public string Lotno { get; set; }
        public int? SupplierId { get; set; }
        public int? Rmid { get; set; }
        public decimal? Height { get; set; }
        public int? HeightUom { get; set; }
        public decimal? Width { get; set; }
        public int WidthUom { get; set; }
        public decimal? Thick { get; set; }
        public int? ThickUom { get; set; }
        public decimal? Wgt { get; set; }
        public int? Roll { get; set; }
        public int? RollUom { get; set; }
        public DateTime? Dom { get; set; }
        public string Dono { get; set; }
        public int? StncustomId { get; set; }
        public int? ComponentId { get; set; }
        public decimal? Kaswgt { get; set; }
        public decimal? DutyImp { get; set; }
        public decimal? Gst { get; set; }
        public decimal? Cif { get; set; }
        public DateTime? CustomDate { get; set; }
        public string CustomNo { get; set; }
        public string InvoiceNo { get; set; }
        public int? CurrencyId { get; set; }
        public decimal? AmountCurrency { get; set; }
        public decimal? ExRate { get; set; }
        public decimal? Amount { get; set; }
        public string Pono { get; set; }
        public string Otdlate { get; set; }
        public string FwdInvNo { get; set; }
        public decimal? Amt { get; set; }
        public string Forwarder { get; set; }
        public string DocRefNo { get; set; }
        public string Vcarno { get; set; }
        public decimal? ImpFreight { get; set; }
        public string CurrencyAdj { get; set; }
        public decimal? TermChrg { get; set; }
        public decimal? AprtTxFee { get; set; }
        public decimal? Delivery { get; set; }
        public decimal? HandFwd { get; set; }
        public decimal? CustomExamFee { get; set; }
        public decimal? CollectFee { get; set; }
        public string CargoPrmt { get; set; }
        public decimal? DocFee { get; set; }
        public decimal? BreakBulk { get; set; }
        public decimal? Edifee { get; set; }
        public decimal? FreightGst { get; set; }
        public decimal? TotalFreightCost { get; set; }
        public decimal? TotalFreightRmcost { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
    }
}
