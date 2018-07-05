var edflixVm = new EdFlixViewModel();

var addVideoButton = document.getElementById("add-video");
addVideoButton.addEventListener("click", function(event) { edflixVm.addVideo(event) });

var updateVideoButton = document.getElementById("update-video");
updateVideoButton.addEventListener("click", function(event) { edflixVm.updateVideo(event) });
