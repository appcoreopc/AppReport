using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class SupplierService : AppDataObject
    {
        private PTSContext _context;

        public SupplierService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Supplier> GetAll()
        {
            return _context.Supplier;
        }

        public IEnumerable<Supplier> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Supplier.Skip(skipAmount).Take(takeAmount);
        }

        public bool Save(SupplierRequestModel supplierRequest)
        {
            if (!supplierRequest.SupplierId.HasValue)
            {
                var supplier = new Supplier()
                {                 
                    SupplierName = supplierRequest.SupplierName, 
                    SupplierCode = supplierRequest.SupplierCode,
                    PhoneNo1 = supplierRequest.PhoneNo1,
                    PhoneNo2 = supplierRequest.PhoneNo2,
                    FaxNo = supplierRequest.FaxNo,
                    SupplierAd1 = supplierRequest.SupplierAd1,
                    SupplierAd2 = supplierRequest.SupplierAd2,
                    SupplierAd3 = supplierRequest.SupplierAd3,
                    BankAccNo = supplierRequest.BankAccNo,
                    BankName = supplierRequest.BankName,
                    BankAddress = supplierRequest.BankAddress,
                    Swift = supplierRequest.Swift,
                    CurrencyId = supplierRequest.CurrencyId,
                    PaymentTerms = supplierRequest.PaymentTerms,
                    Forwarder = supplierRequest.Forwarder,
                    DeliveryTerms = supplierRequest.DeliveryTerms,
                    Gstno = supplierRequest.Gstno,
                    FactoryStatusId = supplierRequest.FactoryStatusId, 
                    CreatedByUserId = supplierRequest.CreatedByUserId,
                    EditedByUserId = supplierRequest.EditedByUserId
                };
                return base.Save<Supplier>(supplier, null);
            }
            else
            {
                var supplier = FindById<Supplier>(supplierRequest.SupplierId.Value);
                if (supplier != null)
                {
                    supplier.SupplierId = supplierRequest.SupplierId.Value;
                    supplier.SupplierName = supplierRequest.SupplierName;
                    supplier.SupplierCode = supplierRequest.SupplierCode;
                    supplier.PhoneNo1 = supplierRequest.PhoneNo1;
                    supplier.PhoneNo2 = supplierRequest.PhoneNo2;
                    supplier.FaxNo = supplierRequest.FaxNo;
                    supplier.SupplierAd1 = supplierRequest.SupplierAd1;
                    supplier.SupplierAd2 = supplierRequest.SupplierAd2;
                    supplier.SupplierAd3 = supplierRequest.SupplierAd3;
                    supplier.BankAccNo = supplierRequest.BankAccNo;
                    supplier.BankName = supplierRequest.BankName;
                    supplier.BankAddress = supplierRequest.BankAddress;
                    supplier.Swift = supplierRequest.Swift;
                    supplier.CurrencyId = supplierRequest.CurrencyId;
                    supplier.PaymentTerms = supplierRequest.PaymentTerms;
                    supplier.Forwarder = supplierRequest.Forwarder;
                    supplier.DeliveryTerms = supplierRequest.DeliveryTerms;
                    supplier.Gstno = supplierRequest.Gstno;
                    supplier.FactoryStatusId = supplierRequest.FactoryStatusId; 
                    supplier.CreatedByUserId = supplierRequest.CreatedByUserId;
                    supplier.EditedByUserId = supplierRequest.EditedByUserId;
                    return base.Save<Supplier>(supplier, supplier.SupplierId);
                }
            }
            return false;
        }

        public bool Delete(int supplierId)
        {
            return Remove<Supplier>(supplierId);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Supplier>(deleteItems);
        }

    }

}
