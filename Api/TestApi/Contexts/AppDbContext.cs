using Microsoft.EntityFrameworkCore;
using TestApi.Models;

namespace TestApi.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Purchase> Purchases { get; set; }
        public DbSet<PurchaseDetails> PurchaseDetails { get; set; }
        public DbSet<Sale> Sales => Set<Sale>();
        public DbSet<SaleDetails> SalesDetails => Set<SaleDetails>();



        public override int SaveChanges()
        {
            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            foreach (var item in ChangeTracker.Entries())
            {
                switch (item.State)
                {
                    case EntityState.Modified:
                        item.Property("UpdatedDate").CurrentValue = DateTime.Now;
                        break;
                    case EntityState.Added:
                        item.Property("CreatedDate").CurrentValue = DateTime.Now;
                        item.Property("UpdatedDate").CurrentValue = DateTime.Now;
                        break;
                    default:
                        break;
                }
            }
            return base.SaveChangesAsync(cancellationToken);
        }
    }
}
