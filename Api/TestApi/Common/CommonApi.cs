﻿using Microsoft.EntityFrameworkCore;
using TestApi.Contexts;

namespace TestApi.Common
{
    public class CommonApi
    {
        private readonly AppDbContext _context;

        public CommonApi(AppDbContext context)
        {
            this._context = context;
        }
        public async Task<ResponseDetail<IEnumerable<DropDown>>> GetSupplierDropDowns(CancellationToken cancellationToken = default)
        {
            var responseDetails = new ResponseDetail<IEnumerable<DropDown>>();

            var result = await _context.Suppliers
                .AsNoTracking()
                .Select(i => new DropDown()
                {
                    Text = i.FirstName + " " + i.LastName,
                    Value = i.Id
                })
                .ToListAsync(cancellationToken);

            responseDetails.Data = result;
            responseDetails.Message = "Data Found successfully!";
            responseDetails.Count = result.Count;
            responseDetails.Exception = null;
            responseDetails.MessageType = MessageType.Success;
            responseDetails.Success = true;
            return responseDetails;
        }

        public async Task<ResponseDetail<IEnumerable<DropDown>>> GetItemDropDowns(CancellationToken cancellationToken = default)
        {
            var responseDetails = new ResponseDetail<IEnumerable<DropDown>>();

            var result = await _context.Items
                .AsNoTracking()
                .Select(i => new DropDown()
                {
                    Text = i.ItemName,
                    Value = i.Id
                })
                .ToListAsync(cancellationToken);

            responseDetails.Data = result;
            responseDetails.Message = "Data Found successfully!";
            responseDetails.Count = result.Count;
            responseDetails.Exception = null;
            responseDetails.MessageType = MessageType.Success;
            responseDetails.Success = true;
            return responseDetails;
        }

        public async Task<ResponseDetail<IEnumerable<DropDown>>> GetCustomerDropDowns(CancellationToken cancellationToken = default)
        {
            var responseDetails = new ResponseDetail<IEnumerable<DropDown>>();

            var result = await _context.Customers
                .AsNoTracking()
                .Select(i => new DropDown()
                {
                    Text = i.FirstName + " " + i.LastName,
                    Value = i.Id
                })
                .ToListAsync(cancellationToken);

            responseDetails.Data = result;
            responseDetails.Message = "Data Found successfully!";
            responseDetails.Count = result.Count;
            responseDetails.Exception = null;
            responseDetails.MessageType = MessageType.Success;
            responseDetails.Success = true;
            return responseDetails;
        }
    }
}
