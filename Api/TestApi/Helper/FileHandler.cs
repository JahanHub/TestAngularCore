using Microsoft.AspNetCore.Http;
using System.Net.Http.Headers;

namespace TestApi.Helper
{
    public static class FileHandler
    {
        public static byte[] ConvertToByte(IFormFile file)
        {
            byte[] fileBytes = new byte[0];
            if (file != null)
            {
                if (file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        fileBytes = ms.ToArray();
                    }
                }
            }
            return fileBytes;
        }

        public static IFormFile ConvertToFile(byte[] byteArray)
        {
            var stream = new MemoryStream(byteArray);
            IFormFile file = new FormFile(stream, 0, byteArray.Length, "name", "fileName");
            return file;
        }
    }
}
