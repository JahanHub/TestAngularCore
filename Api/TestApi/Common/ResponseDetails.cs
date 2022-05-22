namespace TestApi.Common
{
    public class ResponseDetail
    {
        public ResponseDetail()
        {
            MessageType = MessageType.None;
            DateTime = DateTime.Now;
            Success = false;
        }

        public bool Success { get; set; }
        public Exception Exception { get; set; }
        public MessageType MessageType { get; set; }
        public int Count { get; set; }
        public string Message { get; set; }
        public DateTime DateTime { get; set; }
    }

    public class ResponseDetail<T> : ResponseDetail
    {
        public ResponseDetail()
        {
            MessageType = MessageType.None;
            DateTime = DateTime.Now;
            Success = false;
        }

        public ResponseDetail(ResponseDetail r)
        {
            Count = r.Count;
            Exception = r.Exception;
            Success = r.Success;
            MessageType = r.MessageType;
        }

        public ResponseDetail(ResponseDetail r, T data) : this(r)
        {
            Data = data;
        }

        public T Data { get; set; }

        public ResponseDetail<TU> To<TU>()
        {
            var result = new ResponseDetail<TU>
            {
                Data = (TU)Convert.ChangeType(Data, typeof(TU))
            };

            return result;
        }
    }
}
