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

    self.editingNewVideo = false;

    // some elements -- like the video editor and new video item -- are
    // activated when necessary (shown in the place where they are
    // required), then deactivated when done (removed and placed back
    // in the body element)
    self.activateElement = function(element, parent, index)
    {
        element = $(element)[0];
        parent = $(parent)[0];

        index == undefined ? parent.appendChild(element) : parent.insertBefore(element, parent.childNodes[index]);

        $(element).show();
    };

    self.deactivateElement = function(element)
    {
        element = $(element)[0];

        ko.cleanNode(element);

        var bodyElement = $("body")[0];

        var parentElement = element.parentElement;
        if (parentElement && parentElement != bodyElement)
        {
            parentElement.removeChild(element);

            bodyElement.appendChild(element);
        }

        $(element).hide();
    };

    self.newVideo = function(videoData)
    {
        var newVideoElement = document.getElementById("new-video");

        var newVideoViewModel = new VideoViewModel(videoData, self.app);
        ko.applyBindings(newVideoViewModel, newVideoElement);

        self.activateElement("#new-video", "#video-list", 0);

        self.editingNewVideo = true;

        self.editVideo($("#new-video")[0]);
    };

    self.addVideo = function(videoData)
    {
        var newVideoViewModel = new VideoViewModel(videoData, self.app);
        newVideoViewModel.videoAdded(true);
        newVideoViewModel.videoIsNew(true);

        self.videos.unshift(newVideoViewModel);

        self.refresh();

        self.deactivateElement("#new-video");

        self.editingNewVideo = false;
    };

    self.removeVideo = function(videoData)
    {
        // first close the video editor. it's open because that's
        // how the remove event was triggered
        self.closeVideoEditor();

        // then find the video in the list...
        var video = _.find(self.videos(), function(v) {
            return v.url() == videoData.url;
        });

        // ..., remove it from the list...
        self.videos.remove(video);

        self.refresh();
    };

    self.discardVideo = function()
    {
        self.deactivateElement("#new-video");

        self.editingNewVideo = false;
    };

    self.editVideo = function(videoInfoElement)
    {
        // first check to see if the video editor element is already
        // editing *another* video...
        var videoEditorElement = $("#video-editor")[0];

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
            $(videoEditorParentElement).removeClass("active");

            ko.cleanNode(videoEditorElement);
        }

        // now we have one video editor element unbound to any video info
        // element, so connect the bindings and add the video editor to the
        // video info for editing
        var videoViewModel = ko.dataFor(videoInfoElement);

        ko.applyBindings(videoViewModel, videoEditorElement);

        self.activateElement(videoEditorElement, videoInfoElement);

        $(videoInfoElement).addClass("active");
    };

    self.filterVideos = function()
    {
        self.filteredVideos.removeAll();

        for (var i = 0; i < self.videos().length; i++)
        {
            var video = self.videos()[i];

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

    self.refresh = function()
    {
        // call this function whenever the original list of videos changes, because
        // the view works on the filtered videos not the original ones. refresh()
        // is a more intuitive name in those contexts
        self.filterVideos();
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

    self.onEditVideo = function(event)
    {
        // stop the click event from from bubbling up to the document,
        // otherwise the document's click handler will remove the editor
        // preventing it from editing the video
        event.stopPropagation();

        // check if the video info element is the new video element
        // in which case, don't allow editing that video until the
        // new video is done
        var videoInfoElement = $(this)[0];

        if ($(videoInfoElement).hasClass("adding-new"))
        {
            return;
        }

        if (self.editingNewVideo)
        {
            return;
        }

        self.editVideo(videoInfoElement);
    };

    self.initializeVideoEditor = function()
    {
        $("#video-editor").hide();
    };

    self.initializeNewVideo = function()
    {
        $("#new-video").hide();
    };

    self.closeVideoEditor = function()
    {
        // keep the video editor open if we're editing the new
        // video
        if (self.editingNewVideo)
        {
            return;
        }

        $("#video-editor").parent().removeClass("active");

        self.deactivateElement("#video-editor");

        self.editingNewVideo = false;
    };

    self.initializeEventHandlers = function()
    {
      $(document).on("click", self.closeVideoEditor);
      $("#video-list").on("click", ".video-info", self.onEditVideo);
    };

    self.initialize = function()
    {
        self.initializeVideos();
        self.initializeVideoEditor();
        self.initializeNewVideo();
        self.initializeFiltering();
        self.initializeEventHandlers();
    };

    self.initialize();
}
