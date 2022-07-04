namespace TestApi.Dtos
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public int IdExpenseHead { get; set; }
        public int IdExpenseElement { get; set; }
        public DateTime? ExpenseDate { get; set; }
        public string? PayTo { get; set; }
        public string? Remarks { get; set; }
        public string ExpenseElementName { get; set; } = string.Empty;
        public string ExpenseHeadName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
