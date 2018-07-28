// Manages a single video that a user has bookmarked
function VideoViewModel(attributes, app)
{
    var self = this;

    self.app = app;

    self.url = ko.observable((attributes && attributes.url) ? attributes.url : "");
    self.title = ko.observable((attributes && attributes.title) ? attributes.title : "");
    self.grade = ko.observable((attributes && attributes.grade) ? attributes.grade : "");
    self.subject = ko.observable((attributes && attributes.subject) ? attributes.subject : "");
    self.categories = ko.observable((attributes && attributes.categories) ? attributes.categories : "");
    self.rating = ko.observable((attributes && attributes.rating) ? parseInt(attributes.rating) : 0);
    self.comments = ko.observable((attributes && attributes.comments) ? attributes.comments : "");

    self.grades = self.app.grades;
    self.subjects = self.app.subjects;

    self.videoAdded = ko.observable(false);

    self.videoIsNew = ko.observable(false);

    self.raw = function()
    {
        return {
            url: self.url(),
            title: self.title(),
            grade: self.grade(),
            subject: self.subject(),
            categories: self.categories(),
            rating: parseInt(self.rating()),
            comments: self.comments()
        };
    };

    /*
    self.addVideo = function()
    {
        console.log("adding video '" + self.title() + "'");

        video = {
            url: self.url(),
            title: self.title(),
            grade: self.grade(),
            subject: self.subject(),
            categories: self.categories(),
            rating: parseInt(self.rating()),
            comments: self.comments()
        };

        localStorage.setItem(self.url(), JSON.stringify(video));

        self.videos.push(new VideoViewModel(video));

        self.videoAdded(true);
    };
    */

    /*
    self.onAddVideoClicked = function(event)
    {
        self.addVideo();

        event.preventDefault();
    };
    */

    /*
    self.getVideo = function(url)
    {
        for (var i = 0; i < self.videos().length; i++)
        {
            var v = self.videos()[i];
            if (v.url() == url)
            {
                return v;
            }
        }

        return null;
    };
    */

    /*
    self.updateVideo = function(event)
    {
        console.log("updating video '" + self.title() + "'");

        var video = self.getVideo(self.url());

        if (!video)
        {
            return;
        }

        video.grade(self.grade());
        video.subject(self.subject());
        video.categories(self.categories());
        video.rating(parseInt(self.rating()));
        video.comments(self.comments());

        //localStorage.setItem(self.url(), JSON.stringify(video));
    }
    */

    /*
    self.onUpdateVideoClicked = function(event)
    {
        self.updateVideo();

        event.preventDefault();
    };
    */

    /*
    self.deleteVideo = function()
    {
        console.log("deleting video '" + self.title() + "'");

        localStorage.removeItem(self.url());

        // remove the video in the list with the same URL as in the
        // UI
        var remainingVideos = _.reject(self.videos(), function(video) {
            return video.url == self.url()
        });

        self.videos(remainingVideos);

        self.videoAdded(false);
    }
    */

    /*
    self.onDeleteVideoClicked = function(event)
    {
        self.deleteVideo();

        event.preventDefault();
    };
    */

    self.initialize = function()
    {
        /*
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
                self.subject(video.subject);
                self.categories(video.categories);
                self.rating(video.rating);
                self.comments(video.comments);

                self.videoAdded(true);
            }
            else
            {
                self.url(tabs[0].url);
                self.title(tabs[0].title);
                self.grade("");
                self.subject("");
                self.categories("");
                self.rating(0);
                self.comments("");

                self.videoAdded(false);
            }
        });
        */
    };

    self.initialize();
}
