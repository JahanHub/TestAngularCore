using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public int UpazilaId { get; set; }
        public int VillageId { get; set; }
        public string Zip { get; set; }
    }
}
