using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestApi.Models
{
    public class SaleDetails
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Item Id is required Field")]
        [Display(Name = "Item Id")]
        [ForeignKey("Item")]
        public int ItemId { get; set; }

        [Required(ErrorMessage = "Sales Price is required Field")]
        [Display(Name = "Sales Price")]
        public decimal SalesPrice { get; set; }
        public decimal Qty { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        [ForeignKey("Sales")]
        public int SalesId { get; set; }

        public virtual Sale? Sales { get; set; }
        public virtual Item? Item { get; set; }
    }
}
