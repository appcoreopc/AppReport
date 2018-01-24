using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class ComponentService : AppDataObject
    {
        private PTSContext _context;

        public ComponentService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<Component> GetAll()
        {
            return _context.Component;
        }

        public IEnumerable<Component> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Component.Skip(skipAmount).Take(takeAmount);
        }

        public bool Delete(int id)
        {
            return Remove<Component>(id);
        }
        
        public bool Save(Component d)
        {
            return base.Save<Component>(d, d.ComponentId);
        }

        public bool Save(int id)
        {
            var d = FindById<Component>(id);
            if (d != null)
                return Save(d);
            else
                return false;
        }
    }
}
