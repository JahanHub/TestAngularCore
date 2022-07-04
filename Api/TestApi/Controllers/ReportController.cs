using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApi.Contexts;
using TestApi.Dtos;

namespace TestApi.Controllers
{
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ReportController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Expense Report
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpense()
        {
            if (_context.Expenses == null)
            {
                return NotFound();
            }
            return await _context.Expenses.Select(i => new ExpenseDto()
            {
                Id = i.Id,
                ExpenseDate = i.ExpenseDate,
                IdExpenseElement = i.IdExpenseElement,
                IdExpenseHead = i.IdExpenseHead,
                PayTo = i.PayTo,
                Remarks = i.Remarks,
                Amount = i.Amount,
                ExpenseElementName = i.ExpenseElement.Name,
                ExpenseHeadName = i.ExpenseHead.Name
            }).ToListAsync();
        }

    }
}
