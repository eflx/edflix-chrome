// create the new EdFlix application...
var app = new EdFlixApp();

// ..., then have the app process the new video from the
// user selection


$( document ).ready(function () {
    app.newVideo();
    $('#username').text(' ' +  window.edflixusername);
    $('#username').attr('title', window.edflixusername);
}); 