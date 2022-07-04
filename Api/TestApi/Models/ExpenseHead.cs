namespace TestApi.Models
{
    public class ExpenseHead
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Expense> Expenses { get; set; } = new List<Expense>();

    }
}
