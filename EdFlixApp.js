function EdFlixApp()
{
    var self = this;

    self.grades = ["", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    self.subjects = ["", "ELA", "Science", "Social Studies", "Math", "Art", "Music", "Robotics", "Foreign Language", "PE"];

    self.videos = {};

    self.videosViewModel = null;

    self.newVideo = function()
    {
        var video = null;

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var url = tabs[0].url;

            video = JSON.parse(localStorage.getItem(url));

            // if the video was found in the list, then this is an
            // existing video (todo: highlight in the list)
            if (video)
            {
                return;
            }

            video = {
                url: tabs[0].url,
                title: tabs[0].title,
                grade: "K",
                rating: 0,
                categories: "",
                comments: ""
            };

            self.videosViewModel.newVideo(video);
        });
    };

    self.addVideo = function(video)
    {
        // add to the array of videos, then add to the videos viewmodel
        if (self.videos[video.url])
        {
            console.log("video already exists");

            return;
        }

        self.videos[video.url] = video;

        self.videosViewModel.addVideo(video);
    };

    self.removeVideo = function(video)
    {
        // remove from the array of videos, then remove from the videos viewmodel
        console.log("removing video '" + video.title + "'");

        delete self.videos[video.url];

        self.videosViewModel.removeVideo(video);
    };

    self.saveVideo = function(video)
    {
        console.log("saving video '" + video.title + "'");
    };

    self.shareVideo = function(video)
    {
        console.log("sharing video '" + url + "'");
    };

    self.initializeVideos = function()
    {
        for (var i = 0; i < localStorage.length; i++)
        {
            var video = JSON.parse(localStorage.getItem(localStorage.key(i)));

            self.videos[video.url] = video;
        }
    };

    self.initializeVideosView = function()
    {
        self.videosViewModel = new VideosViewModel(self);
    };

    self.applyBindings = function()
    {
        ko.applyBindings(self, document.getElementById("edflix"));
    };

    self.initialize = function()
    {
        self.initializeVideos();
        self.initializeVideosView();
        self.applyBindings();
    };

    self.initialize();
}
