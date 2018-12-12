function EdFlixApp()
{
    var self = this;
    self.grades = ["", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    self.subjects = ["", "ELA", "Science", "Social Studies", "Math", "Art", "Music", "Robotics", "Foreign Language", "PE"];

    self.videos = {};
    self.videosViewModel = null;

    self.AuthValid =  function  () {
        // chrome.cookies.getAll({}, cookies => alert(JSON.stringify(cookies)))
        chrome.cookies.get({"url": "http://edtechdiary.com", "name": "edflix_user_auth"}, function(cookie) {
            if(cookie) {
                var temData = cookie.value.split('edflix_user_assess ')
                $('#login').css('display','block')
                $('#withoutlogin').css('display','none')          
            }
            else{
                $('#login').css('display','none')
                $('#withoutlogin').css('display','block')  
            }
        });

    }

    self.AuthValid();

    self.newVideo = function()
    {
        var video = null;
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var url = tabs[0].url;

            video = JSON.parse(localStorage.getItem(url));

            // if the video was found in the list, then this is an
            // existing video (todo: highlight in the list)
            if (video)
            {
                return;
            }

            video = {
                url: tabs[0].url,
                title: tabs[0].title,
                grade: "K",
                rating: 0,
                categories: "",
                comment: ""
            };
            self.videosViewModel.newVideo(video);
        });
    };

    self.addVideo = function(video)
    {
        // add to the array of videos, then add to the videos viewmodel
        video.comment = video.comment
        if (self.videos[video.url])
        {
            console.log("video already exists");

            return;
        }

        self.videos[video.url] = video;

        // localStorage.setItem(video.url, JSON.stringify(video));
        $.ajax({
            type: "POST",
            url: `https://edflix-platform.herokuapp.com/api/v1/users/${window.userid}/items`,
            headers: {'Authorization' : `Bearer ${window.assess_tokan}`},            
            data: video,
            success: function (response){
            console.log("View Added succesfully!")
            },
            error: function (error) {
            console.log("Error in sending data please check it!")
            },
            async: false
        });
        self.videosViewModel.addVideo(video);
    };

    self.removeVideo = function(video)
    {
        // remove from the array of videos, then remove from the videos viewmodel
        console.log("removing video '" + video.title + "'");

        delete self.videos[video.url];

        localStorage.removeItem(video.url);

        self.videosViewModel.removeVideo(video);
    };

    self.saveVideo = function(video)
    {
        console.log("saving video '" + video.title + "'");

        localStorage.setItem(self.url(), JSON.stringify(video));
    };

    self.shareVideo = function(video)
    {
        console.log("sharing video '" + url + "'");
    };

    self.discardVideo = function()
    {
        self.videosViewModel.discardVideo();
    };

    self.initializeData = function(data)
    {
        $.ajax({
            type: "get",
            url: `https://edflix-platform.herokuapp.com/api/v1/users/${window.userid}/items`,
            headers: {'Authorization' : `Bearer ${window.assess_tokan}`},
            success: function (response) {
                data(response)
            },
            error : function (error) {
                console.log("user log out")
            },
            async: false
        })
    };

    self.initializeVideos = function()
    {
        self.initializeData(function(response){
            var data = response.items
            for (var i = 0; i < data.length; i++)
            {
                var video = JSON.parse(JSON.stringify(data[i]))
                // console.log(video)
                self.videos[data[i].url] = video

            }        
            
        })
  
    };

    self.initializeVideosView = function()
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

        self.initializeVideosView();
        self.applyBindings();
    };
    self.initialize();
    
}
