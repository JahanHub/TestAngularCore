﻿using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases()
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            return await _context.Purchases.ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(int id)
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            var Purchase = await _context.Purchases.FirstOrDefaultAsync(i=> i.Id ==id);

            if (Purchase == null)
            {
                return NotFound();
            }

            return Purchase;
        }

        // PUT: api/Purchases/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(int id, Purchase Purchase)
        {
            if (id != Purchase.Id)
            {
                return BadRequest();
            }

            _context.Entry(Purchase).State = EntityState.Modified;

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
        public async Task<ActionResult<Purchase>> PostPurchase(Purchase Purchase)
        {
          if (_context.Purchases == null)
          {
              return Problem("Entity set 'AppDbContext.Purchases'  is null.");
          }
            _context.Purchases.Add(Purchase);
            var result = await _context.SaveChangesAsync();

            return Ok(Purchase);
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchase(int id)
        {
            if (_context.Purchases == null)
            {
                return NotFound();
            }
            var Purchase = await _context.Purchases.FindAsync(id);
            if (Purchase == null)
            {
                return NotFound();
            }

            _context.Purchases.Remove(Purchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PurchaseExists(int id)
        {
            return (_context.Purchases?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}