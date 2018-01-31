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

namespace AppReport.Controllers
{
    public class RptSkController : Controller
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
         
        public class PDFFooter : PdfPageEventHelper
        {
            // write on top of document
            public override void OnOpenDocument(PdfWriter writer, Document document)
            {
                base.OnOpenDocument(writer, document);
                PdfPTable tabFot = new PdfPTable(new float[] { 1F });
                tabFot.SpacingAfter = 10F;
                PdfPCell cell;
                tabFot.TotalWidth = 300F;
                cell = new PdfPCell(new Phrase("Header"));
                tabFot.AddCell(cell);
                tabFot.WriteSelectedRows(0, -1, 150, document.Top, writer.DirectContent);
            }

            // write on start of each page
            public override void OnStartPage(PdfWriter writer, Document document)
            {
                base.OnStartPage(writer, document);
            }

            // write on end of each page
            public override void OnEndPage(PdfWriter writer, Document document)
            {
                base.OnEndPage(writer, document);
                PdfPTable tabFot = new PdfPTable(new float[] { 1F });
                PdfPCell cell;
                tabFot.TotalWidth = 300F;
                cell = new PdfPCell(new Phrase("Footer"));
                tabFot.AddCell(cell);
                tabFot.WriteSelectedRows(0, -1, 150, document.Bottom, writer.DirectContent);
            }

            //write on close of document
            public override void OnCloseDocument(PdfWriter writer, Document document)
            {
                base.OnCloseDocument(writer, document);
            }
        }

        //http://localhost:5050/api/rptsk?id=4
        [Route("api/[controller]")]
        [HttpGet]
        public IActionResult Index(int id)
        {
            var rptSk = new RptSkService(_ptsContext).Get(id);
            var rptSkMimp = new RptSkMimpService(_ptsContext).Get(id);

            _rptFileDT = DateTime.Now.ToString("yyyyMMddHHmmss");

            if (rptSk != null)
            { 
                PrintLetter(rptSk);
                PrintReport(rptSk, rptSkMimp);
            }

            return View();
        }


        //http://localhost:5050/rptsk/index
        [HttpGet]
        public IActionResult Index()
        {
            var reportItem = new RptSkService(_ptsContext).GetAll();
            var cnt = reportItem?.Count();            
            return new JsonResult(reportItem);
        }

        [HttpPost]
        public IActionResult Save([FromBody] RptSkRequestModel d)
        {

            if (d != null)
            {
                var result = new RptSkService(_ptsContext).Save(d);
                return HttpResultIntention.GetStatusCode(ActionIntent.Save, result, null);
            }
            return new BadRequestResult();
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

                BaseFont bFont = BaseFont.CreateFont(BaseFont.HELVETICA, BaseFont.CP1252, false);
                Font f7 = new Font(bFont, 8f, Font.ITALIC, BaseColor.Black);
                var htext = string.Empty;

                if (_rptType.Length > 0)
                    htext = "ni / SPI_Import_syarikat / 19.3.14";

                PdfPCell pdfCell5 = new PdfPCell(new Phrase(""));
                PdfPCell pdfCell6 = new PdfPCell();
                PdfPCell pdfCell7 = new PdfPCell(new Phrase(htext, f7));


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

                pdfTab.WriteSelectedRows(0, -1, 10, document.PageSize.Height - rheader, writer.DirectContent);

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


        private void PrintLetter(RptSk rptSk)
        {

            using (Stream outStream = new FileStream(AppConstant.ReportFilePath + _rptFileName + "_" + _rptFileDT + ".pdf", FileMode.OpenOrCreate))
            {
                string strRDate = string.Empty;
                DateTime dtReport = rptSk.RptDate.HasValue ? (DateTime)rptSk.RptDate : DateTime.Today;
                DateTime dtletter = rptSk.LetterDate.HasValue ? (DateTime)rptSk.LetterDate : DateTime.Today;
                string strLDate = dtletter.Day.ToString("D" + 2) + "hb " + ResourceHelper.Get(dtletter.ToString("MMMM")) + " " + dtletter.Year.ToString();

                Document doc = new Document(iTextSharp.text.PageSize.A4, 0f, 0f, 40f, 20f);
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

                    PdfPCell cell = new PdfPCell(new Phrase(rptSk.FCoName, f1));
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

                    curTop = curTop - 67f;
                    Util.iTextSharp.DrawLine(writer, 50f, curTop, doc.PageSize.Width - 50f, curTop, BaseColor.Black, 0.5f);
                    curTop = curTop - 2f;
                    Util.iTextSharp.DrawLine(writer, 50f, curTop, doc.PageSize.Width - 50f, curTop, BaseColor.Black, 1.0f);
                    doc.Add(t1);


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
        }
         
        private void PrintReport(RptSk rptSk, IEnumerable<RptSkMimp> rptSkMimp)
        {

            using (Stream outStream = new FileStream(AppConstant.ReportFilePath + _rptFileName + " - Monthly" +  "_" + _rptFileDT + ".pdf", FileMode.OpenOrCreate))
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

                    cell = new PdfPCell(new Phrase(rptSk.FCoName, f4));
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
        }


    }
}