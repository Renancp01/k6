using Contracts;
using Contracts.Extensions;

namespace Test_k6_Api.Model
{
    public class Card : Base
    {
        public Guid CardId { get; set; }

        public string Number { get; set; }

        public override List<Shortcut> Shortcuts { get; set; }

        public override List<Button> Buttons { get; set; }

        public override void AddParams()
        {
            Shortcuts.FillParamsFromSourceList(this);
            Buttons.FillParamsFromSourceList(this);
        }
    }

    public class Invoice : Base
    {
        public Guid InvoiceId { get; set; }

        public string Number { get; set; }

        public override List<Shortcut> Shortcuts { get; set; }

        public override List<Button> Buttons { get; set; }

        public override void AddParams()
        {
            Shortcuts.FillParamsFromSourceList(this);
            Buttons.FillParamsFromSourceList(this);
        }
    }
}
