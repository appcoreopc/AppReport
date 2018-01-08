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
        
        public IEnumerable<Users> GetAll()
        {
            return _context.Users;
        }

        public IEnumerable<Users> GetAllUsers(int skipAmount, int takeAmount)
        {
            return _context.Users.Skip(skipAmount).Take(takeAmount);
        }
        
        public bool Delete(int id)
        {
            return Remove<Users>(id);
        }

        public bool Save(Users user)
        {
            return Save<Users>(user, user.UserId);
        }
    
    }
}
