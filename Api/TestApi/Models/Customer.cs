using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class Customer
    {
        public int Id { get; set; }


        [Required(ErrorMessage ="First Name is required Field")]
        [Display(Name = "First Name")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Last Name is required Field")]
        [Display(Name = "Last Name")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Address is required Field")]
        [Display(Name = "Address")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 2)]
        public string Address { get; set; }


        [Display(Name = "Address2")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.")]
        public string Address2 { get; set; }


        [Required(ErrorMessage = "City is required Field")]
        [Display(Name = "City")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.")]
        public string City { get; set; }

        [Required(ErrorMessage = "Upazila is required Field")]
        [Display(Name = "Upazila")]
        public int UpazilaId { get; set; }

        [Required(ErrorMessage = "Village is required Field")]
        [Display(Name = "Village")]
        public int VillageId { get; set; }


        [Required(ErrorMessage = "Zip is required Field")]
        [Display(Name = "Zip")]
        [StringLength(5, ErrorMessage = "The {0} must be at least {2} characters long.")]
        public string Zip { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

    }
}
