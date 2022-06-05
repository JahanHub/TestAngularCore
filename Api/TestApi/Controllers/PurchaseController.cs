using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestApi.Contexts;
using TestApi.Models;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PurchaseController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PurchaseDto>>> GetPurchases()
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            return await _context.Purchases.Select(i=> new PurchaseDto()
            {
                Id = i.Id,
                PurDate = i.PurDate,
                SupplierId = i.SupplierId,
            }).ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PurchaseDto>> GetPurchase(int id)
        {
            if (_context.Purchases == null)
            {
                return NotFound();
            }
            var purchase = await _context.Purchases.Include(j=> j.PurchaseDetails)
                            .FirstOrDefaultAsync(i => i.Id == id);

            if (purchase == null)
            {
                return NotFound();
            }
            var purchaseDto = new PurchaseDto(purchase);

            return purchaseDto;
        }

        // PUT: api/Purchases/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(int id, PurchaseDto purchase, CancellationToken cancellationToken = default)
        {
            if (id != purchase.Id)
            {
                return BadRequest();
            }
            var existingData = _context.PurchaseDetails.AsNoTracking().Where(i => i.Purchase.Id == purchase.Id).ToList();
            if (existingData.Count>0)
            {
                var allExistingIds = purchase.PurchaseDetails.Where(i => i.Id > 0).Select(p => p.Id).ToList();
                var deletedDetails = existingData.Where(i => !allExistingIds.Contains(i.Id)).ToList();
                _context.PurchaseDetails.RemoveRange(deletedDetails);
            }
            var purchaseInDb = await _context.Purchases.AsNoTracking().Include(j=> j.PurchaseDetails).FirstOrDefaultAsync(i => i.Id == purchase.Id);
            if (purchaseInDb == null)
            {
                return NotFound();
            }

            _context.Purchases.Update(purchase.GetPurchase(purchaseInDb));

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
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

        // POST: api/Purchases
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PurchaseDto>> PostPurchase(PurchaseDto purchase, CancellationToken cancellationToken = default)
        {
            try
            {
                if (_context.Purchases == null)
                {
                    return Problem("Entity set 'AppDbContext.Purchases'  is null.");
                }
                var stocks = new List<Stock>();
                foreach (var item in purchase.PurchaseDetails)
                {
                    var stock = await _context.Stocks.FirstOrDefaultAsync(s => s.ItemId == item.ItemId, cancellationToken);
                    if (stock == null)
                    {
                        stock = new Stock()
                        {
                            StockQty = Convert.ToInt16(item.Qty),
                            ItemId = item.ItemId
                        };
                    }
                    else
                    {
                        stock.StockQty += Convert.ToInt16(item.Qty);
                    }
                    stocks.Add(stock);
                }
                _context.Stocks.UpdateRange(stocks);
                var abc = purchase.GetPurchase();
                _context.Purchases.Add(abc);
                var result = await _context.SaveChangesAsync(cancellationToken);

                return Ok(purchase);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchase(int id, CancellationToken cancellationToken = default)
        {
            if (_context.Purchases == null)
            {
                return NotFound();
            }
            var purchase = await _context.Purchases.FindAsync(id);
            var purchaseDetails = await _context.PurchaseDetails.Where(i => i.Purchase.Id.Equals(id)).ToListAsync(cancellationToken);

            if (purchase == null)
            {
                return NotFound();
            }

            _context.PurchaseDetails.RemoveRange(purchaseDetails);
            _context.Purchases.Remove(purchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseExists(int id)
        {
            return (_context.Purchases?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
