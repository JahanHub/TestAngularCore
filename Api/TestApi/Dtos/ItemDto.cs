using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SalesPrice { get; set; }
        public IFormFile Photo { get; set; }
        public virtual List<StockDto> Stocks { get; set; } = new List<StockDto>();
        public virtual List<PurchaseDetailsDto> PurchaseDetails { get; set; } = new List<PurchaseDetailsDto>();

    }
}
