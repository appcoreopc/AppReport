using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class MaterialCategoryService : AppDataObject
    {
        private PTSContext _context;

        public MaterialCategoryService(PTSContext context):base(context)
        {
            _context = context;
        }
        public IEnumerable<Rmaterial> GetAll()
        {
            return _context.Rmaterial;
        }

        public IEnumerable<Rmaterial> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Rmaterial.Skip(skipAmount).Take(takeAmount);
        }

        public bool Save(MaterialCategoryRequestModel materialCategory)
        {
            if (!materialCategory.RMCatId.HasValue)
            {
                var rmcat = new Rmcat()
                {
                    RmcatId = materialCategory.RMCatId.Value,
                    RmcatName = materialCategory.RMCatName,
                    CreatedByUserId = materialCategory.CreatedByUserId,
                    EditedByUserId = materialCategory.EditedByUserId
                };
                return base.Save<Rmcat>(rmcat, null);
            }
            else
            {
                var rmcat = FindById<Rmcat>(materialCategory.RMCatId.Value);
                
                if (rmcat != null)
                {
                    rmcat.RmcatId = materialCategory.RMCatId.Value;
                    rmcat.RmcatName = materialCategory.RMCatName;
                    rmcat.CreatedByUserId = materialCategory.CreatedByUserId;
                    rmcat.EditedByUserId = materialCategory.EditedByUserId;
                    return base.Save<Rmcat>(rmcat, rmcat.RmcatId);
                }                
            }

            return false;
            
        }

        public bool Delete(int materialCategoryId)
        {
            return Remove<Rmcat>(materialCategoryId);
        }
    }
}
