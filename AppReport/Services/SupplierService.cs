using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class SupplierService : AppDataObject
    {
        private PTSContext _context;

        public SupplierService(PTSContext context): base(context)
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
                    SupplierId = supplierRequest.SupplierId.Value,
                    SupplierName = supplierRequest.SupplierName,
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
        

    }

}
