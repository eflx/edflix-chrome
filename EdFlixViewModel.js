function EdFlixViewModel()
{
    var self = this;

    self.url = ko.observable("");
    self.title = ko.observable("");

    self.grades = ["n/a", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    self.ratings = ["1", "2", "3", "4", "5"];

    self.rating = ko.observable(0); // 0-5
    self.grade = ko.observable("K"); // K-12
    self.categories = ko.observable("");
    self.comments = ko.observable("");

    self.videoAdded = ko.observable(false);

    self.addVideo = function()
    {
        console.log("adding video '" + self.title() + "'");

        video = {
            url: self.url(),
            title: self.title(),
            grade: self.grade(),
            rating: self.rating(),
            categories: self.categories(),
            comments: self.comments()
        };

        localStorage.setItem(self.url(), JSON.stringify(video));

        self.videoAdded(true);
    };

    self.onAddVideoClicked = function(event)
    {
        self.addVideo();

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
        video.categories = self.categories();
        video.comments = self.comments();

        localStorage.setItem(self.url(), JSON.stringify(video));
    }

    self.onUpdateVideoClicked = function(event)
    {
        self.updateVideo();

        event.preventDefault();
    };

    self.deleteVideo = function()
    {
        console.log("deleting video '" + self.title() + "'");

        localStorage.removeItem(self.url());

        self.videoAdded(false);
    }

    self.onDeleteVideoClicked = function(event)
    {
        self.deleteVideo();

        event.preventDefault();
    };

    self.applyBindings = function()
    {
        ko.applyBindings(self, document.getElementById("edflix"));
    };

    self.init = function()
    {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs)
        {
            var url = tabs[0].url;

            // if the video is already added, note that. this will
            // cause the ui to show the update button instead of
            // the add button. if not, then add the video, so the
            // user does not have to click again
            var video = JSON.parse(localStorage.getItem(url));

            if (video)
            {
                self.url(video.url);
                self.title(video.title);
                self.grade(video.grade);
                self.rating(video.rating);
                self.categories(video.categories);
                self.comments(video.comments);

                self.videoAdded(true);
            }
            else
            {
                self.url(tabs[0].url);
                self.title(tabs[0].title);
                self.grade("K");
                self.rating(0);
                self.categories("");
                self.comments("");

                self.addVideo();
            }
        });

        self.applyBindings();
    };

    self.init();
}
