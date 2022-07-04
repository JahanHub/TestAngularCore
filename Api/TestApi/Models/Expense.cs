using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestApi.Models
{
    public class Expense
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Expense Head is required Field")]
        [Display(Name = "Expense Head")]
        [ForeignKey("ExpenseHead")]
        public int IdExpenseHead { get; set; }

        [Required(ErrorMessage = "Expense Element is required Field")]
        [Display(Name = "Expense Element")]
        [ForeignKey("ExpenseElement")]
        public int IdExpenseElement { get; set; }

        [Display(Name = "Expense Date")]
        public DateTime? ExpenseDate { get; set; }

        [Display(Name = "Pay To")]
        public string PayTo { get; set; }
        public string Remarks { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public ExpenseElement ExpenseElement { get; set; } = null!;
        public ExpenseHead ExpenseHead { get; set; } = null!;
    }
}
