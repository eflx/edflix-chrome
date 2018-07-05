function EdFlixViewModel()
{
    var self = this;

    self.url = ko.observable("");
    self.title = ko.observable("");

    self.rating = ko.observable(0); // 1-5
    self.grade = ko.observable("K"); // K-12
    self.intuitive = ko.observable(5); // 1-5

    self.videoAdded = ko.observable(false);

    self.addVideo = function(event)
    {
        console.log("adding video '" + self.title() + "'");

        video = {
            url: self.url(),
            title: self.title(),
            grade: self.grade(),
            rating: self.rating(),
            intuitive: self.intuitive()
        };

        localStorage.setItem(self.url(), JSON.stringify(video));

        self.videoAdded(true);

        event.preventDefault();
    };

    self.updateVideo = function(event)
    {
        console.log("updating video '" + self.title() + "'");

        var video = JSON.parse(localStorage.getItem(self.url()));

        if (!video)
        {
            return;
        }

        video.grade = self.grade();
        video.rating = self.rating();
        video.intuitive = self.intuitive();

        localStorage.setItem(self.url(), video);

        event.preventDefault();
    }

    self.applyBindings = function()
    {
        console.log("applying bindings");

        ko.applyBindings(self, document.getElementById("edflix"));
    };

    self.attachEventHandlers = function()
    {
        console.log("attaching event handlers");

        var addVideoButton = document.getElementById("add-video");
        if (addVideoButton)
        {
            addVideoButton.addEventListener("click", self.addVideo);
        }

        var updateVideoButton = document.getElementById("update-video");
        if (updateVideoButton)
        {
            updateVideoButton.addEventListener("click", self.updateVideo);
        }
    };

    self.init = function()
    {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var url = tabs[0].url;

            // if the video is already added, note that. this will
            // cause the ui to show the update button instead of
            // the add button
            if (localStorage.getItem(url))
            {
                self.videoAdded(true);

                return;
            }

            self.url(tabs[0].url);
            self.title(tabs[0].title);
            self.grade("K");
            self.rating(5);
            self.intuitive(5);
        });

        // attach the click event handlers to the buttons before binding the
        // elements to this view model because once the binding code runs,
        // the update button will be removed from the dom and will not get
        // its event handler
        self.attachEventHandlers();
        self.applyBindings();
    };

    self.init();
}
