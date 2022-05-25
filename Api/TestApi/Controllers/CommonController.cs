using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TestApi.Common;
using TestApi.Contexts;

namespace TestApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly ICommonApi _commonApi;

        public CommonController(ICommonApi commonApi)
        {
            this._commonApi = commonApi;
        }

        [HttpGet("items")]
        public async Task<ActionResult<ResponseDetail<IEnumerable<DropDown>>>> GetItems()
        {
            var drpItems = await _commonApi.GetItemDropDowns();

            return drpItems;
        }


        [HttpGet("supliers")]
        public async Task<ActionResult<ResponseDetail<IEnumerable<DropDown>>>> GetSuppliers()
        {
            var drpItems = await _commonApi.GetSupplierDropDowns();

            return drpItems;
        }


        [HttpGet("customers")]
        public async Task<ActionResult<ResponseDetail<IEnumerable<DropDown>>>> GetCustomers()
        {
            var drpItems = await _commonApi.GetCustomerDropDowns();

            return drpItems;
        }
    }
}
