// Manages all videos that a user has bookmarked.
function VideosViewModel(app)
{
    var self = this;

    self.app = app;

    self.videos = ko.observableArray([]);
    self.filteredVideos = ko.observableArray([]);

    self.search = ko.observable("");

    // filter criteria
    self.grades = self.app.grades;
    self.grade = ko.observable("");

    self.ratings = [0, 1, 2, 3, 4, 5];
    self.rating = ko.observable(0);

    self.subjects = self.app.subjects;
    self.subject = ko.observable("");

    self.removeVideo = function(video)
    {
        // first close the video editor. it's open because that's
        // how the remove event was triggered
        self.closeVideoEditor();

        // then find the video in the list...
        var videoToRemove = _.find(self.videos(), function(v) {
            return v.url() == video.url;
        });

        // ..., remove it from the list...
        self.videos.remove(videoToRemove);

        // ..., and filter the remaining videos again because the
        // list shows the filtered videos, not the original ones
        self.filterVideos();

        console.log("[VideosViewModel.removeVideo]: removed '" + videoToRemove.title() + "'");
    };

    self.filterVideos = function()
    {
        // sort videos by the sort criterion (todo: add sort criterion,
        // default is by title)
        var allVideos = _.sortBy(self.videos(), function(video) {
            return video.title();
        });

        self.filteredVideos.removeAll();

        for (var i = 0; i < allVideos.length; i++)
        {
            var video = allVideos[i];

            var videoTitle = video.title().toLowerCase();
            var searchTerm = self.search().toLowerCase();

            var titleMatches = (searchTerm == "") || (videoTitle.indexOf(searchTerm) != -1);
            var gradeMatches = (self.grade() == "") || (video.grade() == self.grade());
            var ratingMatches = (self.rating() == "") || (parseInt(video.rating()) >= parseInt(self.rating()));
            var subjectMatches = (self.subject() == "") || (video.subject() == self.subject());

            var videoMatches = titleMatches && gradeMatches && ratingMatches && subjectMatches;

            if (videoMatches)
            {
                self.filteredVideos.push(video);
            }
        }
    };

    self.initializeVideos = function()
    {
        // get all the videos from the app as a list (in the app videos
        // are stored as a map)...
        var videoList = _.map(self.app.videos, function(video, url){
            return video;
        });

        for (var i = 0; i < videoList.length; i++)
        {
            var videoViewModel = new VideoViewModel(videoList[i], self.app);
            videoViewModel.videoAdded(true);

            self.videos.push(videoViewModel);
        }
    };

    self.initializeFiltering = function()
    {
        // set the filter function to be called when the search
        // term changes, or when any of the filter criteria change...
        self.search.subscribe(self.filterVideos);
        self.grade.subscribe(self.filterVideos);
        self.rating.subscribe(self.filterVideos);
        self.subject.subscribe(self.filterVideos);

        // ...and jump start the filtering, so all videos show
        // initially
        self.filterVideos();
    };

    self.editVideo = function(event)
    {
        // stop the click event from from bubbling up to the document,
        // otherwise the document's click handler will remove the editor
        // preventing it from editing the video
        event.stopPropagation();

        var videoInfoElement = $(this)[0];

        // first check to see if the video editor element is already
        // editing *another* video...
        var videoEditorElement = $("#current-video")[0];

        var videoEditorParentElement = videoEditorElement.parentElement;

        // if we are editing A video already...
        if ($(videoEditorParentElement).hasClass("video-info"))
        {
            // ..., then if we are editing the CURRENT video...
            if (videoEditorParentElement == videoInfoElement)
            {
                // ..., then don't do anything with this click
                return;
            }

            // ..., otherwise, the click happened on ANOTHER video
            // so remove the editor from this element...
            videoEditorParentElement.removeChild(videoEditorElement);

            ko.cleanNode(videoEditorElement);
        }

        // now we have one video editor element unbound to any video info
        // element, so connect the bindings and add the video editor to the
        // video info for editing
        var videoViewModel = ko.dataFor(videoInfoElement);

        ko.applyBindings(videoViewModel, videoEditorElement);

        $(videoInfoElement)[0].appendChild(videoEditorElement);

        videoEditorElement.style.display = "block";
    };

    self.initializeVideoEditor = function()
    {
        var videoEditorElement = $("#current-video")[0];

        videoEditorElement.style.display = "none";
    };

    self.closeVideoEditor = function()
    {
        var bodyElement = $("body")[0];

        var videoEditorElement = $("#current-video")[0];

        if (videoEditorElement.parentElement && videoEditorElement.parentElement != bodyElement)
        {
            videoEditorElement.parentElement.removeChild(videoEditorElement);

            ko.cleanNode(videoEditorElement);

            bodyElement.appendChild(videoEditorElement);
        }

        videoEditorElement.style.display = "none";
    };

    self.initializeEventHandlers = function()
    {
      $(document).on("click", self.closeVideoEditor);
      $("#video-list").on("click", ".video-info", self.editVideo);
    };

    self.initialize = function()
    {
        self.initializeVideos();
        self.initializeVideoEditor();
        self.initializeFiltering();
        self.initializeEventHandlers();
    };

    self.initialize();
}
