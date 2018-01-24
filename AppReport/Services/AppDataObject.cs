using AppReport.DataServices.PTSDataModel;
using System.Collections.Generic;

namespace AppReport.Services
{
    public class AppDataObject
    {
        private PTSContext _context;

        public AppDataObject(PTSContext context)
        {
            _context = context;
        }

        public bool Remove<T>(params int[] ids) where T : class
        {
            foreach (var item in ids)
            {
                var target = _context.Find<T>(item);
                if (target != null)
                    _context.Remove(target);
            }
            var noOfObjectChanged = _context.SaveChanges();
            return noOfObjectChanged > 0 ? true : false;
        }
        
        public bool Save<T>(T target, int? uniqueId) where T : class
        {
            if (!uniqueId.HasValue)
                return Add(target);
            else
            {
                var updateTarget = _context.Find<T>(uniqueId);
                _context.Update(target);
                var noOfObjectChanged = _context.SaveChanges();
                return noOfObjectChanged > 0 ? true : false;
            }
        }


        public bool Add<T>(T target) where T : class
        {
            _context.Add<T>(target);
            var noOfObjectChanged = _context.SaveChanges();
            return noOfObjectChanged > 0 ? true : false;
        }

        public T FindById<T>(int id) where T : class
        {
            return _context.Find<T>(id);
        }

    }
}
