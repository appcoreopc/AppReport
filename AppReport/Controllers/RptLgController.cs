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
using Microsoft.Extensions.Localization;
using System.Resources;
using System.Globalization;
using AppReport.Resources;
using AppReport.Util;
using iTextSharp.text.pdf.draw;
using System.Linq;
using AppReport.RequestModel;

namespace AppReport.Controllers
{ 
    public class RptLgController : Controller
    { 
        private PTSContext _ptsContext; 
        private IHostingEnvironment _env;
        const string _rptFileName = "PTS Lesen Gudang";
        string _rptFileDT;

        static BaseFont bFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);

        Font f1 = new Font(bFont, 22f, Font.BOLD, BaseColor.Black);
        Font f2 = new Font(bFont, 9f);
        Font f3 = new Font(bFont, 8f);
        Font f3b = new Font(bFont, 8f, Font.BOLD);
        Font f4 = new Font(bFont, 10f);
        Font f5 = new Font(bFont, 10f, Font.BOLD | Font.UNDERLINE, BaseColor.Black);
        Font f6 = new Font(bFont, 18f, Font.BOLD, BaseColor.Black);
        Font f7 = new Font(bFont, 8f, Font.ITALIC, BaseColor.Black);
        Font f8 = new Font(bFont, 10f, Font.BOLD, BaseColor.Black);
        Font f9 = new Font(bFont, 11f, Font.BOLD);

        public RptLgController(IHostingEnvironment env, PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _env = env;
            _ptsContext = ptsContext; 
        }

        /*public IActionResult Index(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);
             
             
            IEnumerable<RptLgYimp> rptLgYimp1 = new RptLgYimpService(_ptsContext).Get(id, (int)rptLg.RptY1);
            IEnumerable<RptLgYimp> rptLgYimp2 = new RptLgYimpService(_ptsContext).Get(id, (int)rptLg.RptY2); 
            IEnumerable<RptLgYexp> rptLgYexp1 = new RptLgYexpService(_ptsContext).Get(id, (int)rptLg.RptY1);
            IEnumerable<RptLgYexp> rptLgYexp2 = new RptLgYexpService(_ptsContext).Get(id, (int)rptLg.RptY2);
            IEnumerable<RptLgYbgt> rptLgYbgt1 = new RptLgYbgtService(_ptsContext).Get(id, false);
            IEnumerable<RptLgYbgt> rptLgYbgt2 = new RptLgYbgtService(_ptsContext).Get(id, true);
            IEnumerable<RptLgYrdy> rptLgYrdy = new RptLgYrdyService(_ptsContext).Get(id);
             
            List<RptLgYimp> rptLgYimp1List = (rptLgYimp1 != null) ? rptLgYimp1.ToList() : new List<RptLgYimp>();
            List<RptLgYimp> rptLgYimp2List = (rptLgYimp2 != null) ? rptLgYimp2.ToList() : new List<RptLgYimp>();
            List<RptLgYexp> rptLgYexp1List = (rptLgYexp1 != null) ? rptLgYexp1.ToList() : new List<RptLgYexp>();
            List<RptLgYexp> rptLgYexp2List = (rptLgYexp2 != null) ? rptLgYexp2.ToList() : new List<RptLgYexp>();
            List<RptLgYbgt> rptLgYbgt1List = (rptLgYbgt1 != null) ? rptLgYbgt1.ToList() : new List<RptLgYbgt>();
            List<RptLgYbgt> rptLgYbgt2List = (rptLgYbgt2 != null) ? rptLgYbgt2.ToList() : new List<RptLgYbgt>();
            List<RptLgYrdy> rptLgYrdyList = (rptLgYrdy != null) ? rptLgYrdy.ToList() : new List<RptLgYrdy>();
              
            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss"); 

            if (rptLg != null)
            {
                PrintLetter(rptLg);
                PrintAttachment(rptLg);
                PrintImportRpt(rptLg, rptLgYimp1List, "Y1");
                PrintImportRpt(rptLg, rptLgYimp2List, "Y2");
                PrintExportRpt(rptLg, rptLgYexp1List, "Y1");
                PrintExportRpt(rptLg, rptLgYexp2List, "Y2");
                PrintLampiran(rptLg, "A1", null, null);
                PrintLampiran(rptLg, "A2", rptLgYbgt1List, null);
                PrintLampiran(rptLg, "A2(1)", rptLgYbgt2List, null);
                PrintLampiran(rptLg, "A3", null, rptLgYrdyList);
            }

            return View();
        }*/


        [HttpGet]
        public IActionResult Index()
        {
            var reportItem = new RptLgService(_ptsContext).GetAllRptDetails();
            return new JsonResult(reportItem);
        }

        [HttpPost]
        public IActionResult Save([FromBody] RptLgRequestModel request)
        {
            if (this.ModelState.IsValid)
            {
                if (request != null)
                {
                    var result = new RptLgService(_ptsContext).Save(request);
                    return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
                }

            }
            return new BadRequestResult();
        }

        [HttpGet]
        public FileResult Download(string fileName)
        {
            string filepath = Path.Combine(AppConstant.ReportFilePath, fileName);
            byte[] fileBytes = System.IO.File.ReadAllBytes(filepath);
            return File(fileBytes, "application/pdf", fileName);
        }

        [HttpGet]
        public FileResult DownloadLetter(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintLetter(rptLg);
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadAttachment(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintAttachment(rptLg);
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadImportRptY1(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);  
            IEnumerable<RptLgYimp> rptLgYimp1 = new RptLgYimpService(_ptsContext).Get(id, (int)rptLg.RptY1);  
            List<RptLgYimp> rptLgYimp1List = (rptLgYimp1 != null) ? rptLgYimp1.ToList() : new List<RptLgYimp>(); 

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintImportRpt(rptLg, rptLgYimp1List, "Y1");
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadImportRptY2(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id); 
            IEnumerable<RptLgYimp> rptLgYimp2 = new RptLgYimpService(_ptsContext).Get(id, (int)rptLg.RptY2);  
            List<RptLgYimp> rptLgYimp2List = (rptLgYimp2 != null) ? rptLgYimp2.ToList() : new List<RptLgYimp>(); 

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintImportRpt(rptLg, rptLgYimp2List, "Y2");
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadExportRptY1(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);
            IEnumerable<RptLgYexp> rptLgYexp1 = new RptLgYexpService(_ptsContext).Get(id, (int)rptLg.RptY1); 
            List<RptLgYexp> rptLgYexp1List = (rptLgYexp1 != null) ? rptLgYexp1.ToList() : new List<RptLgYexp>(); 

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintExportRpt(rptLg, rptLgYexp1List, "Y1");
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadExportRptY2(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);
            IEnumerable<RptLgYexp> rptLgYexp2 = new RptLgYexpService(_ptsContext).Get(id, (int)rptLg.RptY2);
            List<RptLgYexp> rptLgYexp2List = (rptLgYexp2 != null) ? rptLgYexp2.ToList() : new List<RptLgYexp>();

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintExportRpt(rptLg, rptLgYexp2List, "Y2");
            }
            return Download(rpt);
        }
         
        [HttpGet]
        public FileResult DownloadLampiranA1(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintLampiran(rptLg, "A1", null, null);
            }
            return Download(rpt);
        }
         
        [HttpGet]
        public FileResult DownloadLampiranA2(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);
            IEnumerable<RptLgYbgt> rptLgYbgt1 = new RptLgYbgtService(_ptsContext).Get(id, false); 
            List<RptLgYbgt> rptLgYbgt1List = (rptLgYbgt1 != null) ? rptLgYbgt1.ToList() : new List<RptLgYbgt>(); 

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintLampiran(rptLg, "A2", rptLgYbgt1List, null);
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadLampiranA21(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);
            IEnumerable<RptLgYbgt> rptLgYbgt2 = new RptLgYbgtService(_ptsContext).Get(id, true); 
            List<RptLgYbgt> rptLgYbgt2List = (rptLgYbgt2 != null) ? rptLgYbgt2.ToList() : new List<RptLgYbgt>();

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintLampiran(rptLg, "A2(1)", rptLgYbgt2List, null);
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadLampiranA3(int id)
        {
            var rptLg = new RptLgService(_ptsContext).Get(id);
            IEnumerable<RptLgYrdy> rptLgYrdy = new RptLgYrdyService(_ptsContext).Get(id); 
            List<RptLgYrdy> rptLgYrdyList = (rptLgYrdy != null) ? rptLgYrdy.ToList() : new List<RptLgYrdy>();

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptLg != null)
            {
                rpt = PrintLampiran(rptLg, "A3", null, rptLgYrdyList);
            }
            return Download(rpt);
        }

        public class ITextEvents : PdfPageEventHelper
        {

            // This is the contentbyte object of the writer
            PdfContentByte cb;

            // we will put the final number of pages in a template
            PdfTemplate headerTemplate, footerTemplate;

            // this is the BaseFont we are going to use for the header / footer
            BaseFont bf = null;

            // This keeps track of the creation time
            DateTime PrintTime = DateTime.Now;
            string _rptType = string.Empty;


            #region Fields
            private string _header;
            #endregion

            #region Properties
            public string Header
            {
                get { return _header; }
                set { _header = value; }
            }
            #endregion

            public ITextEvents(string rptType)
            {
                _rptType = rptType;
            }

            public override void OnOpenDocument(PdfWriter writer, Document document)
            {
                try
                {
                    PrintTime = DateTime.Now;
                    bf = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                    cb = writer.DirectContent;
                    headerTemplate = cb.CreateTemplate(100, 100);
                    footerTemplate = cb.CreateTemplate(50, 50);
                }
                catch (DocumentException de)
                {
                    //handle exception here
                }
                catch (System.IO.IOException ioe)
                {
                    //handle exception here
                }
            }

            public override void OnEndPage(iTextSharp.text.pdf.PdfWriter writer, iTextSharp.text.Document document)
            {
                base.OnEndPage(writer, document);

                iTextSharp.text.Font baseFontNormal = new iTextSharp.text.Font(iTextSharp.text.Font.HELVETICA, 12f, iTextSharp.text.Font.NORMAL, iTextSharp.text.BaseColor.Black);

                iTextSharp.text.Font baseFontBig = new iTextSharp.text.Font(iTextSharp.text.Font.HELVETICA, 11f, iTextSharp.text.Font.BOLD, iTextSharp.text.BaseColor.Black);

                Phrase p1Header = new Phrase("", baseFontNormal);

                //Create PdfTable object
                PdfPTable pdfTab = new PdfPTable(3);

                //We will have to create separate cells to include image logo and 2 separate strings
                //Row 1
                PdfPCell pdfCell1 = new PdfPCell();
                PdfPCell pdfCell2 = new PdfPCell(p1Header);
                PdfPCell pdfCell3 = new PdfPCell();
                String text = "Page " + writer.PageNumber + " of ";


                //Add paging to header
                {
                    cb.BeginText();
                    cb.SetFontAndSize(bf, 12);
                    cb.SetTextMatrix(document.PageSize.GetRight(200), document.PageSize.GetTop(45));
                    //cb.ShowText(text);
                    cb.EndText();
                    float len = bf.GetWidthPoint(text, 12);
                    //Adds "12" in Page 1 of 12
                    //cb.AddTemplate(headerTemplate, document.PageSize.GetRight(200) + len, document.PageSize.GetTop(45));
                }
                //Add paging to footer
                {
                    cb.BeginText();
                    cb.SetFontAndSize(bf, 9);
                    cb.SetTextMatrix(document.PageSize.GetRight(100), document.PageSize.GetBottom(30));
                    cb.ShowText(text);
                    cb.EndText();
                    float len = bf.GetWidthPoint(text, 9);
                    cb.AddTemplate(footerTemplate, document.PageSize.GetRight(100) + len, document.PageSize.GetBottom(30));
                }
                //Row 2
                PdfPCell pdfCell4 = new PdfPCell(new Phrase("", baseFontNormal));
                //Row 3

                var htext = string.Empty;

                if(_rptType.Length > 0)
                    htext = "LAMPIRAN " + _rptType;

                PdfPCell pdfCell5 = new PdfPCell(new Phrase(""));
                PdfPCell pdfCell6 = new PdfPCell();
                PdfPCell pdfCell7 = new PdfPCell(new Phrase(htext, baseFontBig));


                //set the alignment of all three cells and set border to 0
                pdfCell1.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfCell2.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfCell3.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfCell4.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfCell5.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfCell6.HorizontalAlignment = Element.ALIGN_CENTER;
                pdfCell7.HorizontalAlignment = Element.ALIGN_RIGHT;


                pdfCell2.VerticalAlignment = Element.ALIGN_BOTTOM;
                pdfCell3.VerticalAlignment = Element.ALIGN_MIDDLE;
                pdfCell4.VerticalAlignment = Element.ALIGN_TOP;
                pdfCell5.VerticalAlignment = Element.ALIGN_MIDDLE;
                pdfCell6.VerticalAlignment = Element.ALIGN_MIDDLE;
                pdfCell7.VerticalAlignment = Element.ALIGN_MIDDLE;


                pdfCell4.Colspan = 3;
                 
                pdfCell1.Border = 0;
                pdfCell2.Border = 0;
                pdfCell3.Border = 0;
                pdfCell4.Border = 0;
                pdfCell5.Border = 0;
                pdfCell6.Border = 0;
                pdfCell7.Border = 0;


                //add all three cells into PdfTable
                pdfTab.AddCell(pdfCell1);
                pdfTab.AddCell(pdfCell2);
                pdfTab.AddCell(pdfCell3);
                pdfTab.AddCell(pdfCell4);
                pdfTab.AddCell(pdfCell5);
                pdfTab.AddCell(pdfCell6);
                pdfTab.AddCell(pdfCell7);

                pdfTab.TotalWidth = document.PageSize.Width - 40f;
                pdfTab.WidthPercentage = 70;

                //call WriteSelectedRows of PdfTable. This writes rows from PdfWriter in PdfTable
                //first param is start row. -1 indicates there is no end row and all the rows to be included to write
                //Third and fourth param is x and y position to start writing
                var rheader = 0;
                if (_rptType == "B") rheader = 40;

                pdfTab.WriteSelectedRows(0, -1, 10, document.PageSize.Height- rheader, writer.DirectContent);

                //Move the pointer and draw line to separate header section from rest of page
                cb.MoveTo(40, document.PageSize.Height - 100);
                cb.LineTo(document.PageSize.Width - 40, document.PageSize.Height - 100);
                //cb.Stroke();

                //Move the pointer and draw line to separate footer section from rest of page
                cb.MoveTo(40, document.PageSize.GetBottom(50));
                cb.LineTo(document.PageSize.Width - 40, document.PageSize.GetBottom(50));
                //cb.Stroke();
            }

            public override void OnCloseDocument(PdfWriter writer, Document document)
            {
                base.OnCloseDocument(writer, document);

                headerTemplate.BeginText();
                headerTemplate.SetFontAndSize(bf, 12);
                headerTemplate.SetTextMatrix(0, 0);
                headerTemplate.ShowText((writer.PageNumber - 1).ToString());
                headerTemplate.EndText();

                footerTemplate.BeginText();
                footerTemplate.SetFontAndSize(bf, 9);
                footerTemplate.SetTextMatrix(0, 0);
                footerTemplate.ShowText((writer.PageNumber - 1).ToString());
                footerTemplate.EndText();


            }
        }
         
        private string PrintLetter(RptLg rptLg)
        {
            string rptPath = string.Empty;
            string rptName = _rptFileName + "_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            { 
                DateTime dtletter = rptLg.Ldate.HasValue ? (DateTime)rptLg.Ldate : DateTime.Today;
                string strLDate = dtletter.ToString("dd-MMM-yyyy");

                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 40f, 20f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                // writer.PageEvent = new PDFFooter();
                doc.Open();
                try
                {
                    var curTop = doc.Top;
                    var webRoot = _env.WebRootPath;


                    PdfPTable t1b = new PdfPTable(2);
                    t1b.SetWidths(new float[] { 12f, 2f });

                    PdfPCell cell = new PdfPCell(new Phrase(rptLg.FCoName, f1));
                    cell.Padding = 0;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("(" + rptLg.FCoRegNo + ")", f3));
                    cell.Padding = 0;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.VerticalAlignment = PdfPCell.ALIGN_BOTTOM;
                    cell.PaddingTop = 5;
                    cell.PaddingLeft = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);


                    PdfPTable t1 = new PdfPTable(2);
                    t1.SetWidths(new float[] { 1f, 3f });

                    string imgLogoPath = webRoot + "\\img\\" + rptLg.FCoLogo;
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


                    hcontent.Add(new Chunk($@"{rptLg.FCoAdd1} {rptLg.FCoAdd2}
{rptLg.FCoAdd3} {rptLg.FCoAdd4}
Tel: {rptLg.FCoTel}  Fax: {rptLg.FCoFax}  E-mail: {rptLg.FCoEmail}
Website: {rptLg.FCoWebsite}", f2));

                    cell = new PdfPCell(hcontent);
                    cell.Padding = 0;
                    cell.PaddingTop = 2;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingLeft = 5f; //here
                    t1.AddCell(cell);

                    curTop = curTop - 67f;
                    Util.iTextSharp.DrawLine(writer, 50f, curTop, doc.PageSize.Width - 50f, curTop, BaseColor.Black, 0.5f);
                    curTop = curTop - 2f;
                    Util.iTextSharp.DrawLine(writer, 50f, curTop, doc.PageSize.Width - 50f, curTop, BaseColor.Black, 1.0f);
                    doc.Add(t1);


                    PdfPTable t2 = new PdfPTable(3);
                    t2.SpacingBefore = 15f;
                    t2.SetWidths(new float[] { 3f, 1f, 14f });

                    cell = new PdfPCell(new Phrase("Ruj.Fail", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.RefNo, f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);


                    cell = new PdfPCell(new Phrase(rptLg.LrcptDept, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.LrcptBr, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.LrcptAdd1, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.LrcptAdd2, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.LrcptAdd3 + @" " + rptLg.LrcptAdd4 + @"                                              " + strLDate, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tuan,", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Per :    Permohonan Untuk Memperbaharui Lesen Gudang Mengilang", f5));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Sepertimana yang diperlukan bersama-sama ini dikepilkan salinan-salinan dokumen seperti", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("di bawah untuk permohonan memperbaharui Lesen Gudang Mengilang.", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("1.        Lampiram B (3 Salinan)", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"2.        Laporan Bahan yang diimport dan dibeli tempatan untuk tahun " + rptLg.RptY1.ToString(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"3.        Laporan Bahan yang diimport dan dibeli tempatan untuk tahun " + rptLg.RptY2.ToString()
                        + @" (" + ResourceHelper.Get(String.Format("{0:MMM}", rptLg.RptSdateY2)) + @"-" +
                        ResourceHelper.Get(String.Format("{0:MMM}", rptLg.RptEdateY2)) + @")", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"4.        Laporan Barang Siap yang dieksport dan dijual tempatan untuk tahun " + rptLg.RptY1.ToString(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"5.        Laporan Bahan yang dieksport dan dijual tempatan untuk tahun " + rptLg.RptY2.ToString()
                        + @" (" + ResourceHelper.Get(String.Format("{0:MMM}", rptLg.RptSdateY2)) + @"-" +
                        ResourceHelper.Get(String.Format("{0:MMM}", rptLg.RptEdateY2)) + @")", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"6.        Lampiran A1                 - Anggaran Mesin dan Komponen yang diimport (3 Salinan)", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"7.        Lampiran A2                 - Anggaran Bahan Mentah diimport (3 Salinan)", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"8.        Lampiran A2(1)            - Anggaran Bahan Mentah yang dibeli tempatan (3 Salinan)", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"9.        Lampiran A3                 - Anggaran Barang Siap yang akan dieksport (3 Salinan)", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"10.      PMM Cek No. " + rptLg.PbbcekNo + @" berjumlah RM" + @String.Format("{0:N}", rptLg.LicenseFee) + @" untuk pembayaran Lesen selama dua tahun", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Kami berharap semoga permohonan untuk memperbaharui Lesen Gudang Mengilang baru dapat diluluskan.", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 13f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Kerjasama tuan sangat kami hargai.", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 13f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Sekian terima kasih.", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 13f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Yang benar,", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);


                    cell = new PdfPCell(new Phrase(@"_________________________", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 40f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.SignedByName, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.SignedByPos, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 3f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(String.Format("{0:dd-MM-yyyy}", rptLg.SignedDate), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 3f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    doc.Add(t2);


                    var curBottom = 100f; //40f
                    Util.iTextSharp.DrawLine(writer, 50f, curBottom, doc.PageSize.Width - 50f, curBottom, BaseColor.Black, 0.5f);
                    curBottom = curBottom - 2f;
                    Util.iTextSharp.DrawLine(writer, 50f, curBottom, doc.PageSize.Width - 50f, curBottom, BaseColor.Black, 1.0f);

                    PdfPTable t3 = new PdfPTable(5);
                    t3.SpacingBefore = 55f;
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

        private string PrintAttachment(RptLg rptLg)
        {
            string rptPath = string.Empty;
            string rptName = _rptFileName + " - Lampiran B _" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            { 
                DateTime dtletter = rptLg.Ldate.HasValue ? (DateTime)rptLg.Ldate : DateTime.Today;
                DateTime dtApp = rptLg.AppDate.HasValue ? (DateTime)rptLg.AppDate : DateTime.Today;
                string strLDate = dtletter.ToString("dd-MMM-yyyy");
                string strAppDate = dtApp.ToString("dd-MMM-yyyy");

                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 40f, 20f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                writer.PageEvent = new ITextEvents("B"); 


                doc.Open();
                try
                {
                    var curTop = doc.Top;
                    var webRoot = _env.WebRootPath; 
                     
                    PdfPTable t4 = new PdfPTable(2);

                    t4.TotalWidth = doc.PageSize.Width - 60f;
                    t4.WidthPercentage = 85;
                    t4.SetWidths(new float[] { 3f, 10f });

                    var cell = new PdfPCell(new Phrase(string.Empty, f8));
                    cell.Padding = 0;
                    cell.PaddingTop = 50f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase("PER : 6.5.1", f2));
                    cell.Padding = 0;
                    cell.PaddingTop = 50f;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f8));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase("PTK NO. 27", f2));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Permohonan untuk membaharui".ToUpper(), f9));
                    cell.Padding = 0;
                    cell.PaddingTop = 22f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Lesen menggudang / mengilang".ToUpper(), f9));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Di bawah seksyen 65/65 Akta Kastam 1967".ToUpper(), f9));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.BrcptDept, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.BrcptBr, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.BrcptAdd1, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.BrcptAdd2, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptLg.BrcptAdd3 + " " + rptLg.BrcptAdd4, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    t4.AddCell(cell);


                    cell = new PdfPCell(new Phrase(@"Saya", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":  " + rptLg.AppByName.ToUpper(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Pengkat", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@":  " + rptLg.AppByPos.ToUpper(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"No. Kad Pengenalan", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@":  " + rptLg.AppByIdno.ToUpper(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Bagi pihak syarikat", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@":  " + rptLg.AppCoName.ToUpper(), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Beralamat di", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@":  " + rptLg.AppAdd1, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"   " + rptLg.AppAdd2, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"   " + rptLg.AppAdd3 + @" " + rptLg.AppAdd4, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);
                     
                    var content = new Chunk(@"Dengan ini memohon pembaharuan lesem untuk menggudang / mengilang di dalam seksyen 
65/65 A Akta Kastam 1967 bagi mengilang, " + rptLg.MfdGoodY3.ToUpper() + @" bermula dari "
+ Convert.ToDateTime(rptLg.MfdLicenseSdate).Day.ToString("D" + 2) + @" "
+ ResourceHelper.Get(Convert.ToDateTime(rptLg.MfdLicenseSdate).ToString("MMMM")).ToUpper() + @" " + Convert.ToDateTime(rptLg.MfdLicenseSdate).Year.ToString()
+ @" hingga "
+ Convert.ToDateTime(rptLg.MfdLicenseEdate).Day.ToString("D" + 2) + @" "
+ ResourceHelper.Get(Convert.ToDateTime(rptLg.MfdLicenseEdate).ToString("MMMM")).ToUpper() + @" " + Convert.ToDateTime(rptLg.MfdLicenseEdate).Year.ToString()
+ @".", f4);  
                    var pcontent = new Paragraph(32); 
                    pcontent.Add(content);
                    pcontent.IndentationLeft = 20f; 

                    cell = new PdfPCell(pcontent);
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Colspan = 2;
                    cell.Border = PdfCell.NO_BORDER;
                    t4.AddCell(cell);

                    doc.Add(t4); 
                    doc.NewPage();
                     
                    PdfPTable t5 = new PdfPTable(2);

                    t5.TotalWidth = doc.PageSize.Width - 60f;
                    t5.WidthPercentage = 85;
                    t5.SetWidths(new float[] { 9f, 1f });

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 45f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"2. Maklumat-maklumat berkenaan syarikat adalah seperti berikut :",f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER; 
                    cell.AddElement(new Paragraph(@"2.1. Adakah perubahan berlaku ke atas nama syarikat sekarang?", f4));
                    t5.AddCell(cell);
                     
                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((rptLg.IsChgCoName != null && (bool)rptLg.IsChgCoName) ? "Ya" : "Tidak", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"2.2. Adakah perubahan berlaku ke atas ahli-ahli Lembaga Syarikat?", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((rptLg.IsChgCoName != null && (bool)rptLg.IsChgCoMember) ? "Ya" : "Tidak", f4));
                    t5.AddCell(cell);


                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"3. Maklumat-maklumat mengenai bangunan dan mesin-mesin / alat-alat kelengkapan :", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"3.1. Adakah perubahan berlaku ke atas alamat premis?", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((rptLg.IsChgAddress != null && (bool)rptLg.IsChgAddress) ? "Ya" : "Tidak", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"3.2. Adakah perubahan berlaku ke atas struktur kilang?", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((rptLg.IsChgFtyStr != null && (bool)rptLg.IsChgFtyStr) ? "Ya" : "Tidak", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"3.3. Adakah perubahan berlaku ke atas mesin-mesin/alat-alat kelengkapan?", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((rptLg.IsChgEq != null && (bool)rptLg.IsChgEq) ? "Ya" : "Tidak", f4));
                    t5.AddCell(cell);

                     

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4. Maklumat-maklumat berkenaan bahan-bahan mentah/komponen dan brang-barang siap:", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4.1. Nilai bahan-bahan mentah / Komponen yang telah digunakan tahun lepas " + rptLg.RptY1.ToString() + @".", f4));
                    t5.AddCell(cell);

                    Font zapfdingbats = new Font(Font.ZAPFDINGBATS);
                    var cp1 = new Phrase(); 
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("                RM " + @String.Format("{0:N}", rptLg.FRmcost));
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(cp1);
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4.2. Anggaran nilai bahan-bahan mentah / komponen yang akan digunakan dalam tahun ini " + rptLg.RptY2.ToString() + @".", f4));
                    t5.AddCell(cell);

                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("                RM " + @String.Format("{0:N}", rptLg.BgtRmcost));
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(cp1);
                    t5.AddCell(cell);
                     
                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4.3. Jenis barang yang dikilang tahun lepas.", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(rptLg.MfdGoodY1, f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4.4. Jenis barang yang dikilang tahun ini.", f4));
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(rptLg.MfdGoodY2, f4));
                    t5.AddCell(cell); 

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4.5. Nilai pengeluaran barang siap tahun lepas " + rptLg.RptY1.ToString() + @".", f4));
                    t5.AddCell(cell);
                     
                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("                RM " + @String.Format("{0:N}", rptLg.FRdyGoodCost));
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(cp1);
                    t5.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"4.6. Anggaran nilai pengeluaran barang siap tahun ini " + rptLg.RptY2.ToString() + @".", f4));
                    t5.AddCell(cell);

                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("                RM " + @String.Format("{0:N}", rptLg.BgtRdyGoodCost));
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(cp1);
                    t5.AddCell(cell);

                    doc.Add(t5);
                    doc.NewPage();

                    PdfPTable t6 = new PdfPTable(1);

                    t6.TotalWidth = doc.PageSize.Width - 60f;
                    t6.WidthPercentage = 85;
                    t6.SetWidths(new float[] { 1f });

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 45f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"5. Maklumat-maklumat lain :", f4));
                    t6.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"5.1. Pasaran :", f4));
                    t6.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 30f; 
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"  i)     Nilai eksport tahun lepas "+ rptLg.RptY1.ToString(), f4));
                    t6.AddCell(cell);

                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("       RM " + @String.Format("{0:N}", rptLg.FMktExpCost) + @" / " + rptLg.MktExpRate.ToString() + @"%");
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 60f;
                    cell.Border = PdfCell.NO_BORDER; 
                    cell.AddElement(cp1);
                    t6.AddCell(cell);
                     
                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@" ii)     Anggaran nilai eskport tahun ini " + rptLg.RptY2.ToString(), f4));
                    t6.AddCell(cell);

                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("       RM " + @String.Format("{0:N}", rptLg.BgtMktExpCost) + @" / " + rptLg.BgtMktExpRate.ToString() + @"%");
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 60f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(cp1);
                    t6.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"iii)     Nilai jualan tempatan tahun lepas " + rptLg.RptY1.ToString(), f4));
                    t6.AddCell(cell);

                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("       RM " + @String.Format("{0:N}", rptLg.FLocalSalesCost) + @" / " + rptLg.LocalSalesRate.ToString() + @"%");
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 60f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(cp1);
                    t6.AddCell(cell);


                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 30f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@" iv)     Anggaran nilai jualan tempatan tahun ini " + rptLg.RptY2.ToString(), f4));
                    t6.AddCell(cell);

                    cp1 = new Phrase();
                    cp1.Add(new Chunk("\u0033", zapfdingbats));
                    cp1.Add("       RM " + @String.Format("{0:N}", rptLg.BgtLocSalesCost) + @" / " + rptLg.BgtLocSalesRate.ToString() + @"%");
                    cp1.Font.Size = 10f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 8f;
                    cell.PaddingLeft = 60f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(cp1);
                    t6.AddCell(cell);
                     
                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.PaddingLeft = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"5.2. Aktiviti selain pengilangan :", f4));
                    t6.AddCell(cell);

                    PdfPTable t6b = new PdfPTable(4);

                    t6b.TotalWidth = doc.PageSize.Width - 60f;
                    t6b.WidthPercentage = 85;
                    t6b.SetWidths(new float[] { 1f, 7f, 1f, 6f });
                    t6b.SpacingBefore = 20f;

                    cell = new PdfPCell();
                    cell.Padding = 0; 
                    cell.Border = PdfCell.NO_BORDER; 
                    cell.AddElement(new Paragraph(@"(i)", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER; 
                    cell.AddElement(new Paragraph(@"IPC/RDC", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"-", f4));
                    t6b.AddCell(cell);
                     
                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((string.IsNullOrEmpty(rptLg.IpcRdc) ? "Tiada" : rptLg.IpcRdc), f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"(ii)", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"Aktiviti Nilai Ditambah", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"-", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((string.IsNullOrEmpty(rptLg.ValueAdded) ? "Tiada" : rptLg.ValueAdded), f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"(iii)", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"Re-manufacturing, Repairing, Servicing", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"-", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((string.IsNullOrEmpty(rptLg.RepairSvc) ? "Tiada" : rptLg.RepairSvc), f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"(iv)", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"Eksport bahan mentah sebagai alat ganti", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"-", f4));
                    t6b.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph((string.IsNullOrEmpty(rptLg.SparePart) ? "Tiada" : rptLg.SparePart), f4));
                    t6b.AddCell(cell);


                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f; 
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(t6b);
                    t6.AddCell(cell);
                     
                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    cell.AddElement(new Paragraph(@"Dengan ini saya membuat akuan bahawa butir-butir di atas adalah betul dan benar.", f4));
                    t6.AddCell(cell);

                    doc.Add(t6);
                     
                    PdfPTable t7 = new PdfPTable(2);

                    t7.TotalWidth = doc.PageSize.Width - 60f;
                    t7.WidthPercentage = 85;
                    t7.SetWidths(new float[] { 4f, 1.5f});
                    t7.SpacingBefore = 80f;

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(@"Tarikh : " + strAppDate, f4));
                    t7.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.AddElement(new Paragraph(@".............................................", f4));
                    t7.AddCell(cell);


                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.AddElement(new Paragraph(string.Empty, f4));
                    t7.AddCell(cell);

                    cell = new PdfPCell();
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.PaddingLeft = 5f;
                    cell.Border = PdfCell.NO_BORDER; 
                    cell.AddElement(new Paragraph(@"(Tanda tangan Pemohon)", f4));
                    t7.AddCell(cell);

                    doc.Add(t7);

                }
                finally
                {
                    doc.Close();
                }
            }
            return rptName;
        }
  
        private string PrintImportRpt(RptLg rptLg, List<RptLgYimp> rptLgYimpList, string rptType)
        {
            var rptName1 = rptLg.RptY1.ToString() + "-" + rptLg.RptY2.ToString();

            var titlePeriod =  ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptSdateY1).Month).ToString()) + " " + ((DateTime)rptLg.RptSdateY1).Year.ToString()
                + " HINGGA " + ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptEdateY2).Month).ToString()) + " " + ((DateTime)rptLg.RptEdateY2).Year.ToString();


            if (rptType == "Y1")
            {
                rptName1 = rptLg.RptY1.ToString();
                titlePeriod = ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptSdateY1).Month).ToString()) + " " + ((DateTime)rptLg.RptSdateY1).Year.ToString()
                + " HINGGA " + ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptEdateY1).Month).ToString()) + " " + ((DateTime)rptLg.RptEdateY1).Year.ToString();
            }

            string rptPath = string.Empty;
            string rptName = _rptFileName + " - Import for " + rptName1 + "_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            { 
                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 10f, 10f);
                //doc.SetMargins(0f, 0f, 10f, 10f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);
                doc.SetPageSize(new Rectangle(842f, 595f));

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                writer.PageEvent = new ITextEvents(string.Empty);
                 
                doc.Open();
                try
                { 
                    PdfPTable tbl = new PdfPTable(1);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SetWidths(new float[] { 1f });


                    var cell = new PdfPCell(new Phrase("Laporan bahan mentah yang diimport dan tempatan bagi tempoh ".ToUpper() + titlePeriod.ToUpper(), f5));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Padding = 0;
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    doc.Add(tbl);
                     
                    tbl = new PdfPTable(15);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 10f;
                    tbl.SetWidths(new float[] { 1f, 7f, 2f, 4f, 2.5f, 2.5f, 2.5f, 2.5f, 2.5f, 2.5f, 2.5f, 2.5f, 4f, 2.5f, 2.5f });

                    cell = new PdfPCell(new Phrase("Bil", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingLeft = 1f;
                    cell.PaddingRight = 1f; 
                    cell.Rowspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Bahan Mentah", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kod Tarif", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Stok Awal", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Bahan Mentah Import", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    cell.Colspan = 2;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Bahan Mentah Tempatan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell); 
                    cell = new PdfPCell(new Phrase("Bahan Mentah Digunakan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Bahan Mentah Rosak / Dipulangkan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Baki Bahan Mentah", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);


                    int i = 1;
                    foreach (var d in rptLgYimpList)
                    {
                        cell = new PdfPCell(new Phrase(i.ToString(), f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.FRmdesc, f3));
                        cell.HorizontalAlignment = Element.ALIGN_LEFT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.FUomcode, f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.FTariffCode, f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FOpenBalWgt), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell); 

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FOpenBalCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FImpRmwgt), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FLocRmcost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FLocRmwgt), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FLocRmcost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.UsedRmwgt), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.UsedRmcost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.ReturnedWgt), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FCloseBalWgt), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FCloseBalCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                        tbl.AddCell(cell);

                        i++;
                    }



                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("JUMLAH", f3b));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.PaddingBottom = 2f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpOpenBalWgtY1 : rptLg.FImpOpenBalWgtY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpOpenBalCostY1 : rptLg.FImpOpenBalCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpImpRmwgtY1 : rptLg.FImpRmwgtY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpImpRmcostY1 : rptLg.FImpRmcostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpLocRmwgtY1 : rptLg.FImpLocRmwgtY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpLocRmcostY1 : rptLg.FImpLocRmcostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpUsedRmwgtY1 : rptLg.FImpUsedRmwgtY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpUsedRmcostY1 : rptLg.FImpUsedRmcostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpReturnedWgtY1 : rptLg.FImpReturnedWgtY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpCloseBalWgtY1 : rptLg.FImpCloseBalWgtY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FImpCloseBalCostY1 : rptLg.FImpCloseBalCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT; 
                    tbl.AddCell(cell);

                    doc.Add(tbl);

                    tbl = new PdfPTable(2);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 10f;
                    tbl.SetWidths(new float[] { 10f, 37f });

                    cell = new PdfPCell(new Phrase(rptLg.RptCoName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@"__________________________________", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 40f;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Nama: " + rptLg.RptSignedByName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@"No K/P: " + rptLg.RptSignedByIdno, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(rptLg.RptSignedByPos, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    doc.Add(tbl);
                }
                finally
                {
                    doc.Close();
                }
            }
            return rptName;
        }
         
        private string PrintExportRpt(RptLg rptLg, List<RptLgYexp> rptLgYrdyList, string rptType)
        {
            var rptName1 = rptLg.RptY1.ToString() + "-" + rptLg.RptY2.ToString();

            var titlePeriod = ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptSdateY2).Month).ToString()) +  
                " HINGGA " + ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptEdateY2).Month).ToString()) + " tahun " + ((DateTime)rptLg.RptEdateY2).Year.ToString();


            if (rptType == "Y1")
            {
                rptName1 = rptLg.RptY1.ToString();
                titlePeriod = ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptSdateY1).Month).ToString()) +  
                " HINGGA " + ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptEdateY1).Month).ToString()) + " tahun " + ((DateTime)rptLg.RptEdateY1).Year.ToString();
            }
            string rptPath = string.Empty;
            string rptName = _rptFileName + " - Eksport for " + rptName1 + "_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            { 
                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 10f, 10f);
                //doc.SetMargins(0f, 0f, 10f, 10f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);
                doc.SetPageSize(new Rectangle(842f, 595f));

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                writer.PageEvent = new ITextEvents(string.Empty);

                doc.Open();
                try
                {
                    PdfPTable tbl = new PdfPTable(1);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SetWidths(new float[] { 1f });


                    var cell = new PdfPCell(new Phrase("Laporan nilai barang siap yang dihasilkan dan dieksport/tempatan bagi tempoh ".ToUpper() + titlePeriod.ToUpper(), f5));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Padding = 0;
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    doc.Add(tbl);

                    tbl = new PdfPTable(15);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 10f;
                    tbl.SetWidths(new float[] { 1f, 7f, 4f, 3f, 3f, 3f, 3f, 3f, 3f, 3f, 3f, 3f, 3f, 3f, 3f });

                    cell = new PdfPCell(new Phrase("Bil", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingLeft = 1f;
                    cell.PaddingRight = 1f;
                    cell.Rowspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jenis barang siap", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Kod Tarif", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Stok Awal", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kuantiti Dihasilkan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingLeft = 5f;
                    cell.PaddingRight = 5f;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kuantiti Dieksport/FTZ/GPB", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Kuantiti Jualan Tempatan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kuantiti Barang Siap Rosak", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Baki", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Colspan = 2;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Unit", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);


                    int i = 1;
                    foreach (var d in rptLgYrdyList)
                    {
                        cell = new PdfPCell(new Phrase(i.ToString(), f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.StkDesc, f3));
                        cell.HorizontalAlignment = Element.ALIGN_LEFT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.TariffCode, f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        tbl.AddCell(cell); 

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.OpenBalQty), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.OpenBalCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.MadeQty), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.MadeCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.ExpQty), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.ExpCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.LocSalesQty), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.LocSalesCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.DamagedQty), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.DamagedCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.CloseBalQty), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.CloseBalCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        tbl.AddCell(cell);

                        i++;
                    }



                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("JUMLAH", f3b));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpOpenBalQtyY1 : rptLg.FExpOpenBalQtyY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpOpenBalCostY1 : rptLg.FExpOpenBalCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpMadeQtyY1 : rptLg.FExpMadeQtyY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpMadeCostY1 : rptLg.FExpMadeCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpQtyY1 : rptLg.FExpQtyY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpCostY1 : rptLg.FExpCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpLocSalesQtyY1 : rptLg.FExpLocSalesQtyY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpLocSalesCostY1 : rptLg.FExpLocSalesCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpDamagedQtyY1 : rptLg.FExpDamagedQtyY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpDamagedCostY1 : rptLg.FExpDamagedCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpCloseQtyY1 : rptLg.FExpCloseQtyY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptType == "Y1" ? rptLg.FExpCloseCostY1 : rptLg.FExpCloseCostY2), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    tbl.AddCell(cell);

                    doc.Add(tbl);

                    tbl = new PdfPTable(2);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 10f;
                    tbl.SetWidths(new float[] { 10f, 37f });

                    cell = new PdfPCell(new Phrase(rptLg.RptCoName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@"__________________________________", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 40f;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"Nama: " + rptLg.RptSignedByName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@"No K/P: " + rptLg.RptSignedByIdno, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(rptLg.RptSignedByPos, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    doc.Add(tbl);
                }
                finally
                {
                    doc.Close();
                }
            }
            return rptName;
        }
         
        private string PrintLampiran(RptLg rptLg, string rptType, List<RptLgYbgt> bgtList, List<RptLgYrdy> rdyList)
        { 
            var titlePeriod = ((DateTime)rptLg.RptSdateY3).Day.ToString("D" + 2) + " " + ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptSdateY3).Month).ToString()) +
                " HINGGA " + ((DateTime)rptLg.RptEdateY3).Day.ToString("D" + 2) + " " +  ResourceHelper.Get("MMMM_" + (((DateTime)rptLg.RptEdateY3).Month).ToString()) + " " + ((DateTime)rptLg.RptEdateY3).Year.ToString();

            string rptPath = string.Empty;
            string rptName = _rptFileName + " - Lampiran " + rptType + "_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            {
               // using (Stream outStream = new FileStream(AppConstant.ReportFilePath + _rptFileName + " - Lampiran " + rptType + "_" + _rptFileDT + ".pdf", FileMode.OpenOrCreate))
                 Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 10f, 10f);
                //doc.SetMargins(0f, 0f, 10f, 10f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);
                doc.SetPageSize(new Rectangle(842f, 595f));

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                writer.PageEvent = new ITextEvents(rptType);

                doc.Open();
                try
                {
                    PdfPTable tbl = new PdfPTable(2);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SetWidths(new float[] { 13f, 1f });


                    var cell = new PdfPCell(new Phrase(rptLg.FCoName.ToUpper() + " (" + rptLg.FCoRegNo.ToUpper() + ")", f3b));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Padding = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    var title = "senarai anggaran mesin-mesin dan peralatan yang diimport/tempatan untuk digunakan di dalam gudang pengilangan berlesen";
                    var title2 = "PER 6.1.1.3";

                    if (rptType == "A2")
                        title = "senarai anggaran bahan mentah / komponen yang diimport untuk digunakan di dalam gudang pengilangan berlesen";
                    else if (rptType == "A2(1)")
                        title = "senarai anggaran bahan mentah / komponen yang dibeli tempatan untuk digunakan di dalam gudang pengilangan berlesen";
                    else if (rptType == "A3")
                    {
                        title = "senarai anggaran barang siap yang akan dikeluarkan oleh gudang pengilangan berlesen";
                        title2 = "PER 6.1.1.5";
                    }

                    cell = new PdfPCell(new Phrase(title.ToUpper(), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(title2.ToUpper(), f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("(bagi tempoh satu tahun dari ".ToUpper() + titlePeriod.ToUpper() + ")", f3b));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("PTK NO.27", f3));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);
                     
                    doc.Add(tbl);

                    var totalCol = 12;
                    var colFloat = new float[] { 1f, 7f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f }; 
                    var colTitle1 = "Keterangan Mesin/Peralatan";
                    var colTitle2 = "Kuantiti Yang Dipohon";

                    if (rptType == "A2")
                    {
                        totalCol = 12;
                        colFloat = new float[] { 1f, 7f, 4f, 5f, 3f, 2f, 3f, 3f, 3f, 3f, 3f, 3f };
                        colTitle1 = "Keterangan Bahan\nMentah/Komponen";
                    }
                    else if (rptType == "A2(1)")
                    {
                        totalCol = 11;
                        colFloat = new float[] { 1f, 9f, 4f, 3f, 2f, 3f, 3f, 3f, 3f, 3f, 3f };
                        colTitle1 = "Keterangan Bahan Mentah/Komponen";
                    }
                    else if (rptType == "A3")
                    {
                        totalCol = 10;
                        colFloat = new float[] { 1f, 5f, 3f, 3f, 3f, 3f, 3f, 3f, 3f, 3f };
                        colTitle1 = "Keterangan Barang Siap";
                        colTitle2 = "Kuantiti";
                    } 

                    tbl = new PdfPTable(totalCol);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 20f;
                    tbl.SetWidths(colFloat);

                    cell = new PdfPCell(new Phrase("Bil", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingLeft = 1f;
                    cell.PaddingRight = 1f; 
                    tbl.AddCell(cell);


                    cell = new PdfPCell(new Phrase(colTitle1, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("No. Kod Tariff", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    if (rptType == "A1"  || rptType == "A2")
                    {
                        cell = new PdfPCell(new Phrase("Negara Tempat Asal", f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);
                    }

                    if (rptType == "A1")
                    {
                        cell = new PdfPCell(new Phrase("Stesen Kastam Import", f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);
                    }

                    cell = new PdfPCell(new Phrase(colTitle2, f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    if (rptType == "A2" || rptType == "A2(1)")
                    {
                        cell = new PdfPCell(new Phrase("Unit", f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);
                    }

                    cell = new PdfPCell(new Phrase("Nilai\n(RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kadar Duti Import (%)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah Duti Import (%)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kadar GST (%)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah GST (%)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah Cukai", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    if (rptType == "A1")
                    {
                        for (var i = 0; i < 13; i++)
                        {
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            cell.Padding = 10f;
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            tbl.AddCell(cell);
                        }


                        cell = new PdfPCell(new Phrase("JUMLAH", f3b));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        cell.Colspan = 5;
                        cell.Padding = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);
                    }
                    else if (rptType == "A2" || rptType == "A2(1)")
                    {
                        int i = 1;
                        foreach (var d in bgtList)
                        {
                            cell = new PdfPCell(new Phrase(i.ToString(), f3));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(d.FRmdesc, f3));
                            cell.HorizontalAlignment = Element.ALIGN_LEFT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(d.FTariffCode, f3));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            tbl.AddCell(cell);

                            if(rptType == "A2")
                            {
                                cell = new PdfPCell(new Phrase(d.FCountryList, f3));
                                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                                tbl.AddCell(cell);
                            }

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.Qty), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(d.FUomcode, f3));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FCost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FDutyImpRate), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FDutyImpCost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FGstrate), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FGstcost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FTaxCost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell); 

                            i++;
                        }
                         
                        cell = new PdfPCell(new Phrase("JUMLAH", f3b));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        cell.Colspan = ((rptType == "A2") ? 4 : 3);
                        cell.Padding = 5f;
                        tbl.AddCell(cell); 

                        cell = new PdfPCell(new Phrase(((rptType == "A2") ? @String.Format("{0:N}", rptLg.FBgtQtyImp) : @String.Format("{0:N}", rptLg.FBgtQtyLoc)), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;  
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(((rptType == "A2") ? @String.Format("{0:N}", rptLg.FBgtCostImp) : @String.Format("{0:N}", rptLg.FBgtCostLoc)), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(((rptType == "A2") ? @String.Format("{0:N}", rptLg.FBgtDutyImpCostImp) : @String.Format("{0:N}", rptLg.FBgtDutyImpCostLoc)), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(((rptType == "A2") ? @String.Format("{0:N}", rptLg.FBgtGstcostImp) : @String.Format("{0:N}", rptLg.FBgtGstcostLoc)), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(((rptType == "A2") ? @String.Format("{0:N}", rptLg.FBgtTaxCostImp) : @String.Format("{0:N}", rptLg.FBgtTaxCostLoc)), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);
                    }
                    else if (rptType == "A3")
                    {
                        int i = 1;
                        foreach (var d in rdyList)
                        {
                            cell = new PdfPCell(new Phrase(i.ToString(), f3));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(d.StkDesc, f3));
                            cell.HorizontalAlignment = Element.ALIGN_LEFT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(d.TariffCode, f3));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            tbl.AddCell(cell); 

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.Qty), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell); 

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.Cost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.DutyImpRate), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.DutyImpCost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.Gstrate), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.Gstcost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.TaxCost), f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            tbl.AddCell(cell);

                            i++;
                        }

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase("JUMLAH", f3b));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                        cell.Padding = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptLg.FRdyCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptLg.FRdyDutyImpCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty, f3));
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptLg.FRdyGstcost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptLg.FRdyTaxCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                        tbl.AddCell(cell);
                    }

                    doc.Add(tbl);

                    tbl = new PdfPTable(5);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 10f;
                    tbl.SetWidths(new float[] { 3f, 1f, 3f, 1f, 3f });


                    cell = new PdfPCell(new Phrase(@"Saya memperakui bahawa segala maklumat-maklumat", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"yang diberi di atas adalah betul dan benar", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 5;
                    tbl.AddCell(cell); 


                    //line 1
                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 20f;
                    cell.Colspan = 2;
                    tbl.AddCell(cell); 

                    if(rptType == "A3")
                    {

                        cell = new PdfPCell(new Phrase(string.Empty));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase("Disemak oleh", f3));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);
                    }
                    else
                    { 
                        cell = new PdfPCell(new Phrase("Disemak oleh", f3));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(string.Empty));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase("Permohonan diluluskan / tidak diluluskan", f3));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);
                    }

                    //line2  
                    cell = new PdfPCell(new Phrase(@"__________________________________", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 40f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);


                    if (rptType == "A3")
                    {
                        cell = new PdfPCell(new Phrase(string.Empty));
                        cell.Border = PdfCell.NO_BORDER;
                        tbl.AddCell(cell);
                    }
                    else
                    {
                        cell = new PdfPCell(new Phrase(@"__________________________________", f3));
                        cell.Border = PdfCell.NO_BORDER;
                        cell.PaddingTop = 40f;
                        tbl.AddCell(cell);
                    }

                        

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@"__________________________________", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 40f;
                    tbl.AddCell(cell);


                    //line 3 
                    cell = new PdfPCell(new Phrase(@"Tanda tangan: ", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Penguasa Kastam GPM,", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty));
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tanda tangan Pengwai Kanan Kastam,", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 5f;
                    tbl.AddCell(cell);


                    cell = new PdfPCell(new Phrase(@"Nama  : " + rptLg.RptSignedByName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 5f;
                    cell.Colspan = 5;
                    tbl.AddCell(cell);
                    //line 4
                    cell = new PdfPCell(new Phrase(@"No K/P  : " + rptLg.RptSignedByIdno, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 5f;
                    cell.Colspan = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jawatan  : " + rptLg.RptSignedByPos, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingTop = 5f;
                    cell.Colspan = 5;
                    tbl.AddCell(cell); 

                    doc.Add(tbl);
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