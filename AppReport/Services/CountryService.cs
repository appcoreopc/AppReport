using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class CountryService : AppDataObject
    {
        private PTSContext _context;

        public CountryService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Country> GetAll()
        {
            return _context.Country;
        }

        public IEnumerable<Country> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Country.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<User>(id);
        }

        public bool Save(CountryRequestModel requestUser)
        {
            return true;
        }


    }
}
