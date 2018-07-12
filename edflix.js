var edflixVm = new EdFlixViewModel();

var addVideoYesButton = document.getElementById("add-video-yes-button");
addVideoYesButton.addEventListener("click", function(event) { edflixVm.onAddVideoYesClicked(event) });

var addVideoNoButton = document.getElementById("add-video-no-button");
addVideoNoButton.addEventListener("click", function(event) { edflixVm.onAddVideoNoClicked(event) });
