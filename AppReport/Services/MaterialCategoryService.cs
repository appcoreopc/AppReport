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
        public IEnumerable<Rmcat> GetAll()
        {
            return _context.Rmcat;
        }

        public IEnumerable<Rmcat> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Rmcat.Skip(skipAmount).Take(takeAmount);
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
