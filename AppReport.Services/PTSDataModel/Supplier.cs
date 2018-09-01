using System;
using System.Collections.Generic;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class Supplier
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public int? CreatedByUserId { get; set; }
        public DateTime? CreatedDt { get; set; }
        public int? EditedByUserId { get; set; }
        public DateTime? EditedDt { get; set; }
        public string SupplierCode { get; set; }
        public string PhoneNo1 { get; set; }
        public string PhoneNo2 { get; set; }
        public string FaxNo { get; set; }
        public string SupplierAd1 { get; set; }
        public string SupplierAd2 { get; set; }
        public string SupplierAd3 { get; set; }
        public string BankAccNo { get; set; }
        public string BankName { get; set; }
        public string BankAddress { get; set; }
        public string Swift { get; set; }
        public int? CurrencyId { get; set; }
        public string PaymentTerms { get; set; }
        public string Forwarder { get; set; }
        public string DeliveryTerms { get; set; }
        public string Gstno { get; set; }
        public int? FactoryStatusId { get; set; }
    }
}
