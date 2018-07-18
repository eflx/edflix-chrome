// Manages all bookmarks -- the set of all videos, articles, links, etc. --
// that a user has bookmarked.
function VideosViewModel(videos)
{
    var self = this;

    // store a reference to the videos object received from the parent
    // view-model. this is an observable array of videos
    self.videos = videos;

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
