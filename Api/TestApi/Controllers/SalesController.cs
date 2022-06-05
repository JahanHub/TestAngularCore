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
        public async Task<ActionResult<IEnumerable<SaleDto>>> GetSales()
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            return await _context.Sales.Select(i => new SaleDto()
            {
                Id = i.Id,
                SalesDate = i.SalesDate,
                CustomerId = i.CustomerId,
            }).ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleDto>> GetSales(int id)
        {
          if (_context.Sales == null)
          {
              return NotFound();
          }
            var sales = await _context.Sales.Include(j => j.SaleDetails)
                              .FirstOrDefaultAsync(i => i.Id == id);

            if (sales == null)
            {
                return NotFound();
            }
            var salesDto = new SaleDto(sales);

            return salesDto;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSales(int id, SaleDto sales, CancellationToken cancellationToken = default)
        {
            if (id != sales.Id)
            {
                return BadRequest();
            }
            var existingData = _context.SalesDetails.AsNoTracking().Where(i => i.Sales.Id == sales.Id).ToList();
            if (existingData.Count > 0)
            {
                var allExistingIds = sales.SaleDetails.Where(i => i.Id > 0).Select(j => j.Id).ToList();
                var deletedDetails = existingData.Where(i => !allExistingIds.Contains(i.Id)).ToList();
                _context.SalesDetails.RemoveRange(deletedDetails);
            }

            var saleInDb = await _context.Sales.AsNoTracking().Include(j => j.SaleDetails).FirstOrDefaultAsync(i => i.Id == sales.Id);
            if(saleInDb == null)
            {
                return NotFound();
            }
            _context.Sales.Update(sales.GetSale(saleInDb));

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
        public async Task<ActionResult<SaleDto>> PostSales(SaleDto sales, CancellationToken cancellationToken = default)
        {
          if (_context.Sales == null)
          {
              return Problem("Entity set 'AppDbContext.Sales'  is null.");
          }
            _context.Sales.Add(sales.GetSale());
            var result = await _context.SaveChangesAsync(cancellationToken);

            return Ok(sales);
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSales(int id,CancellationToken cancellationToken = default)
        {
            if (_context.Sales == null)
            {
                return NotFound();
            }
            var sales = await _context.Sales.FindAsync(id);
            var salesDetails = await _context.SalesDetails.Where(i=> i.Sales.Id.Equals(id)).ToListAsync(cancellationToken);
            if (sales == null)
            {
                return NotFound();
            }

            _context.SalesDetails.RemoveRange(salesDetails);
            _context.Sales.Remove(sales);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool SalesExists(int id)
        {
            return (_context.Sales?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
