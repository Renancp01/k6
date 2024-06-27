using System.Reflection;
using System.Text.Json;

namespace ConsoleApp1.Models;

public enum LinkType
{
    Route,
    Deeplink,
    Action
}

public class Icon
{
    public string Value { get; set; }
}

public class Link
{
    public LinkType Type { get; set; }
    public string Text { get; set; }
    public string Url { get; set; }
    public Dictionary<string, object> Params { get; set; }

    public void FillParams(object source)
    {
        if (Params == null)
        {
            Params = new Dictionary<string, object>();
        }

        if (Type == LinkType.Action)
        {
            PropertyInfo[] properties = source.GetType().GetProperties();
            foreach (var property in properties)
            {
                string propName = property.Name;
                var propValue = property.GetValue(source);

                if (Params.ContainsKey(propName) && string.IsNullOrEmpty(Params[propName]?.ToString()))
                {
                    Params[propName] = propValue;
                }
            }
        }
    }
}

public class Shortcut
{
    public string WidgetKey { get; set; }
    public Icon Icon { get; set; }
    public Link Link { get; set; }
}

public class Button
{
    public Link Link { get; set; }
}

public enum CardType
{
    Fisico,
    Virtual
}

public class Card : Base
{
    public Guid CardId { get; set; }
    public string Number { get; set; }
    public CardType Type { get; set; }
}


public abstract class Base
{
    public List<Shortcut> Shortcuts { get; set; }
    
    public List<Button> Buttons { get; set; }

    public void FillShortcutsParams()
    {
        foreach (var shortcut in Shortcuts)
        {
            shortcut.Link.FillParams(this);
        }
    }

    public void FillButtonsParams()
    {
        foreach (var shortcut in Buttons)
        {
            shortcut.Link.FillParams(this);
        }
    }

    public string SerializeShortcuts()
    {
        return JsonSerializer.Serialize(Shortcuts, new JsonSerializerOptions { WriteIndented = true });
    }
}

public class Config
{
    public List<Shortcut> Shortcuts { get; set; }
    public List<Button> Buttons { get; set; }
}

public class ConfigurationData
{
    public Config ConfigVirtual { get; set; }
    public Config ConfigFisico { get; set; }
}

//public class ConfigWrapper
//{
//    public Config ConfigVirtual { get; set; }
//    public Config ConfigFisco { get; set; }
//}