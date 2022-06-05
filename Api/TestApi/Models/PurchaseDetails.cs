using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class PurchaseDetails
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Item Id is required Field")]
        [Display(Name = "Item Id")]
        public int ItemId { get; set; }

        [Required(ErrorMessage = "Purchase Price is required Field")]
        [Display(Name = "Purchase Price")]
        public decimal PurchasePrice { get; set; }
        public decimal Qty { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int PurchaseId { get; set; }

        public virtual Purchase? Purchase { get; set; }
        public virtual Item? Item { get; set; }
    }
}
