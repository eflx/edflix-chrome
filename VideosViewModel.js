// Manages all bookmarks -- the set of all videos, articles, links, etc. --
// that a user has bookmarked.
function VideosViewModel(videos)
{
    var self = this;

    // store a reference to the videos object received from the parent
    // view-model. this is an observable array of videos
    self.videos = videos;
    self.filteredVideos = ko.observableArray([]);

    self.search = ko.observable("");

    self.filterVideos = function()
    {
        console.log("in filterVideos");
        var allVideos = self.videos();

        console.log("search is " + self.search());
        for (var i = 0; i < allVideos.length; i++)
        {
            var video = allVideos[i];

            if (video.title.indexOf(self.search()) != -1)
            {
                console.log("found " + video.title);
                self.filteredVideos.push(video);
            }
        }
    };

    self.onSearchChanged = function(event)
    {
        console.log("in onsearchchanged");
        self.filterVideos();
    };

    self.initialize = function()
    {
        for (var i = 0; i < localStorage.length; i++)
        {
            var video = JSON.parse(localStorage.getItem(localStorage.key(i)));

            self.videos.push(video);
        }
    };

    self.initialize();
}
