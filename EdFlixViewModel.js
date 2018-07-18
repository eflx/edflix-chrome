function EdFlixViewModel()
{
    var self = this;

    self.videoViewModel = new VideoViewModel();
    self.videosViewModel = new VideosViewModel();

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

    self.init = function()
    {
        self.showCurrentVideo();

        self.applyBindings();
    };

    self.init();
}
