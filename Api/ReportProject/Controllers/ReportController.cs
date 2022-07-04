

using System.Data;
using System.Web.Http;

namespace ReportProject.Controllers
{
    public class ReportController : ApiController
    {
        ////private readonly ReportsBll _objReportsBll;
        ////private readonly IReportrdlc _reportRdlc;
        ////private string _dataSetName = string.Empty;
        ////private string _dataSetMasterName = string.Empty;
        ////private string _dataSetDetailName = string.Empty;
        ////private string _dataSetMOName = string.Empty;
        ////private DataTable _dtCommonDataTable = new DataTable();
        ////private string _reportName = string.Empty;
        ////private string _subReportName = string.Empty;
        ////private string _reportPath = string.Empty;

        //public ReportController()
        //{
        //    //_objReportsBll = new ReportsBll();
        //    //_reportRdlc = new Reportrdlc();
        //}

        //[HttpGet]
        //[Route("api/[controller]")]
        //public HttpResponseMessage SampleReport([FromUri] int? id)
        //{
        //    var response = new HttpResponseMessage();
        //    _dtCommonDataTable = new DataTable();
        //    _dtCommonDataTable = _objReportsBll.DeliveryChallan(idClient.GetValueOrDefault(), idContainerSetup);
        //    if (_dtCommonDataTable != null && _dtCommonDataTable.Rows.Count > 0)
        //    {
        //        //_dataSetName = "ContainerLoadSheetDataSet";
        //        //_reportName = "DeliveryChallan.rdlc";
        //        //_reportPath = string.Concat(ConfigurationManager.AppSettings["reportpath"], _reportName);
        //        //var pdf = _reportRdlc.GetReportPdf(_dataSetName, null, _dtCommonDataTable, _reportPath, null);
        //        //var stream = new MemoryStream(pdf);
        //        //response = new HttpResponseMessage { Content = new StreamContent(stream) };
        //        //response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
        //        //{
        //        //    FileName = string.Concat(_reportName.Substring(0, _reportName.LastIndexOf('.')), DateTime.Now.ToString("yyyyMMdd"),
        //        //        DateTime.Now.ToString("HHmmss"), ".pdf")
        //        //};

        //        //var fileName = string.Concat("DeliveryChallan", DateTime.Now.ToString("yyyyMMdd"), DateTime.Now.ToString("HHmmss"), ".xlsx");
        //        //HttpContext.Current.Response.Clear();
        //        //HttpContext.Current.Response.ClearContent();
        //        //HttpContext.Current.Response.ClearHeaders();
        //        //HttpContext.Current.Response.Buffer = true;
        //        //HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
        //        //HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        //        //HttpContext.Current.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //        //HttpContext.Current.Response.AddHeader("content-disposition", "attachment; filename=" + fileName);
        //        //using (ExcelPackage pack = new ExcelPackage())
        //        //{
        //        //    var ws = pack.Workbook.Worksheets.Add("Sheet1");

        //        //    ws.Row(1).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //        //    ws.Row(1).Style.Font.Bold = true;
        //        //    ws.Cells["A1"].Value = "DELIVERY CHALLAN   ";
        //        //    ws.Cells["A1:I1"].Merge = true;
        //        //    ws.Cells["A1:I1"].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
        //        //    ws.Cells["A1:I1"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A1:I1"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A1:I1"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A1:I1"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A1:I1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
        //        //    ws.Cells["A1:I1"].Style.Font.Bold = true;
        //        //    ws.Cells["A1:I1"].Style.Font.Size = 18;
        //        //    ws.Cells["A1:I1"].Style.Font.Name = "Arial";
        //        //    ws.Cells["A1:I1"].Style.Fill.BackgroundColor.SetColor(Color.White);

        //        //    ws.TabColor = System.Drawing.Color.Black;
        //        //    ws.Row(2).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //        //    ws.Row(2).Style.Font.Bold = true;

        //        //    ws.Row(2).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //        //    ws.Row(2).Style.Font.Bold = true;

        //        //    ws.Cells["A10:I10"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A10:I10"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A10:I10"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["A10:I10"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
        //        //    ws.Cells["B3:C3"].Merge = true;
        //        //    ws.Cells.Style.WrapText = true;
        //        //    ws.Cells.Style.ShrinkToFit = true;

        //        //    #region header
        //        //    ws.Cells["B3:E5"].Merge = true;
        //        //    ws.Cells["B6:E6"].Merge = true;
        //        //    ws.Cells["B7:E7"].Merge = true;

        //        //    ws.Cells["F3:G3"].Merge = true;
        //        //    ws.Cells["F4:G4"].Merge = true;
        //        //    ws.Cells["F5:G5"].Merge = true;
        //        //    ws.Cells["F6:G6"].Merge = true;
        //        //    ws.Cells["F7:G7"].Merge = true;

        //        //    ws.Cells["H3:I3"].Merge = true;
        //        //    ws.Cells["H4:I4"].Merge = true;
        //        //    ws.Cells["H5:I5"].Merge = true;
        //        //    ws.Cells["H6:I6"].Merge = true;
        //        //    ws.Cells["H7:I7"].Merge = true;

        //        //    ws.Cells["A3"].Style.Font.Bold = true;
        //        //    ws.Cells["F3"].Style.Font.Bold = true;
        //        //    ws.Cells["F5"].Style.Font.Bold = true;
        //        //    ws.Cells["F6"].Style.Font.Bold = true;
        //        //    ws.Cells["F7"].Style.Font.Bold = true;
        //        //    ws.Cells["A7"].Style.Font.Bold = true;

        //        //    ws.Cells["A3"].Value = "BUYER :";
        //        //    ws.Cells["B3"].Value = _dtCommonDataTable.Rows[0]["BuyerNameAddress"].ToString();

        //        //    ws.Cells["F3"].Value = "CONT. ID NO :";
        //        //    ws.Cells["H3"].Value = _dtCommonDataTable.Rows[0]["ContainerNo"].ToString();

        //        //    ws.Cells["F5"].Value = "EX. FACTORY DATE:";
        //        //    ws.Cells["H5"].Value = Convert.ToDateTime(_dtCommonDataTable.Rows[0]["ExFactoryDate"]).ToString("dd-MMM-yyyy");

        //        //    ws.Cells["F6"].Value = "MUSHAK SRL NO :";
        //        //    ws.Cells["H6"].Value = _dtCommonDataTable.Rows[0]["MushakSNo"].ToString();

        //        //    ws.Cells["F7"].Value = "CON. SEAL NO :";
        //        //    ws.Cells["H7"].Value = _dtCommonDataTable.Rows[0]["ContainerSealNo"].ToString();

        //        //    ws.Cells["A7"].Value = "INV. NO:";
        //        //    ws.Cells["B7"].Value = _dtCommonDataTable.Rows[0]["InvoiceNo"].ToString();
        //        //    #endregion

        //        //    #region detail

        //        //    ws.Cells["A10"].Value = "SL No";
        //        //    ws.Cells["B10"].Value = "Item Code";
        //        //    ws.Cells["D10"].Value = "Item Description";
        //        //    ws.Cells["G10"].Value = "Size";
        //        //    ws.Cells["I10"].Value = "Qty";

        //        //    ws.Cells["B10:C10"].Merge = true;
        //        //    ws.Cells["D10:F10"].Merge = true;
        //        //    ws.Cells["G10:H10"].Merge = true;

        //        //    ws.Cells["A10:E10"].Style.Font.Bold = true;

        //        //    ws.Cells["A10:I10"].Style.Font.Bold = true;
        //        //    ws.Cells["A10:I10"].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
        //        //    ws.Cells["A10:I10"].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

        //        //    for (int i = 0; i < _dtCommonDataTable.Rows.Count; ++i)
        //        //    {
        //        //        ws.Cells[("A" + Convert.ToInt32(11 + i))].Value = Convert.ToInt32(i + 1);
        //        //        ws.Cells[("B" + Convert.ToInt32(11 + i))].Value = _dtCommonDataTable.Rows[i]["ItemCode"].ToString();
        //        //        ws.Cells[("D" + Convert.ToInt32(11 + i))].Value = _dtCommonDataTable.Rows[i]["ItemDescription1"].ToString();
        //        //        ws.Cells[("G" + Convert.ToInt32(11 + i))].Value = _dtCommonDataTable.Rows[i]["ItemSizeNo"].ToString();
        //        //        ws.Cells[("I" + Convert.ToInt32(11 + i))].Value = _dtCommonDataTable.Rows[i]["Qty"].ToString();
        //        //        ws.Cells[("I" + Convert.ToInt32(11 + i + 1))].Value = _dtCommonDataTable.Rows[i]["TargetQty"].ToString();

        //        //        ws.Cells[("H" + Convert.ToInt32(11 + i + 1))].Value = "Total:";
        //        //        ws.Cells[("I" + Convert.ToInt32(11 + i + 1))].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

        //        //        ws.Cells["A" + Convert.ToInt32(11 + i) + ":" + "I" + Convert.ToInt32(11 + i)].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
        //        //        ws.Cells["A" + Convert.ToInt32(11 + i) + ":" + "I" + Convert.ToInt32(11 + i)].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //        //        ws.Cells["A" + Convert.ToInt32(11 + i) + ":" + "I" + Convert.ToInt32(11 + i)].Style.ShrinkToFit = true;
        //        //        ws.Cells["A" + Convert.ToInt32(11 + i) + ":" + "I" + Convert.ToInt32(11 + i)].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //        //        ws.Cells["A" + Convert.ToInt32(11 + i) + ":" + "I" + Convert.ToInt32(11 + i)].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //        //        ws.Cells["A" + Convert.ToInt32(11 + i) + ":" + "I" + Convert.ToInt32(11 + i)].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;

        //        //        ws.Cells["B" + Convert.ToInt32(11 + i) + ":" + "C" + Convert.ToInt32(11 + i)].Merge = true;
        //        //        ws.Cells["D" + Convert.ToInt32(11 + i) + ":" + "F" + Convert.ToInt32(11 + i)].Merge = true;
        //        //        ws.Cells["G" + Convert.ToInt32(11 + i) + ":" + "H" + Convert.ToInt32(11 + i)].Merge = true;

        //        //        ws.Cells[("A" + Convert.ToInt32(11 + i))].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //        //    }
        //            #endregion

        //            #region authorized Sign
        //            ws.Row(11 + _dtCommonDataTable.Rows.Count + 5).Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
        //            ws.Row(11 + _dtCommonDataTable.Rows.Count + 5).Style.Font.Italic = true;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Value = "Authorised Signature";
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Merge = true;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.Border.Top.Style = ExcelBorderStyle.Thin;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.Fill.PatternType = ExcelFillStyle.Solid;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.Font.Bold = true;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.Font.Size = 8;
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.Font.Name = "Arial";
        //            ws.Cells[("H" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5) + ":" + "I" + Convert.ToInt32(11 + _dtCommonDataTable.Rows.Count + 5))].Style.Fill.BackgroundColor.SetColor(Color.White);
        //            #endregion

        //            //#region bottom
        //            //ws.Row(44).Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
        //            //ws.Row(44).Style.Font.Italic = true;
        //            //ws.Cells["A44"].Value = "Head Office: Shanta Western Tower, Level – 3, 186, Bir Uttam Mir Shawkat Ali Road,Tejgaon I/A, Dhaka-1208, Bangladesh\r\nFactory: Mulaid, Sreepur, Gazipur - 1740, Bangladesh(This is a System Generate Report.)";
        //            //ws.Cells["A44:I45"].Merge = true;
        //            //ws.Cells["A44:I45"].Style.VerticalAlignment = ExcelVerticalAlignment.Top;
        //            //ws.Cells["A44:I45"].Style.Border.Top.Style = ExcelBorderStyle.Thin;
        //            //ws.Cells["A44:I45"].Style.Border.Left.Style = ExcelBorderStyle.Thin;
        //            //ws.Cells["A44:I45"].Style.Border.Right.Style = ExcelBorderStyle.Thin;
        //            //ws.Cells["A44:I45"].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
        //            //ws.Cells["A44:I45"].Style.Fill.PatternType = ExcelFillStyle.Solid;
        //            //ws.Cells["A44:I45"].Style.Font.Size = 8;
        //            //ws.Cells["A44:I45"].Style.Font.Name = "Arial";
        //            //ws.Cells["A44:I45"].Style.Fill.BackgroundColor.SetColor(Color.White);

        //            //#endregion
        //            ws.HeaderFooter.FirstFooter.CenteredText = "Head Office: Shanta Western Tower, Level – 3, 186, Bir Uttam Mir Shawkat Ali Road,Tejgaon I/A, Dhaka-1208\r\nFactory: Mulaid, Sreepur, Gazipur - 1740, Bangladesh(This is a System Generate Report.)";

        //            var ms = new MemoryStream();
        //            pack.SaveAs(ms);
        //            ms.WriteTo(HttpContext.Current.Response.OutputStream);
        //        }

        //        HttpContext.Current.Response.Flush();
        //        HttpContext.Current.Response.End();
        //    }
        //    return response;
        //}
    }
}