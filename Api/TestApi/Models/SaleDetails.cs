using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class SaleDetails
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Item Code is required Field")]
        [Display(Name = "Item Code")]
        [StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string ItemCode { get; set; }

        [Required(ErrorMessage = "Sales Price is required Field")]
        [Display(Name = "Sales Price")]
        public decimal SalesPrice { get; set; }
        public decimal Qty { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public virtual Sale? Sales { get; set; }
    }
}
