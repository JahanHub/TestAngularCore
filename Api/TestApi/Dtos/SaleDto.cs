using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class SaleDto
    {
        public SaleDto()
        {

        }
        public SaleDto(Sale sale)
        {
            Id = sale.Id;
            SalesDate = sale.SalesDate;
            CustomerId = sale.CustomerId;
            SaleDetails = sale.SaleDetails.Select(i => new SaleDetailsDto()
            {
                Id = i.Id,
                ItemId = i.ItemId,
                SalesPrice = i.SalesPrice,
                Qty = i.Qty,

            }).ToList();
        }
        public int Id { get; set; }
        public int SalesId { get; set; }
        public DateTime SalesDate { get; set; }
        public int CustomerId { get; set; }
        public virtual IList<SaleDetailsDto> SaleDetails { get; set; } = new List<SaleDetailsDto>();

        public Sale GetSale()
        {
            var sale = new Sale()
            {
                Id = Id,
                SalesDate = SalesDate,
                CustomerId = CustomerId,
                SaleDetails = SaleDetails.Select(i => new SaleDetails()
                {
                    Id = i.Id,
                    ItemId = i.ItemId,
                    SalesPrice = i.SalesPrice,
                    Qty = i.Qty

                }).ToList()
            };
            return sale;
        }
        public Sale GetSale(Sale sale)
        {
            sale.Id = Id;
            sale.SalesDate = SalesDate;
            sale.CustomerId = CustomerId;
            sale.SaleDetails = SaleDetails.Select(i => new SaleDetails()
            {

            }).ToList();
            return sale;
        }
    }
}
