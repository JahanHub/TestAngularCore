using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class PurchaseDetailsDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; } = string.Empty;
        public decimal PurchasePrice { get; set; }
        public decimal Qty { get; set; }
    }
}
