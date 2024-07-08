using System.Reflection;
using Test_k6_Api.Contracts.Enum;

namespace Test_k6_Api.Contracts
{
    public class Link
    {
        public NavigationType Type { get; set; }
        
        public string Text { get; set; }
        
        public string Url { get; set; }

        public Dictionary<string, object> Params { get; set; } = new();

        public void FillParams(object source)
        {
            if (Type != NavigationType.Action) 
                return;

            var properties = source.GetType().GetProperties();
            
            foreach (var property in properties)
            {
                var propName = property.Name;
                var propValue = property.GetValue(source);

                if (Params.ContainsKey(propName) && string.IsNullOrEmpty(Params[propName]?.ToString()))
                {
                    Params[propName] = propValue;
                }
            }
        }
    }
}
