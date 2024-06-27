namespace Test_k6_Api.Model;

public class Response
{
    public bool Sucess { get; set; }

    public IEnumerable<Card> Cards { get; set; }
}