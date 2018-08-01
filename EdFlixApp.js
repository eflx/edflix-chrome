function EdFlixApp()
{
    var self = this;

    self.grades = ["", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    self.subjects = ["", "ELA", "Science", "Social Studies", "Math", "Art", "Music", "Robotics", "Foreign Language", "PE"];

    self.videos = {};

    self.videosViewModel = null;

    self.addVideo = function(video)
    {
        // add to the array of videos, then add to the videos viewmodel
        console.log("adding video '" + video.title + "'");

        if (self.videos[video.url])
        {
            console.log("video already exists");

            return;
        }

        self.videos[video.url] = video;
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
        self.videos["http://knockoutjs.com/documentation/computedObservables.html"] = {
            url: "http://knockoutjs.com/documentation/computedObservables.html",
            title: "Knockout Computed Observables",
            grade: "K",
            subject: "Science",
            categories: ["programming", "javascript"],
            rating: 4,
            comments: "Knockout JS"
        };

        self.videos["https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iii-web-forms"] = {
            url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-iii-web-forms",
            title: "The Flask Mega-Tutorial Part III: Web Forms -- miguelgrinberg.com",
            grade: "K",
            subject: "Social Studies",
            categories: ["programming", "python", "flask"],
            rating: 5,
            comments: "Flask"
        };

        self.videos["https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates"] = {
            url: "https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-ii-templates",
            title: "The Flask Mega-Tutorial Part II: Templates -- miguelgrinberg.com",
            grade: 2,
            subject: "Robotics",
            categories: ["programming", "python"],
            rating: 3,
            comments: "Templates"
        };
    };

    self.initializeVideosViewModel = function()
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
        self.initializeVideosViewModel();
        self.applyBindings();
    };

    self.initialize();
}
