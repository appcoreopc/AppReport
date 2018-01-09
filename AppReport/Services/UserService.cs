using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class UserService : AppDataObject
    {
        private PTSContext _context;

        public UserService(PTSContext context):base(context)
        {
            _context = context;
        }
        
        public IEnumerable<User> GetAll()
        {
            return _context.User;
        }

        public IEnumerable<User> GetAll(int skipAmount, int takeAmount)
        {
            return _context.User.Skip(skipAmount).Take(takeAmount);
        }
        
        public bool Delete(int id)
        {
            return Remove<User>(id);
        }

        public bool Save(User user)
        {
            return Save<User>(user, user.Id);
        }
    
    }
}
