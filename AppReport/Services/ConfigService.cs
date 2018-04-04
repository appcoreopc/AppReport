using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AppReport.Services
{
    public class ConfigService : AppDataObject
    {
        private PTSContext _context;

        public ConfigService(PTSContext context) : base(context)
        {
            _context = context;
        }

        public IEnumerable<DataServices.PTSDataModel.Config> GetAll()
        {
            return _context.Config;
        }     

        public IEnumerable<DataServices.PTSDataModel.Config> GetAll(int skipAmount, int takeAmount)
        {
            return _context.Config.Skip(skipAmount).Take(takeAmount);
        }

        public bool Save(ConfigRequestModel configRequest)
        {
            if (configRequest.ConfigId == 0)
            {
                var cfg = new DataServices.PTSDataModel.Config()
                {                 
                    ConfigKey = configRequest.ConfigKey,
                    ConfigData = configRequest.ConfigData 
                };
                return base.Save<DataServices.PTSDataModel.Config>(cfg, null);
            }
            else
            {
                var cfg = FindById<DataServices.PTSDataModel.Config>(configRequest.ConfigId);
                if (cfg != null)
                {
                    cfg.ConfigId = configRequest.ConfigId;
                    cfg.ConfigKey = configRequest.ConfigKey;
                    cfg.ConfigData = configRequest.ConfigData; 
                    return base.Save<DataServices.PTSDataModel.Config>(cfg, cfg.ConfigId);
                }
            }
            return false;
        }

        public bool Delete(string deleteItems)
        {
            return base.DeleteItems<DataServices.PTSDataModel.Config>(deleteItems);
        }

        public bool Delete(int configId)
        {
            return Remove<DataServices.PTSDataModel.Config>(configId);
        }
    }

}
