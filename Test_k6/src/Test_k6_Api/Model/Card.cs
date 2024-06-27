using Test_k6_Api.Contracts;

namespace Test_k6_Api.Model
{
    public class Card
    {
        public Guid CardId { get; set; }

        public string Number { get; set; }

        public string Type { get; set; }

        public List<Shortcut> Shortcuts { get; set; }
    }
}
