using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.pdf;
using AppReport.Services;
using AppReport.DataServices.PTSDataModel;
using Microsoft.Extensions.Options;
using AppReport.Config;
using System.Collections.Generic;
using System.Linq;
using AppReport.Util;
using AppReport.RequestModel;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace AppReport.Controllers
{
    public partial class RptSkController : Controller
    { 
        private PTSContext _ptsContext; 
        private IHostingEnvironment _env; 
        const string _rptFileName = "PTS Skim Khas";
        string _rptFileDT;
        
        public RptSkController(IHostingEnvironment env, PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _env = env;
            _ptsContext = ptsContext; 
        }
        
        [HttpGet]
        public List<string> GetById(int id)
        {
            var rptSk = new RptSkService(_ptsContext).Get(id);
            var rptSkMimp = new RptSkMimpService(_ptsContext).Get(id);

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");

            var myList = new List<string>(); 

            // Convert to array
            var myArray = myList.ToArray();
            if (rptSk != null)
            {
                string rpt = PrintLetter(rptSk, true);
                myList.Add(rpt);
                rpt = PrintReport(rptSk, rptSkMimp);
                myList.Add(rpt);
            }

            return myList;

            //return View();
        }
         

        [HttpGet]
        public FileResult Download(string fileName)
        { 
            string filepath = Path.Combine(AppConstant.ReportFilePath, fileName); 
            byte[] fileBytes = System.IO.File.ReadAllBytes(filepath);
            return File(fileBytes, "application/pdf", fileName);
        }

        [HttpGet]
        public FileResult DownloadLetter(int id, [FromQuery] bool isHeader)
        {
            var rptSk = new RptSkService(_ptsContext).Get(id);
            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptSk != null)
            {
                 rpt = PrintLetter(rptSk, isHeader); 
            } 
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadReport(int id)
        {
            var rptSk = new RptSkService(_ptsContext).Get(id);
            var rptSkMimp = new RptSkMimpService(_ptsContext).Get(id);
            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptSk != null)
            {
                rpt = PrintReport(rptSk, rptSkMimp);
            }
            return Download(rpt);
        }



        [HttpGet]
        public IActionResult Index()
        {        
            var reportItem = new RptSkService(_ptsContext).GetAllRptDetails();
            return new JsonResult(reportItem);
        }

        [HttpPost]
        public IActionResult Save([FromBody] RptSkRequestModel request)
        {
            if (this.ModelState.IsValid)
            {
                if (request != null)
                {
                    var result = new RptSkService(_ptsContext).Save(request);
                    return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
                }

            }
            return new BadRequestResult();
        }


        private string PrintLetter(RptSk rptSk, bool isHeader)
        {
            string rptPath = string.Empty;
            string rptName = _rptFileName + "_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            {
                string strRDate = string.Empty;
                DateTime dtReport = rptSk.RptDate.HasValue ? (DateTime)rptSk.RptDate : DateTime.Today;
                DateTime dtletter = rptSk.LetterDate.HasValue ? (DateTime)rptSk.LetterDate : DateTime.Today;
                string strLDate = dtletter.Day.ToString("D" + 2) + "hb " + ResourceHelper.Get(dtletter.ToString("MMMM")) + " " + dtletter.Year.ToString();

                var marginTop = 40f;
                if (!isHeader)
                {
                    marginTop = 120f;
                }

                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, marginTop, 20f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                // writer.PageEvent = new PDFFooter();
                doc.Open();
                // doc.Add(new Paragraph("3 & 5, Lorong Sungai Lokan 3/1, Taman Perindustrian Southtech"));
                try
                {
                    var curTop = doc.Top;
                    var webRoot = _env.WebRootPath;
                    BaseFont bFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);

                    Font f1 = new Font(bFont, 22f, Font.BOLD, BaseColor.Black);
                    Font f2 = new Font(bFont, 9f);
                    Font f3 = new Font(bFont, 8f);
                    Font f4 = new Font(bFont, 10f);
                    Font f5 = new Font(bFont, 10f, Font.BOLD | Font.UNDERLINE, BaseColor.Black);
                    Font f6 = new Font(bFont, 18f, Font.BOLD, BaseColor.Black);
                    Font f7 = new Font(bFont, 8f, Font.ITALIC, BaseColor.Black);
                    Font f8 = new Font(bFont, 10f, Font.BOLD, BaseColor.Black);

                    PdfPTable t1b = new PdfPTable(2);
                    t1b.SetWidths(new float[] { 12f, 2f });

                    PdfPCell cell = new PdfPCell(new Phrase(rptSk.FCoName.ToUpper(), f1));
                    cell.Padding = 0;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.FCoRegNo, f3));
                    cell.Padding = 0;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.VerticalAlignment = PdfPCell.ALIGN_BOTTOM;
                    cell.PaddingTop = 5;
                    cell.PaddingLeft = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    if (isHeader)
                    {
                        PdfPTable t1 = new PdfPTable(2);
                        t1.SetWidths(new float[] { 1f, 3f });

                        string imgLogoPath = webRoot + "\\img\\" + rptSk.FCoLogo;
                        Image imgLogo = Image.GetInstance(imgLogoPath);
                        imgLogo.Alignment = Element.ALIGN_LEFT;
                        imgLogo.ScaleToFit(121f, 62f);

                        cell = new PdfPCell(imgLogo);
                        cell.Rowspan = 2;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        cell.Border = PdfCell.NO_BORDER;
                        t1.AddCell(cell);

                        cell = new PdfPCell(t1b);
                        cell.PaddingLeft = 5f; //here
                        cell.HorizontalAlignment = Element.ALIGN_LEFT;
                        cell.Border = PdfCell.NO_BORDER;
                        t1.AddCell(cell);


                        var hcontent = new Paragraph();
                        hcontent.Alignment = Element.ALIGN_LEFT;


                        hcontent.Add(new Chunk($@"{rptSk.FCoAdd1} {rptSk.FCoAdd2}
    {rptSk.FCoAdd3} {rptSk.FCoAdd4}
    Tel: {rptSk.FCoTel}  Fax: {rptSk.FCoFax}  E-mail: {rptSk.FCoEmail}
    Website: {rptSk.FCoWebsite}", f2));

                        cell = new PdfPCell(hcontent);
                        cell.Padding = 0;
                        cell.PaddingTop = 2;
                        cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                        cell.Border = PdfCell.NO_BORDER;
                        cell.PaddingLeft = 5f; //here
                        t1.AddCell(cell);
                        doc.Add(t1);
                        curTop = curTop - 67f;
                    }
                    else
                    {
                        curTop = curTop + 10f;
                    }
                     
                    Util.iTextSharp.DrawLine(writer, 50f, curTop, doc.PageSize.Width - 50f, curTop, BaseColor.Black, 0.5f);
                    curTop = curTop - 2f;
                    Util.iTextSharp.DrawLine(writer, 50f, curTop, doc.PageSize.Width - 50f, curTop, BaseColor.Black, 1.0f);
               

                    PdfPTable t2 = new PdfPTable(3);
                    t2.SpacingBefore = 10f;
                    t2.SetWidths(new float[] { 3f, 1f, 14f });

                    cell = new PdfPCell(new Phrase("Rujukan kami", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.RefNo, f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tarikh", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(strLDate, f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.LrcptDept, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.LrcptBr, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.LrcptAdd1, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.LrcptAdd2, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.LrcptAdd3, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.LrcptAdd4, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tuan,", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("PENYATA BULANAN SKIM KHAS ATS BAGI BULAN " + ResourceHelper.Get(dtReport.ToString("MMMM")).ToUpper() + " " + dtReport.Year.ToString(), f5));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Saya adalah merujuk kepada perkara diatas,", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("1.     Sebagai mematuhi syarat di butiran 15 kepada syarat-syarat yang ditetapkan di bawah", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Skim Pedagangan Diluluskan (SPL), bersama-sama ini disertakan penyata bulanan", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.PaddingLeft = 22f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Lampiran C - 0 untuk bulan " + ResourceHelper.Get(dtReport.ToString("MMMM")).ToUpper() + " " + dtReport.Year.ToString(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.PaddingLeft = 22f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Sekian, terima kasih.", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 70f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Yang Benar,", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("...................................................", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 60f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.SignedByName, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.SignedByPos, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(String.Format("{0:dd/MM/yyyy}", dtletter), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    doc.Add(t2);


                    var curBottom = 120f; //40f
                    Util.iTextSharp.DrawLine(writer, 50f, curBottom, doc.PageSize.Width - 50f, curBottom, BaseColor.Black, 0.5f);
                    curBottom = curBottom - 2f;
                    Util.iTextSharp.DrawLine(writer, 50f, curBottom, doc.PageSize.Width - 50f, curBottom, BaseColor.Black, 1.0f);

                    PdfPTable t3 = new PdfPTable(5);
                    t3.SpacingBefore = 100f;
                    t3.SetWidths(new float[] { 7f, 1f, 27f, 1f, 22f });

                    cell = new PdfPCell(new Phrase("Specialise in", f2));
                    cell.Border = PdfCell.NO_BORDER;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("*", f6));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = -0.3f;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Printing of industrial & barcode labels & nameplates", f2));
                    cell.Border = PdfCell.NO_BORDER;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("*", f6));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = -0.3f;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Diecutting of adhesive tapes & insulators", f2));
                    cell.Border = PdfCell.NO_BORDER;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase(""));
                    cell.Border = PdfCell.NO_BORDER;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("*", f6));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = -4.8f;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Customised tape array design and febrication", f2));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = -3f;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase(""));
                    cell.Border = PdfCell.NO_BORDER;
                    t3.AddCell(cell);
                    cell = new PdfPCell(new Phrase("\"An ISO 9001 Registered Manufacturing Facility\"", f7));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = -3f;
                    t3.AddCell(cell);

                    doc.Add(t3);
                      
                }
                finally
                {
                    doc.Close();
                }
            }
            return rptName;
        }
         
        private string PrintReport(RptSk rptSk, IEnumerable<RptSkMimp> rptSkMimp)
        { 
            string rptPath = string.Empty;
            string rptName  = _rptFileName + " - Monthly" + "_" + _rptFileDT + ".pdf"; ;
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            { 
                string strRDate = string.Empty;
                DateTime dtReport = rptSk.RptDate.HasValue ? (DateTime)rptSk.RptDate : DateTime.Today;
                DateTime dtletter = rptSk.LetterDate.HasValue ? (DateTime)rptSk.LetterDate : DateTime.Today;
                string strLDate = dtletter.Day.ToString("D" + 2) + "hb " + ResourceHelper.Get(dtletter.ToString("MMMM")) + " " + dtletter.Year.ToString();
             
                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 65f, 40f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);
                doc.SetPageSize(new Rectangle(842f, 595f));

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream); 
                writer.PageEvent = new ITextEvents("B");
                // writer.PageEvent = new PDFFooter();
                doc.Open();
                // doc.Add(new Paragraph("3 & 5, Lorong Sungai Lokan 3/1, Taman Perindustrian Southtech"));
                try
                {
                    var curTop = doc.Top;
                    var webRoot = _env.WebRootPath;
                    BaseFont bFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);

                    Font f1 = new Font(bFont, 22f, Font.BOLD, BaseColor.Black);
                    Font f2 = new Font(bFont, 9f);
                    Font f3 = new Font(bFont, 8f);
                    Font f4 = new Font(bFont, 10f);
                    Font f5 = new Font(bFont, 10f, Font.BOLD | Font.UNDERLINE, BaseColor.Black);
                    Font f6 = new Font(bFont, 18f, Font.BOLD, BaseColor.Black);
                    Font f7 = new Font(bFont, 8f, Font.ITALIC, BaseColor.Black);
                    Font f8 = new Font(bFont, 10f, Font.BOLD, BaseColor.Black);
                     
                    PdfPTable t4 = new PdfPTable(2); 
                    t4.SetWidths(new float[] { 6f, 1f });

                    PdfPTable t4b = new PdfPTable(1); 

                    var cell = new PdfPCell(new Phrase("LAMPIRAN B", f8));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER; 
                    cell.Border = PdfCell.NO_BORDER;
                    t4b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("LAMPIRAN B - 0", f8));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.Border = PdfCell.NO_BORDER;
                    t4b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("P.T. GST BIL.2B", f8));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    t4b.AddCell(cell); 

                    cell = new PdfPCell(new Phrase(string.Empty)); 
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(t4b); 
                    t4.AddCell(t4b);

                    doc.Add(t4);
                     

                    PdfPTable t5 = new PdfPTable(1);
                    t5.SetWidths(new float[] { 1f });

                    cell = new PdfPCell(new Phrase("Penyata Bulanan Pergerakan Barang yang diimport".ToUpper(), f8));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    t5.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Di Bawah SKIM Pedagang dilulukan (SPL)".ToUpper(), f8));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    t5.AddCell(cell);

                    doc.Add(t5);
                     

                    PdfPTable t6 = new PdfPTable(2);
                    t6.SpacingBefore = 10f;
                    t6.SetWidths(new float[] {1f, 6f });

                    cell = new PdfPCell(new Phrase("Nama Syarikat  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell); 

                    cell = new PdfPCell(new Phrase(rptSk.FCoName.ToUpper(), f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Alamat Syarikat  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell); 

                    var coAdContent = new Paragraph();
                    coAdContent.Alignment = Element.ALIGN_LEFT; 
                    coAdContent.Add(new Chunk($@"{rptSk.FCoAdd1.ToUpper()} {rptSk.FCoAdd2.ToUpper()} {rptSk.FCoAdd3.ToUpper()} {rptSk.FCoAdd4.ToUpper()}", f4));

                    cell = new PdfPCell(coAdContent);
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);


                    cell = new PdfPCell(new Phrase("No. GST  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.FCoGstno, f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("No. SPL  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.FCoSplno, f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("Bulan  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell);

                    cell = new PdfPCell(new Phrase(ResourceHelper.Get(dtReport.ToString("MMMM")).ToUpper() + " " + dtReport.Year.ToString(), f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t6.AddCell(cell); 

                    doc.Add(t6);


                    PdfPTable t7 = new PdfPTable(7);
                    t7.SpacingBefore = 10f;
                    t7.SetWidths(new float[] { 1f, 3f, 5f, 4f, 4f, 4f, 4f});

                    cell = new PdfPCell(new Phrase("Bil", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tarik Pengimportan", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase("No. Borang Kastam 1", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kuantiti Diimport (KG)", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai Barang Diimport (RM)", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Amount GST digantung", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Catatan", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);


                    int i = 1;
                    if(rptSkMimp != null) { 
                      foreach(var d in rptSkMimp)
                        {
                            cell = new PdfPCell(new Phrase(i.ToString(), f4));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell); 

                            //var a = d?.FImpDate.ToString(); 
                            cell = new PdfPCell(new Phrase(d.FImpDate.HasValue ? String.Format("{0:dd/MM/yyyy}", d.FImpDate) : string.Empty, f4));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell);

                            cell = new PdfPCell(new Phrase(d.FCustomNo, f4));
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FImpWgt), f4));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FImpCost), f4));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FGstcost), f4));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.Note), f4));
                            cell.PaddingBottom = 5f;
                            cell.PaddingLeft = 5f;
                            cell.PaddingRight = 5f;
                            t7.AddCell(cell);

                            i++;
                        }
                    }

                    cell = new PdfPCell(new Phrase("Jumlah".ToUpper(), f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.Colspan = 3;
                    cell.PaddingBottom = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f4));
                    t7.AddCell(cell); 

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptSk.FGstcost), f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptSk.FImpCost), f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f4));
                    t7.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f4));
                    t7.AddCell(cell);

                    doc.Add(t7);


                    PdfPTable t8 = new PdfPTable(1);
                    t8.SpacingBefore = 5f;
                    t8.SetWidths(new float[] { 1f });

                    cell = new PdfPCell(new Phrase("Saya mengaku bahawa maklumat-maklumat yang diberi di atas adalah benar dan betul", f4));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.Border = PdfCell.NO_BORDER;

                    t8.AddCell(cell);
                    doc.Add(t8);

                    PdfPTable t9 = new PdfPTable(3);
                    t9.SpacingBefore = 20f;
                    t9.SetWidths(new float[] { 1f, 2f, 3f });

                    cell = new PdfPCell(new Phrase("Tandatangan  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty)); 
                    cell.Border = (PdfPCell.BOTTOM_BORDER);
                    cell.PaddingBottom = 5f;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nama  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.SignedByNameImp));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    cell.Border = (PdfPCell.BOTTOM_BORDER);
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("No. Kad Pengenalan  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.SignedByIdnoImp));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    cell.Border = (PdfPCell.BOTTOM_BORDER);
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jawatan  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptSk.SignedByPosImp));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = (PdfPCell.BOTTOM_BORDER);
                    cell.PaddingBottom = 5f;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Cop Syarikat  :", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = (PdfPCell.NO_BORDER);
                    t9.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    t9.AddCell(cell);

                    t9.KeepTogether = true;
                    doc.Add(t9);
                     
                   /* PdfPTable t10 = new PdfPTable(1);
                    t10.SetWidths(new float[] { 1f });
                    t10.SpacingBefore = 40f;

                    cell = new PdfPCell(new Phrase("ni /SPI_Import_syarikat/19.3.14", f7)); 
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t10.AddCell(cell);
                    doc.Add(t10);*/


                }
                finally
                {
                    doc.Close();
                }
            }
            return rptName;
        }


    }
}