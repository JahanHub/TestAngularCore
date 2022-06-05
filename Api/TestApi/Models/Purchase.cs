using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class Purchase
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Purchase Date is required Field")]
        [Display(Name = "Purchase Date")]
        public DateTime PurDate { get; set; }

        [Required(ErrorMessage = "Supplier is required Field")]
        [Display(Name = "Supplier")]
        public int SupplierId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual IList<PurchaseDetails> PurchaseDetails { get; set; } = new List<PurchaseDetails>();
    }
}
