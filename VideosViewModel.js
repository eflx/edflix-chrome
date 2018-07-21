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

    self.filterVideos = function(searchTerm)
    {
        var allVideos = self.videos();

        self.filteredVideos.removeAll();

        for (var i = 0; i < allVideos.length; i++)
        {
            var video = allVideos[i];

            var videoTitle = video.title.toLowerCase();
            var searchTerm = searchTerm.toLowerCase();

            if (videoTitle.indexOf(searchTerm) != -1)
            {
                self.filteredVideos.push(video);
            }
        }
    };

    self.initialize = function()
    {
        for (var i = 0; i < localStorage.length; i++)
        {
            var video = JSON.parse(localStorage.getItem(localStorage.key(i)));

            self.videos.push(video);
        }

        // set the filter function to be called when the search
        // term changes...
        self.search.subscribe(self.filterVideos);

        // ...and start it with filtering on nothing, so all
        // videos show
        self.filterVideos("");
    };

    self.initialize();
}
