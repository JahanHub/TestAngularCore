using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApi.Contexts;
using TestApi.Dtos;
using TestApi.Models;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ExpenseController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Expense
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpense()
        {
          if (_context.Expenses == null)
          {
              return NotFound();
          }
            return await _context.Expenses.Select(i=> new ExpenseDto()
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

        // GET: api/Expense/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Expense>> GetExpense(int id)
        {
          if (_context.Expenses == null)
          {
              return NotFound();
          }
            var expense = await _context.Expenses.FindAsync(id);

            if (expense == null)
            {
                return NotFound();
            }

            return expense;
        }

        // PUT: api/Expense/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExpense(int id, [FromBody]Expense expense)
        {
            if (id != expense.Id)
            {
                return BadRequest();
            }

            _context.Entry(expense).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Expense
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Expense>> PostExpense([FromForm] ExpenseDto expenseDto)
        {
          if (_context.Expenses == null)
          {
              return Problem("Entity set 'AppDbContext.Expense'  is null.");
          }
            var expense = new Expense()
            {
                Id = expenseDto.Id,
                IdExpenseHead = expenseDto.IdExpenseHead,
                IdExpenseElement = expenseDto.IdExpenseElement,
                ExpenseDate = expenseDto.ExpenseDate,
                PayTo = expenseDto.PayTo,
                Remarks = expenseDto.Remarks,
                Amount = expenseDto.Amount,
            };
            _context.Expenses.Add(expense);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetExpense", new { id = expense.Id }, expense);


        }


        // DELETE: api/Expense/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(int id)
        {
            if (_context.Expenses == null)
            {
                return NotFound();
            }
            var expense = await _context.Expenses.FindAsync(id);
            if (expense == null)
            {
                return NotFound();
            }

            _context.Expenses.Remove(expense);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ExpenseExists(int id)
        {
            return (_context.Expenses?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
