using ConsoleApp1.Models;
using Microsoft.Extensions.Configuration;

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppContext.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .Build();

var listCard = new List<Card>();

var cardFisico = new Card();
cardFisico.CardId = Guid.NewGuid();
cardFisico.Type = CardType.Fisico;

var cardVirtual = new Card();
cardVirtual.CardId = Guid.NewGuid();
cardVirtual.Type = CardType.Virtual;
cardVirtual.Number = "4585552254";

listCard.Add(cardFisico);
listCard.Add(cardVirtual);
var configData = configuration.Get<ConfigurationData>();


foreach (var card in listCard)
{
    if (card.Type == CardType.Fisico)
    {
        card.Shortcuts = configData.ConfigFisico.Shortcuts;
        card.Buttons = configData.ConfigFisico.Buttons;
    }
    if (card.Type == CardType.Virtual)
    {
        card.Shortcuts = configData.ConfigVirtual.Shortcuts;
        card.Buttons = configData.ConfigVirtual.Buttons;
    }
    card.FillShortcutsParams();
    card.FillButtonsParams();
}

var a = Newtonsoft.Json.JsonConvert.SerializeObject(listCard);




Console.ReadKey();