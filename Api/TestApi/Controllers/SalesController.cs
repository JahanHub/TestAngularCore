using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApi.Contexts;
using TestApi.Models;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            return await _context.Sales.Include(k=>k.SaleDetails).ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSales(int id)
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            var Sales = await _context.Sales.Include(j=> j.SaleDetails).FirstOrDefaultAsync(i=> i.Id ==id);

            if (Sales == null)
            {
                return NotFound();
            }

            return Sales;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, Sale Sales)
        {
            if (id != Sales.Id)
            {
                return BadRequest();
            }
            var existingData = _context.SalesDetails.AsNoTracking().Where(i => i.Sales.Id == Sales.Id).ToList();
            if (existingData.Count > 0)
            {
                var allExistingIds = Sales.SaleDetails.Where(i => i.Id > 0).Select(j => j.Id).ToList();
                var deletedDetails = existingData.Where(i => !allExistingIds.Contains(i.Id)).ToList();
                _context.SalesDetails.RemoveRange(deletedDetails);
            }
            _context.Sales.Update(Sales);
            
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SalesExists(id))
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

        // POST: api/Sales
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSales(Sale Sales)
        {
          if (_context.Sales == null)
          {
              return Problem("Entity set 'AppDbContext.Sales'  is null.");
          }
            _context.Sales.Add(Sales);
            var result = await _context.SaveChangesAsync();

            return Ok(Sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id)
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var Sales = await _context.Sales.FindAsync(id);
            if (Sales == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(Sales);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SalesExists(int id)
        {
            return (_context.Sales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
