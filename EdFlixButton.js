function EdFlixButton()
{
    var self = this;

    self.element = null; // will be the button once the
    // html is loaded from the template. see self.init()

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
        console.log("button clicked");
        if (self.url().length === 0)
        {
            chrome.runtime.sendMessage({"action": "get_url"}, self.setUrl);

            return;
        }

        // when the button already has the URL, then show the popup
        alert("The URL for this button is " + self.url());
    };

    self.init = function()
    {
        $("#xyz").load(chrome.extension.getURL("templates/edflix.template.html"), null, function() {
            console.log("applying bindings");
            self.element = document.getElementById("edflix-button");
            ko.applyBindings(self);
        });
    };

    self.init();
}
