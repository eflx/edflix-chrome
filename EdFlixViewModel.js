function EdFlixViewModel()
{
    var self = this;

    // store all the videos in this object...
    self.videos = ko.observableArray([]);

    // ...and pass it to the nested objects to manipulate.
    // that way the single video view and the list of videos
    // will stay in sync
    self.videoViewModel = new VideoViewModel(self.videos);
    self.videosViewModel = new VideosViewModel(self.videos);

    self.view = ko.observable("current");

    self.showCurrentVideo = function(event)
    {
        self.view("current");
    };

    self.showAllVideos = function(event)
    {
        self.view("all");
    };

    self.applyBindings = function()
    {
        ko.applyBindings(self, document.getElementById("edflix"));
    };

    self.initialize = function()
    {
        self.showAllVideos();

        self.applyBindings();
    };

    self.initialize();
}
