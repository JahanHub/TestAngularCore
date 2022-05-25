﻿namespace TestApi.Common
{
    public interface ICommonApi
    {
        Task<ResponseDetail<IEnumerable<DropDown>>> GetCustomerDropDowns(CancellationToken cancellationToken = default);
        Task<ResponseDetail<IEnumerable<DropDown>>> GetItemDropDowns(CancellationToken cancellationToken = default);
        Task<ResponseDetail<IEnumerable<DropDown>>> GetSupplierDropDowns(CancellationToken cancellationToken = default);
    }
}