using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestApi.Models
{
    public class StockDto
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int StockQty { get; set; }
    }
}
