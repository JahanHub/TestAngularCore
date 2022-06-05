using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestApi.Models
{
    public class Stock
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Item Id is required Field")]
        [ForeignKey("Item")]
        public int ItemId { get; set; }

        [Required(ErrorMessage = "Stock Qty is required Field")]
        [Display(Name = "Stock Qty")]
        public int StockQty { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual Item? Item { get; set; }
    }
}
