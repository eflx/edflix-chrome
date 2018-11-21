// Manages a single video that a user has bookmarked
function VideoViewModel(videoData, app)
{
    var self = this;

    self.app = app;

    self.url = ko.observable((videoData && videoData.url) ? videoData.url : "");
    self.title = ko.observable((videoData && videoData.title) ? videoData.title : "");
    self.grade = ko.observable((videoData && videoData.grade) ? videoData.grade : "");
    self.subject = ko.observable((videoData && videoData.subject) ? videoData.subject : "");
    self.categories = ko.observable((videoData && videoData.categories) ? videoData.categories : "");
    self.rating = ko.observable((videoData && videoData.rating) ? parseInt(videoData.rating) : 0);
    self.comment = ko.observable((videoData && videoData.comment) ? videoData.comment : "");

    self.grades = self.app.grades;
    self.subjects = self.app.subjects;

    self.videoAdded = ko.observable(false);

    self.videoIsNew = ko.observable(false);

    self.raw = function()
    {
        return {
            url: self.url(),
            title: self.title(),
            grade: self.grade(),
            subject: self.subject(),
            categories: self.categories(),
            rating: parseInt(self.rating()),
            comment: self.comment()
        };
    };

    self.initialize = function()
    {
    };

    self.initialize();
}
