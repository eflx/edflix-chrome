function Video(url, title)
{
    var self = this;

    self.url = ko.observable(url);
    self.title = ko.observable(title);
}

function EdFlixViewModel()
{
    var self = this;

    self.url = ko.observable("");
    self.title = ko.observable("");

    self.videos = ko.observableArray([]);

    self.grid = ko.computed(function() {
        return _.chunk(self.videos(), 3);
    });

    self.addVideo = function()
    {
        console.log("adding video '" + self.title() + "'");

        self.videos.push(Video(self.url(), self.title()));
    };

    self.onAcceptVideoClicked = function(event)
    {
        self.addVideo();

        event.preventDefault();
    };

    self.onRejectVideoClicked = function(event)
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

        for (var i = 0; i < localStorage.length; i++)
        {
            var video = JSON.parse(localStorage.getItem(localStorage.key(i)));

            self.videos.push(video);
        }

        self.applyBindings();
    };

    self.init();
}
