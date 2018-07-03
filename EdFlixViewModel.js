function EdFlixViewModel()
{
    var self = this;

    self.url = ko.observable("");
    self.title = ko.observable("");

    self.relevance = ko.observable(0); // 1-5
    self.grade = ko.observable("K"); // K-12
    self.easeOfUnderstanding = ko.observable(5); // 1-5

    self.videoAdded = ko.observable(false);

    self.addVideo = function()
    {
        console.log("adding video '" + self.title() + "'");
        self.videoAdded(true);
    };

    self.updateVideo = function()
    {
        console.log("updating video '" + self.title() + "'");
    }

    self.applyBindings = function()
    {
        ko.applyBindings(self, document.getElementById("edflix"));
    };

    self.attachEventHandlers = function()
    {
        var addVideoButton = document.getElementById("add-video");
        addVideoButton.addEventListener("click", self.addVideo);

        var updateVideoButton = document.getElementById("update-video");
        updateVideoButton.addEventListener("click", self.updateVideo);
    };

    self.init = function ()
    {
        console.log("applying bindings");

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            self.url(tabs[0].url);
            self.title(tabs[0].title);
            self.grade("K");
            self.relevance(5);
            self.easeOfUnderstanding(5);
        });

        self.applyBindings();
        self.attachEventHandlers();
    };

    self.init();
}
