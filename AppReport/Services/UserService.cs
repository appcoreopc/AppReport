using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
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

        public IEnumerable<Users> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Users.Skip(skipAmount).Take(takeAmount);
        }
        
        public bool Delete(int id)
        {
            return Remove<Users>(id);
        }

        public bool Save(UserRequestModel requestUser)
        {
            if (!requestUser.UserId.HasValue)
            {
                var user = new Users()
                {                    
                    Username = requestUser.Username,
                    Password = requestUser.Password,
                    UserTypeId = requestUser.UserTypeId
                };
                return Save<Users>(user, null);
            }
            else
            {
                var user = base.FindById<Users>(requestUser.UserId.Value);
                if (user != null)
                {
                   
                    user.Username = requestUser.Username;
                    user.Password = requestUser.Password;
                    user.UserTypeId = requestUser.UserTypeId;
                }
                return Save<Users>(user, user.UserId);
            }                
        }
    
    }
}
