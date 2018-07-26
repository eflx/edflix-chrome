// Manages a single video that a user has bookmarked
function VideoViewModel(videoAttributes, videos)
{
    var self = this;

    self.url = ko.observable((videoAttributes && videoAttributes.url) ? videoAttributes.url : "");
    self.title = ko.observable((videoAttributes && videoAttributes.title) ? videoAttributes.title : "");
    self.grade = ko.observable((videoAttributes && videoAttributes.grade) ? videoAttributes.grade : "");
    self.subject = ko.observable((videoAttributes && videoAttributes.subject) ? videoAttributes.subject : "");
    self.categories = ko.observable((videoAttributes && videoAttributes.categories) ? videoAttributes.categories : "");
    self.rating = ko.observable((videoAttributes && videoAttributes.rating) ? parseInt(videoAttributes.rating) : 0);
    self.comments = ko.observable((videoAttributes && videoAttributes.comments) ? videoAttributes.comments : "");

    self.grades = VideoViewModel.grades;
    self.subjects = VideoViewModel.subjects;

    // an observable array of videos to which the add/update/delete methods
    // will operate
    self.videos = videos;

    self.videoAdded = ko.observable(false);

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

        video.grade(self.grade());
        video.subject(self.subject());
        video.categories(self.categories());
        video.rating(parseInt(self.rating()));
        video.comments(self.comments());

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

        // remove the video in the list with the same URL as in the
        // UI
        var remainingVideos = _.reject(self.videos(), function(video) {
            return video.url == self.url()
        });

        self.videos(remainingVideos);

        self.videoAdded(false);
    }

    self.onDeleteVideoClicked = function(event)
    {
        self.deleteVideo();

        event.preventDefault();
    };

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
                self.rating(parseInt(video.rating));
                self.comments(video.comments);
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

                self.videos.push(new VideoViewModel(video, self.videos)));
            }

            self.videoAdded(true);
        });
        */
    };

    self.initialize();
}

VideoViewModel.grades = ["", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
VideoViewModel.subjects = ["", "ELA", "Science", "Social Studies", "Math", "Art", "Music", "Robotics", "Foreign Language", "PE"];