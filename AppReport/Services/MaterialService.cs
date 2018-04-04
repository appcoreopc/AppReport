using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class MaterialService : AppDataObject
    {
        private PTSContext _context;

        public MaterialService(PTSContext context):base(context)
        {
            _context = context;
        }
        
        public IEnumerable<Rmaterial> GetAll()
        {
            return _context.Rmaterial;
        }

        public IEnumerable<Rmaterial> GetAllUsers(int skipAmount, int takeAmount)
        {
            return _context.Rmaterial.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Rmaterial>(id);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Rmaterial>(deleteItems);
        }

        public bool Save(Rmaterial user)
        {
            return Save<Rmaterial>(user, user.Rmid);
        }


    }


}
