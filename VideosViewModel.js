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

    // filter criteria
    self.grades = ["", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    self.grade = ko.observable("");

    self.ratings = ["", "1", "2", "3", "4", "5"];
    self.rating = ko.observable("");

    self.subjects = ["", "ELA", "Science", "Social Studies", "Math", "Art", "Music", "Robotics", "Foreign Language", "PE"];
    self.subject = ko.observable("");

    self.filterVideos = function()
    {
        var allVideos = self.videos();

        self.filteredVideos.removeAll();

        for (var i = 0; i < allVideos.length; i++)
        {
            var video = allVideos[i];

            var videoTitle = video.title.toLowerCase();
            var searchTerm = self.search().toLowerCase();

            var titleMatches = (searchTerm == "") || (videoTitle.indexOf(searchTerm) != -1);
            var gradeMatches = (self.grade() == "") || (video.grade == self.grade());
            var ratingMatches = (self.rating() == "") || (parseInt(video.rating) >= parseInt(self.rating()));
            var subjectMatches = (self.subject() == "") || (video.subject == self.subject());

            var videoMatches = titleMatches && gradeMatches && ratingMatches && subjectMatches;

            if (videoMatches)
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
        // term changes, or when any of the filter criteria change...
        self.search.subscribe(self.filterVideos);
        self.grade.subscribe(self.filterVideos);
        self.rating.subscribe(self.filterVideos);
        self.subject.subscribe(self.filterVideos);

        // ...and start it with filtering on nothing, so all
        // videos show
        self.filterVideos("");
    };

    self.initialize();
}
