var edflixVm = new EdFlixViewModel();

var addVideoButton = document.getElementById("add-video");
addVideoButton.addEventListener("click", function(event) { edflixVm.onAddVideoClicked(event) });

var updateVideoButton = document.getElementById("update-video");
updateVideoButton.addEventListener("click", function(event) { edflixVm.onUpdateVideoClicked(event) });

var deleteVideoButton = document.getElementById("delete-video");
deleteVideoButton.addEventListener("click", function(event) { edflixVm.onDeleteVideoClicked(event) });
