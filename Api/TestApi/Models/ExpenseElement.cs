namespace TestApi.Models
{
    public class ExpenseElement
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int IdExpenseHead { get; set; }

        public List<Expense> Expenses { get; set; } = new List<Expense>();
    }
}
