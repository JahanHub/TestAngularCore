using Microsoft.EntityFrameworkCore;
using TestApi.Models;

namespace TestApi.Contexts
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Item> Items => Set<Item>();
        public DbSet<Supplier> Suppliers => Set<Supplier>();
        public DbSet<Purchase> Purchases => Set<Purchase>();
        public DbSet<PurchaseDetails> PurchaseDetails => Set<PurchaseDetails>();
        public DbSet<Sale> Sales => Set<Sale>();
        public DbSet<SaleDetails> SalesDetails => Set<SaleDetails>();
        public DbSet<Upazila> Upazilas => Set<Upazila>();
        public DbSet<Village> Villages => Set<Village>();
        public DbSet<Stock> Stocks => Set<Stock>();



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
