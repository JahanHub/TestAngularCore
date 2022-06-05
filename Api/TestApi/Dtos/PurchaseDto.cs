using System.ComponentModel.DataAnnotations;

namespace TestApi.Models
{
    public class PurchaseDto
    {
        public PurchaseDto()
        {

        }
        public PurchaseDto(Purchase purchase)
        {
            Id = purchase.Id;
            PurDate = purchase.PurDate;
            SupplierId = purchase.SupplierId;
            PurchaseDetails = purchase.PurchaseDetails.Select(i => new PurchaseDetailsDto()
            {
                Id = i.Id,
                ItemId = i.ItemId,
                PurchasePrice = i.PurchasePrice,
                Qty = i.Qty,

            }).ToList();
        }
        public int Id { get; set; }
        public int PurId { get; set; }
        public DateTime PurDate { get; set; }
        public int SupplierId { get; set; }
        public virtual IList<PurchaseDetailsDto> PurchaseDetails { get; set; } = new List<PurchaseDetailsDto>();

        public Purchase GetPurchase()
        {
            var purchase = new Purchase()
            {
                Id = Id,
                PurDate = PurDate,
                SupplierId = SupplierId,
                PurchaseDetails = PurchaseDetails.Select(i => new PurchaseDetails()
                {
                    Id = i.Id,
                    ItemId = i.ItemId,
                    PurchasePrice = i.PurchasePrice,
                    Qty = i.Qty

                }).ToList()
            };
            return purchase;
        }

        public Purchase GetPurchase(Purchase purchase)
        {
            purchase.Id = Id;
            purchase.PurDate = PurDate;
            purchase.SupplierId = SupplierId;
            purchase.PurchaseDetails = PurchaseDetails.Select(i=> new PurchaseDetails()
            {

            }).ToList();
            return purchase;
        }
    }
}
