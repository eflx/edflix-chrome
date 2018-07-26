// Manages all videos that a user has bookmarked.
function VideosViewModel(videos)
{
    var self = this;

    // store a reference to the videos object received from the parent
    // view-model. this is an observable array of videos
    self.videos = videos;
    self.filteredVideos = ko.observableArray([]);

    self.search = ko.observable("");

    // filter criteria
    self.grades = VideoViewModel.grades;
    self.grade = ko.observable("");

    self.ratings = [0, 1, 2, 3, 4, 5];
    self.rating = ko.observable(0);

    self.subjects = VideoViewModel.subjects;
    self.subject = ko.observable("");

    self.filterVideos = function()
    {
        var allVideos = self.videos();

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

    self.initializeAllVideos = function()
    {
        for (var i = 0; i < localStorage.length; i++)
        {
            var video = JSON.parse(localStorage.getItem(localStorage.key(i)));

            console.log("[VideosViewModel.initializeVideos]: video title is '" + video.title + "'");

            var newVideoViewModel = new VideoViewModel(video, self.videos);
            newVideoViewModel.videoAdded(true);

            self.videos.push(newVideoViewModel);
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

        // ...and start it with filtering on nothing, so all
        // videos show
        self.filterVideos("");
    };

    //self.addVideo
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

    self.initializeNewVideo = function()
    {
        console.log("initializing new video");
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
                /*
                self.url(video.url);
                self.title(video.title);
                self.grade(video.grade);
                self.subject(video.subject);
                self.categories(video.categories);
                self.rating(parseInt(video.rating));
                self.comments(video.comments);
                */
                // select video in the list
                console.log("selecting video in the list");
            }
            else
            {
                /*
                self.url(url);
                self.title(tabs[0].title);
                self.grade("");
                self.subject("");
                self.categories("");
                self.rating(0);
                self.comments("");
                */

                video = {
                    url: url,
                    title: tabs[0].title,
                    grade: "",
                    subject: "",
                    categories: "",
                    rating: 0,
                    comments: ""
                };
                // create a new view model for the video and mark it
                // as added to the list
                console.log("adding video '" + tabs[0].title + "'");

                var videoViewModel = new VideoViewModel(video, self.videos);
                videoViewModel.videoAdded(true);

                self.videos.push(videoViewModel);
                self.filteredVideos.push(videoViewModel);
            }
        });
    };

    self.initialize = function()
    {
        /*
        for (var i = 0; i < localStorage.length; i++)
        {
            var video = JSON.parse(localStorage.getItem(localStorage.key(i)));

            self.videos.push(video);
        }
        */
        // first prepare the list UI, then initialize the new
        // video that the user just clicked on
        self.initializeAllVideos();
        self.initializeVideoEditor();
        self.initializeFiltering();
        self.initializeEventHandlers();
        self.initializeNewVideo();
    };

    self.initialize();
}
