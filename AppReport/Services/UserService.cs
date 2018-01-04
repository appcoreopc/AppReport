using AppReport.DataServices.PTSDataModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class UserService
    {
        private PTSContext _context;

        public UserService(PTSContext context)
        {
            _context = context;
        }
        
        public IEnumerable<User> GetAllUsers()
        {
            return _context.User;
        }

        public IEnumerable<User> GetAllUsers(int skipAmount, int takeAmount)
        {
            return _context.User.Skip(skipAmount).Take(takeAmount);
        }
    }
}
