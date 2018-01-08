using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace AppReport.Util
{
    public class iTextSharp
    {
        public PdfPCell getCell(String text, int alignment, Font f)
        {
            PdfPCell cell = new PdfPCell(new Phrase(text, f));
            cell.Padding = 0;
            cell.HorizontalAlignment = alignment;
            cell.PaddingTop = 10;
            //cell.Border = PdfCell.NO_BORDER;
            return cell;
        }

        public static void DrawLine(PdfWriter writer, float x1, float y1, float x2, float y2, BaseColor color, float lineW)
        {
            PdfContentByte contentByte = writer.DirectContent;
            contentByte.SetColorStroke(color);
            contentByte.SetLineWidth(lineW);
            contentByte.MoveTo(x1, y1);
            contentByte.LineTo(x2, y2);
            contentByte.Stroke();
        }
    }
}
