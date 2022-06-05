using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class LogInDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
