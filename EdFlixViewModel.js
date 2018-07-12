function EdFlixViewModel()
{
    var self = this;

    self.url = ko.observable("");
    self.title = ko.observable("");

    self.addVideo = function()
    {
        console.log("adding video '" + self.title() + "'");
    };

    self.onAddVideoYesClicked = function(event)
    {
        self.addVideo();

        event.preventDefault();
    };

    self.onAddVideoNoClicked = function(event)
    {
        console.log("NOT adding video '" + self.title() + "'");

        event.preventDefault();
    };

    self.applyBindings = function()
    {
        ko.applyBindings(self, document.getElementById("edflix"));
    };

    self.init = function()
    {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            self.url(tabs[0].url);
            self.title(tabs[0].title);
        });

        self.applyBindings();
    };

    self.init();
}
