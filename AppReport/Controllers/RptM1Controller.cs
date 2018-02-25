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
    public class RptM1Controller : Controller
    { 
        private PTSContext _ptsContext; 
        private IHostingEnvironment _env;
        const string _rptFileName = "PTS Lampiran M1";
        string _rptFileDT;

        static BaseFont bFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);

        Font f1 = new Font(bFont, 22f, Font.BOLD, BaseColor.Black);
        Font f2 = new Font(bFont, 9f);
        Font f3 = new Font(bFont, 8f);
        Font f3b = new Font(bFont, 8f, Font.BOLD);
        Font f4 = new Font(bFont, 9f);
        Font f5 = new Font(bFont, 9f, Font.BOLD | Font.UNDERLINE, BaseColor.Black);
        Font f6 = new Font(bFont, 18f, Font.BOLD, BaseColor.Black);
        Font f7 = new Font(bFont, 8f, Font.ITALIC, BaseColor.Black);
        Font f8 = new Font(bFont, 10f, Font.BOLD, BaseColor.Black);
        Font f9 = new Font(bFont, 11f, Font.BOLD);
        Font f10 = new Font(bFont, 9f, Font.BOLD, BaseColor.Black);
        Font f11 = new Font(bFont, 11f);

        public RptM1Controller(IHostingEnvironment env, PTSContext ptsContext, IOptions<AppConfig> accessConfig)
        {
            _env = env;
            _ptsContext = ptsContext; 
        }

        /*public IActionResult Index(int id)
        {
            var rptM1 = new RptM1Service(_ptsContext).Get(id);


            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss"); 

            IEnumerable<RptM1Mstk> rptM1Mstk = new RptM1MstkService(_ptsContext).Get(id);
            List<RptM1Mstk> rptM1MstkList = (rptM1Mstk != null) ? rptM1Mstk.ToList() : new List<RptM1Mstk>();


            IEnumerable<RptM1MstkInv> RptM1MstkInv = new RptM1MstkInvService(_ptsContext).Get(id);
            List<RptM1MstkInv> RptM1MstkInvList = (RptM1MstkInv != null) ? RptM1MstkInv.ToList() : new List<RptM1MstkInv>();

            if (rptM1 != null)
            {
                PrintLetter(rptM1);
                PrintMonthlyRpt(rptM1, rptM1MstkList, RptM1MstkInvList);
                PrintMonthlySummary(rptM1);

            }

            return View();
        }*/


        [HttpGet]
        public IActionResult Index()
        {
            var reportItem = new RptM1Service(_ptsContext).GetAllRptInvoices();
            return new JsonResult(reportItem);
        }

        [HttpPost]
        public IActionResult Save([FromBody] RptM1RequestModel request)
        {
            if (this.ModelState.IsValid)
            {
                if (request != null)
                {
                    var result = new RptM1Service(_ptsContext).Save(request);
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
            var rptM1 = new RptM1Service(_ptsContext).Get(id); 

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptM1 != null)
            {
                rpt = PrintLetter(rptM1);
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadMonthlyReport(int id)
        {
            var rptM1 = new RptM1Service(_ptsContext).Get(id);

            IEnumerable<RptM1Mstk> rptM1Mstk = new RptM1MstkService(_ptsContext).Get(id);
            List<RptM1Mstk> rptM1MstkList = (rptM1Mstk != null) ? rptM1Mstk.ToList() : new List<RptM1Mstk>(); 

            IEnumerable<RptM1MstkInv> RptM1MstkInv = new RptM1MstkInvService(_ptsContext).Get(id);
            List<RptM1MstkInv> RptM1MstkInvList = (RptM1MstkInv != null) ? RptM1MstkInv.ToList() : new List<RptM1MstkInv>();

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptM1 != null)
            {
                rpt = PrintMonthlyRpt(rptM1, rptM1MstkList, RptM1MstkInvList);
            }
            return Download(rpt);
        }

        [HttpGet]
        public FileResult DownloadMonthlySummary(int id)
        {
            var rptM1 = new RptM1Service(_ptsContext).Get(id);
             
            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");
            string rpt = string.Empty;
            if (rptM1 != null)
            {
                rpt = PrintMonthlySummary(rptM1);
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

                iTextSharp.text.Font baseFontBig = new iTextSharp.text.Font(iTextSharp.text.Font.HELVETICA, 8f, iTextSharp.text.Font.NORMAL, iTextSharp.text.BaseColor.Black);

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
                { 
                    htext = "Lampiran " + _rptType;

                    if (_rptType == "M1")
                        htext = htext + "\nPER  14.1\nPTK NO 27";
                }

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
         
        private string PrintLetter(RptM1 rptM1)
        { 
            string rptPath = string.Empty;
            string rptName = _rptFileName + "_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            {
                DateTime dtletter = rptM1.LetterDate.HasValue ? (DateTime)rptM1.LetterDate : DateTime.Today; 
                string strLDate = dtletter.Day.ToString("D" + 2) + "hb " + ResourceHelper.Get(dtletter.ToString("MMMM")) + " " + dtletter.Year.ToString();

                DateTime dtReport = rptM1.RptDate.HasValue ? (DateTime)rptM1.RptDate : DateTime.Today; 
                string strRptDate = dtReport.Day.ToString("D" + 2) + "hb " + ResourceHelper.Get(dtReport.ToString("MMMM")) + " " + dtReport.Year.ToString();

                decimal totalSales = (decimal)rptM1.SalesExpCont + (decimal)rptM1.SalesFiz + (decimal)rptM1.SalesGpb + (decimal)rptM1.SalesLocal;

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

                    PdfPCell cell = new PdfPCell(new Phrase(rptM1.FCoName, f1));
                    cell.Padding = 0;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("(" + rptM1.FCoRegNo + ")", f3));
                    cell.Padding = 0;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.VerticalAlignment = PdfPCell.ALIGN_BOTTOM;
                    cell.PaddingTop = 5;
                    cell.PaddingLeft = 0;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);


                    PdfPTable t1 = new PdfPTable(2);
                    t1.SetWidths(new float[] { 1f, 3f });

                    string imgLogoPath = webRoot + "\\img\\" + rptM1.FCoLogo;
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


                    hcontent.Add(new Chunk($@"{rptM1.FCoAdd1} {rptM1.FCoAdd2}
{rptM1.FCoAdd3} {rptM1.FCoAdd4}
Tel: {rptM1.FCoTel}  Fax: {rptM1.FCoFax}  E-mail: {rptM1.FCoEmail}
Website: {rptM1.FCoWebsite}", f2));

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

                    cell = new PdfPCell(new Phrase("Rujukan Kami", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":", f4));
                    cell.HorizontalAlignment = Element.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.RefNo, f4));
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


                    cell = new PdfPCell(new Phrase(rptM1.LrcptDept, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.LrcptBr, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.LrcptAdd1, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.LrcptAdd2, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.LrcptAdd3, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.LrcptAdd4, f4));
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

                    cell = new PdfPCell(new Phrase("Penyata bulanan lampiran m1 dan m2 bagin bulan ".ToUpper() 
                        + ResourceHelper.Get("MMMM_"+((DateTime)rptM1.RptDate).Month.ToString()).ToUpper() + " " 
                        + ((DateTime)rptM1.RptDate).Year.ToString(), f5));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Saya adalah merujuk kepada perkara diatas,", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("1.   Sebagai mematuhi syarat bil. kepada syarat-syarat perlesenan GPB, bersama-sama ini", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("disertakan penyata bulanan Lampiran M1 & M2 untuk bulan " 
                        + ResourceHelper.Get("MMMM_" + ((DateTime)rptM1.RptDate).Month.ToString()).ToUpper() + " "
                        + ((DateTime)rptM1.RptDate).Year.ToString() + ".", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.PaddingLeft = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2.   Kedudukan eksport berbanding jualan tempatan barang siap syarikat kami ialah :-", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2.1   Kuota yang dilulukan melalui lesen pengilang (ICA 1975) dan / atau lesen GPB.", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.PaddingLeft = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);
                     
                    PdfPTable stbl = new PdfPTable(5);
                    stbl.SetWidths(new float[] { 1f, 8f, 1f, 2f, 3f });

                    cell = new PdfPCell(new Phrase("i.", f4));  
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Kuota Eksport", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(rptM1.ExpQuota.ToString() + "%", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("ii.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Kuota Jualan Tempatan", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(rptM1.LocalSalesQuota.ToString() + "%", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(stbl);
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.PaddingLeft = 35f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2.2   Tempoh Lesen GPB                                                                          :         " + strRptDate, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.PaddingLeft = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2.3   Jumlah Pembelian Pengimport", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.PaddingLeft = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    stbl = new PdfPTable(5);
                    stbl.SetWidths(new float[] { 1f, 8f, 2f, 1f, 3f });

                    cell = new PdfPCell(new Phrase("i.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Nilai Bahan Mentah/Komponen", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.PurchRm) , f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("ii.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Nilai Mesin/ Peralatan/ Alat Ganti", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell); 

                    if(rptM1.PurchEq == null)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", 0), f4));
                    else
                       cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.PurchEq), f4));

                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(stbl);
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.PaddingLeft = 35f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2.4   Jumlah jualan terkumpul semasa :-", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 15f;
                    cell.PaddingLeft = 15f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    stbl = new PdfPTable(5);
                    stbl.SetWidths(new float[] { 1f, 8f, 2f, 1f, 3f });

                    cell = new PdfPCell(new Phrase("i.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Nilai dan peratusan eksport terus", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.SalesExpCont), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("ii.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Nilai dan peratusan jualan ke GPB", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.SalesGpb), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("iii.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Nilai dan peratusan jualan ke FIZ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase( @String.Format("{0:N}", rptM1.SalesFiz), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("iv.", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("Nilai dan peratusan jualan tempatan", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.BOTTOM_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.SalesLocal), f4));
                    cell.Border = PdfCell.BOTTOM_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase(string.Empty, f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("JUMLAH JUALAN", f3b));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(": ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase("RM", f4));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.Border = PdfCell.BOTTOM_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", totalSales), f4));
                    cell.Border = PdfCell.BOTTOM_BORDER;
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    stbl.AddCell(cell);
                     
                    cell = new PdfPCell(stbl);
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.PaddingLeft = 35f;
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


                    cell = new PdfPCell(new Phrase(@"....................................................", f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 40f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.SignedByName, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 10f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jawatan :  " + rptM1.SignedByPos, f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 3f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tarikh :  " + String.Format("{0:dd/MM/yyyy}", rptM1.SignedDate), f4));
                    cell.Padding = 0;
                    cell.PaddingTop = 3f;
                    cell.HorizontalAlignment = PdfPCell.ALIGN_LEFT;
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 3;
                    t2.AddCell(cell);

                    doc.Add(t2);


                    var curBottom = 75f; //40f
                    Util.iTextSharp.DrawLine(writer, 50f, curBottom, doc.PageSize.Width - 50f, curBottom, BaseColor.Black, 0.5f);
                    curBottom = curBottom - 2f;
                    Util.iTextSharp.DrawLine(writer, 50f, curBottom, doc.PageSize.Width - 50f, curBottom, BaseColor.Black, 1.0f);

                    PdfPTable t3 = new PdfPTable(5);
                    t3.SpacingBefore = 40f;
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
         
        private string PrintMonthlyRpt(RptM1 rptM1, List<RptM1Mstk> rptList, List<RptM1MstkInv> rptInvList)
        {
            string rptPath = string.Empty;
            string rptName = _rptFileName + " - Monthly_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            {
                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 40f, 10f);
                //doc.SetMargins(0f, 0f, 10f, 10f);
                doc.AddAuthor(AppConstant.ReportAuthor);
                doc.AddCreator(AppConstant.ReportCreator);
                doc.AddKeywords(_rptFileName);
                doc.AddSubject(_rptFileName);
                doc.AddTitle(_rptFileName);
                doc.SetPageSize(new Rectangle(842f, 595f));

                PdfWriter writer = PdfWriter.GetInstance(doc, outStream);
                writer.PageEvent = new ITextEvents("M1");

                doc.Open();
                try
                {
                    PdfPTable tbl = new PdfPTable(1);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SetWidths(new float[] { 1f });  

                    var cell = new PdfPCell(new Phrase("penyata bulanan bahan mentah/komponen ".ToUpper(), f10));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.Padding = 0;
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    var stbl = new PdfPTable(3);
                    stbl.SetWidths(new float[] { 6f, 1f, 26f });

                    cell = new PdfPCell(new Phrase("Nama Syarikat".ToUpper(), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell); 
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER; 
                    stbl.AddCell(cell); 
                    cell = new PdfPCell(new Phrase(rptM1.FCoName, f4));
                    cell.Border = PdfCell.NO_BORDER; 
                    stbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("No Lesen".ToUpper(), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(rptM1.LicenseNo, f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Bulan".ToUpper(), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(":    ", f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);
                    cell = new PdfPCell(new Phrase(ResourceHelper.Get("MMMM_" + (((DateTime)rptM1.RptDate).Month).ToString()).ToUpper() + " " + ((DateTime)rptM1.RptDate).Year.ToString(), f4));
                    cell.Border = PdfCell.NO_BORDER;
                    stbl.AddCell(cell);

                    cell = new PdfPCell(stbl);
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    doc.Add(tbl);

                    tbl = new PdfPTable(14);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 10f;
                    tbl.SetWidths(new float[] { 1f, 5f, 1.5f, 3f, 3f, 4f, 2f, 3f, 2f, 3f, 3f, 3f, 2f, 3f });

                    cell = new PdfPCell(new Phrase("1", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);
                     

                    cell = new PdfPCell(new Phrase("3", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("4", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("5", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("6", f3));
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("7", f3));
                    cell.Colspan = 2;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("8", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("9", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("10", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("11", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.PaddingBottom = 5;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Bil", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jenis bahan mentah / komponen", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("U/M", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Tariff Kod", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("Jumlah stok permulaan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("No. Borang Kastam / invois", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kuantiti import", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kuantiti belian tempatan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nilai (RM)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah bahan mentah (4+6+7)", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah bahan mentah yang digunakan", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Sisa / rosak", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah stok penutup", f3));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    tbl.AddCell(cell);

                    int i = 0; 
                    foreach (var d in rptList)
                    { 
                        i++;
                        cell = new PdfPCell(new Phrase(i.ToString(), f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.PaddingBottom = 5f; 
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.FRmdesc, f3)); 
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(d.FUomcode, f3)); 
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);
                         
                        cell = new PdfPCell(new Phrase(d.FTariffCode, f3));
                        cell.HorizontalAlignment = Element.ALIGN_CENTER;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FOpenBal), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        bool isInvFound = false;
                        foreach (var ri in rptInvList)
                        {
                            if (ri.MstkId == d.MstkId)
                            {

                                cell = new PdfPCell(new Phrase(ri.InvoiceNo, f3));
                                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                                cell.PaddingBottom = 5f;
                                tbl.AddCell(cell);

                                cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FImpWgt), f3));
                                cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                cell.PaddingBottom = 5f;
                                tbl.AddCell(cell);

                                cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FImpFreightCost), f3));
                                cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                cell.PaddingBottom = 5f;
                                tbl.AddCell(cell);

                                cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FLocWgt), f3));
                                cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                cell.PaddingBottom = 5f;
                                tbl.AddCell(cell);

                                cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FLocFreightCost), f3));
                                cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                cell.PaddingBottom = 5f;
                                tbl.AddCell(cell);
                                isInvFound = true;
                            }

                            break;
                        }

                        if (!isInvFound)
                        {

                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            cell.HorizontalAlignment = Element.ALIGN_CENTER;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);

                            cell = new PdfPCell(new Phrase(string.Empty, f3));
                            cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                            cell.PaddingBottom = 5f;
                            tbl.AddCell(cell);
                        }

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FTotalRm), f3)); 
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);
                         
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.UsedCost), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.WastedCost), f3)); 
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell); 

                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", d.FCloseBal), f3));
                        cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                        cell.PaddingBottom = 5f;
                        tbl.AddCell(cell);

                        int iv = 0;
                        foreach (var ri in rptInvList)
                        {
                            if (ri.MstkId == d.MstkId)
                            {
                                if (iv > 0) {


                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(ri.InvoiceNo, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FImpWgt), f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FImpFreightCost), f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FLocWgt), f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", ri.FLocFreightCost), f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);
                                    isInvFound = true;

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);

                                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                                    cell.PaddingBottom = 5f;
                                    tbl.AddCell(cell);
                                }

                                iv++;
                            }
                             
                        }

                    }

                    cell = new PdfPCell(); 
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("JUMLAH", f3b));
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.PaddingBottom = 5f;
                    cell.Colspan = 3;
                    tbl.AddCell(cell);
                   
                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FOpenBal), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f; 
                    tbl.AddCell(cell);

                    cell = new PdfPCell();
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FImpWgt), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FImpFreightCost), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FLocalWgt), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FLocalFreightCost), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FTotalRm), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FUsedCost), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FWastedCost), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FCloseBal), f3b));
                    cell.HorizontalAlignment = Element.ALIGN_RIGHT;
                    cell.PaddingBottom = 5f;
                    tbl.AddCell(cell);

                    doc.Add(tbl);

                    tbl = new PdfPTable(1);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 2f;
                    tbl.SetWidths(new float[] { 1f });

                    cell = new PdfPCell(new Phrase("Saya memperakui bahawa segala maklumat-maklumat yang diberi diatas adalah betul dan benar", f3)); 
                    cell.PaddingBottom = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    tbl.AddCell(cell);

                    doc.Add(tbl);

                    tbl = new PdfPTable(3);
                    tbl.TotalWidth = doc.PageSize.Width;
                    tbl.WidthPercentage = 92;
                    tbl.SpacingBefore = 5f;
                    tbl.SetWidths(new float[] { 2f, 1f, 3f });

                    cell = new PdfPCell(new Phrase(".............................................................", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 50f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 50f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(".............................................................", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 50f;
                    tbl.AddCell(cell);


                    cell = new PdfPCell(new Phrase(rptM1.CreatedByPos, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 5f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(rptM1.AppdByPos, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 5f;
                    tbl.AddCell(cell);


                    cell = new PdfPCell(new Phrase("Nama : " + rptM1.CreatedByName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 2f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 2f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nama : " + rptM1.AppdByName, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 2f;
                    tbl.AddCell(cell);


                    cell = new PdfPCell(new Phrase("Kad Pengenalan : " + rptM1.CreatedByIdno, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 2f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 2f;
                    tbl.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Kad Pengenalan: " + rptM1.AppdByIdno, f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 2f;
                    tbl.AddCell(cell);


                    cell = new PdfPCell(new Phrase("Cop Syarikat", f3));
                    cell.Border = PdfCell.NO_BORDER;
                    cell.PaddingBottom = 5f;
                    cell.PaddingTop = 10;
                    cell.Colspan = 3;
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
         
        private string PrintMonthlySummary(RptM1 rptM1)
        {
            string rptPath = string.Empty;
            string rptName = _rptFileName + " - Summary_" + _rptFileDT + ".pdf";
            rptPath = AppConstant.ReportFilePath + rptName;

            using (Stream outStream = new FileStream(rptPath, FileMode.OpenOrCreate))
            {
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
                    t1b.TotalWidth = doc.PageSize.Width;
                    t1b.WidthPercentage = 92;
                    t1b.SetWidths(new float[] { 1f, 3f });
                    t1b.SpacingBefore = 20f;
                     

                    PdfPCell cell = new PdfPCell(new Phrase("maklumat cukai terkorban".ToUpper(), f11));
                    cell.Padding = 0; 
                    cell.Border = PdfCell.NO_BORDER;
                    cell.Colspan = 2;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("gudang pengilangan berlesen (LWM) /".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Colspan = 2;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("zon perdagangan bebas".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Colspan = 2;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);


                    cell = new PdfPCell(new Phrase("Bulan".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":  "+ ResourceHelper.Get("MMMM_" + ((DateTime)rptM1.RptDate).Month.ToString()).ToUpper() + " " + ((DateTime)rptM1.RptDate).Year.ToString(), f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Nama Syarikat".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":  " + rptM1.FCoName, f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Alamat".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(":  " + rptM1.FCoAdd1 + " " + rptM1.FCoAdd2, f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(string.Empty, f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 20f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("   " + rptM1.FCoAdd3 + " " + rptM1.FCoAdd4, f11));
                    cell.Padding = 0;
                    cell.PaddingTop = 5f;
                    cell.Border = PdfCell.NO_BORDER;
                    t1b.AddCell(cell);

                    doc.Add(t1b);

                    t1b = new PdfPTable(6);
                    t1b.SetWidths(new float[] { 4f, 4f, 2f, 2f, 2f, 3f }); 
                    t1b.TotalWidth = doc.PageSize.Width;
                    t1b.WidthPercentage = 92;  
                    t1b.SpacingBefore = 20f;

                    cell = new PdfPCell(new Phrase("Jenis Barangan".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    t1b.AddCell(cell); 

                    cell = new PdfPCell(new Phrase("Nilai Barangan Import (CIF) RM".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    cell.Rowspan = 2;
                    t1b.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("Pengecualian (RM)".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.Colspan = 4;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("Duti Import".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("GST 6%".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);
                     
                    cell = new PdfPCell(new Phrase("Duti Eksais".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah Cukai Terkorban".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("1. Bahan Mentah / Komponen".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.PurchRm), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.RmdutyImp), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.Rmgst), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    if(rptM1.RmdutyExcise != null && rptM1.RmdutyExcise > 0)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.RmdutyExcise), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11));
              
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FRmtaxLost), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("2. Mesin / Alat Ganti".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);
 

                    if (rptM1.PurchEq != null)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.PurchEq), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11));

                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);
                     
                    if (rptM1.EqDutyImp != null)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.EqDutyImp), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11));

                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    if (rptM1.EqGst != null)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.EqGst), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11));
                     
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);
 
                    if (rptM1.EqDutyExcise != null)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.EqDutyExcise), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11));

                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);
                     
                    if (rptM1.FEqTaxLost != null)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FEqTaxLost), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11));

                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase("Jumlah Keseluruhan".ToUpper(), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);


                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}",  rptM1.PurchRm), f11));  
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FSumDutyImp), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FSumGst), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    if (rptM1.FSumDutyExcise != null && rptM1.FSumDutyExcise > 0)
                        cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FSumDutyExcise), f11));
                    else
                        cell = new PdfPCell(new Phrase("NIL", f11)); 

                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    cell = new PdfPCell(new Phrase(@String.Format("{0:N}", rptM1.FSumTaxLost), f11));
                    cell.Padding = 0;
                    cell.Padding = 5f;
                    cell.HorizontalAlignment = Element.ALIGN_CENTER;
                    cell.VerticalAlignment = Element.ALIGN_MIDDLE;
                    t1b.AddCell(cell);

                    doc.Add(t1b);

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