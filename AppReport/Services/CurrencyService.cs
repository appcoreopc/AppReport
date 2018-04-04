using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class CurrencyService : AppDataObject
    {
        private PTSContext _context;

        public CurrencyService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Currency> GetAll()
        {
            return _context.Currency;
        }

        public IEnumerable<Currency> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Currency.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<Currency>(deleteItems);
        }

        public bool Save(Currency d)
        {
            return Save<Currency>(d, d.CurrencyId);
        }

        public bool Save(int id)
        {
            var d = FindById<Currency>(id);
            if (d != null)
                return Save(d);
            else
                return false;
        }
    }
}
