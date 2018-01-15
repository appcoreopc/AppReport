using System;
using System.Collections.Generic;

namespace AppReport.PTSDataModel
{
    public partial class RptLgYbgt
    {
        public int TxnId { get; set; }
        public int? RptId { get; set; }
        public bool? IsLocal { get; set; }
        public int? Rmid { get; set; }
        public string FRmcatName { get; set; }
        public string FRmdesc { get; set; }
        public string FUomcode { get; set; }
        public string FTariffCode { get; set; }
        public string FCountryList { get; set; }
        public int? Qty { get; set; }
        public decimal? FCost { get; set; }
        public decimal? FDutyImpRate { get; set; }
        public decimal? FDutyImpCost { get; set; }
        public decimal? FGstrate { get; set; }
        public decimal? FGstcost { get; set; }
        public decimal? FTaxCost { get; set; }
    }
}
