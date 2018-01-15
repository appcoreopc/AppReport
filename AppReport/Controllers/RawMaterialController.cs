using AppReport.DataServices.PTSDataModel;
using AppReport.RequestModel;
using AppReport.Services;
using AppReport.Util;
using Microsoft.AspNetCore.Mvc;


namespace AppReport.Controllers
{
    public class RawMaterialController : Controller
    {
        private PTSContext _ptsContext;

        public RawMaterialController(PTSContext ptsContext)
        {
            _ptsContext = ptsContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var suppliers = new RawMaterialService(_ptsContext).GetAll();
            return new JsonResult(suppliers);
        }

        [HttpGet]
        public IActionResult Get(int start, int size)
        {
            var suppliers = new RawMaterialService(_ptsContext).GetAll(start, size);
            return new JsonResult(suppliers);
        }

        [HttpPost]
        public IActionResult Save([FromBody] RawMaterialRequestModel materialCategory)
        {
            if (materialCategory != null && !string.IsNullOrEmpty(materialCategory.Rmcode))
            {
                var supplier = new Rmaterial()
                {
                    RmcatId = materialCategory.RmcatId.HasValue ? materialCategory.RmcatId.Value : 0,
                    Rmcode = materialCategory.Rmcode,
                    Rmdesc = materialCategory.Rmdesc,
                    CountryList = materialCategory.CountryList,
                    CreatedDt = materialCategory.CreatedDt,
                    DutyImpRate = materialCategory.DutyImpRate,
                    EditedDt = materialCategory.EditedDt,
                    Gstrate = materialCategory.Gstrate,
                    Rmid = materialCategory.Rmid,
                    TariffCode = materialCategory.TariffCode,
                    Uomid = materialCategory.Uomid,
                    CreatedByUserId = materialCategory.CreatedByUserId,
                    EditedByUserId = materialCategory.EditedByUserId
                };

                var result = new RawMaterialService(_ptsContext).Save<Rmaterial>(supplier, supplier.RmcatId);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
        }

        [HttpDelete]
        public IActionResult Delete(RawMaterialRequestModel requestData)
        {
            if (requestData.RmcatId.HasValue)
            {
                var result = new RawMaterialService(_ptsContext).Delete(requestData.RmcatId.Value);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            else
                return new BadRequestResult();
        }
    }
}