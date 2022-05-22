using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class Item
    {
        public int Id { get; set; }


        [Required(ErrorMessage = "Item Code is required Field")]
        [Display(Name = "Item Code")]
        [StringLength(20, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string ItemCode { get; set; }

        [Required(ErrorMessage = "Item Name is required Field")]
        [Display(Name = "Item Name")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string ItemName { get; set; }

        [Required(ErrorMessage = "Purchase Price is required Field")]
        [Display(Name = "Purchase Price")]
        public decimal PurchasePrice { get; set; }

        [Required(ErrorMessage = "Sales Price is required Field")]
        [Display(Name = "Sales Price")]
        public decimal SalesPrice { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
