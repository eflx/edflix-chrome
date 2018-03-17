function EdFlixButton()
{
    var self = this;

    self.element = document.getElementById("edflix");

    self.url = ko.observable("");

    self.setUrl = function(url)
    {
        self.url(url);

        // turn button green
        self.element.classList.remove("btn-primary");
        self.element.classList.add("btn-success");
    };

    self.onClick = function()
    {
        if (self.url().length === 0)
        {
            chrome.runtime.sendMessage({"action": "get_url"}, self.setUrl);
        }
    };
}
