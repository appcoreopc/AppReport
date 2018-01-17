using AppReport.DataServices.PTSDataModel;
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

        public bool Save(Rmcat materialCategory)
        {
            return base.Save<Rmcat>(materialCategory, materialCategory.RmcatId);
        }

        public bool Delete(int materialCategoryId)
        {
            return Remove<Rmcat>(materialCategoryId);
        }
    }
}
