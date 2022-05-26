using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class Sale
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Sales ID is required Field")]
        [Display(Name = "Sales Id")]
        public int SalesId { get; set; }

        [Required(ErrorMessage = "Sales Date is required Field")]
        [Display(Name = "Sales Date")]
        public DateTime SalesDate { get; set; }

        [Required(ErrorMessage = "Customer is required Field")]
        [Display(Name = "Customer")]
        public int CustomerId { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual IList<SaleDetails> SaleDetails { get; set; } = new List<SaleDetails>();
    }
}
