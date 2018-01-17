using Microsoft.EntityFrameworkCore;

namespace AppReport.DataServices.PTSDataModel
{
    public partial class PTSContext : DbContext
    {
        public PTSContext(DbContextOptions<PTSContext> options) : base(options)
        {

        }
    }
}
