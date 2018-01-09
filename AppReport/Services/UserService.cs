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

<<<<<<< HEAD
        public IEnumerable<Users> GetAllUsers(int skipAmount, int takeAmount)
=======
        public IEnumerable<User> GetAll(int skipAmount, int takeAmount)
>>>>>>> bc6c9e18dc8e110afaeabb34d0e32ad56ad319c5
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
