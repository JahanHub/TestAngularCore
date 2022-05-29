using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class LogIn
    {
        [Required(ErrorMessage = "User Name is required")]
        [Display(Name = "User Name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}
