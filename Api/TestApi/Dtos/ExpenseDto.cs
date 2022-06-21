namespace TestApi.Dtos
{
    public class ExpenseDto
    {
        public int ExId { get; set; }
        public int IdExpenseHead { get; set; }
        public int IdExpenseElement { get; set; }
        public DateTime? ExpenseDate { get; set; }
        public string? PayTo { get; set; }
        public string? Remarks { get; set; }
        public decimal Amount { get; set; }
    }
}
