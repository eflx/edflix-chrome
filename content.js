/*
function saveUrl(url)
{
    if (isUrlSaved(url))
    {
        return;
    }

    var allUrls = chrome.storage.sync.get("urls");

    if (!allUrls)
    {
        allUrls = [];
    }

    console.log("saveUrl: saving url " + url);

    allUrls.append(url);

    chrome.storage.sync.set({"urls": allUrls});
}

function isUrlSaved(url)
{
    var allUrls = chrome.storage.sync.get("urls");

    var urlIsSaved = _.contains(savedUrls, url);

    console.log(urlIsSaved ? "url is already saved" : "url is NOT currently saved");

    return urlIsSaved;
}

function saveCurrentUrl()
{
    chrome.tabs.getCurrent(function(tab) {
        console.log("[saveCurrentUrl: saving url " + tab.url);

        saveUrl(tab.url);
    });
}
*/

function setup()
{
    var infoElement = document.getElementById("info-contents");

    // create the EdFlix element and insert it into the right place
    var edflixElement = document.createElement("div");

    edflixElement.id = "xyz";
    edflixElement.style = "padding: 8px; padding-left: 0";

    infoElement.parentElement.insertBefore(edflixElement, infoElement);

    new EdFlixButton();
}

var timer = setInterval(onDocumentLoaded, 1000);

function onDocumentLoaded()
{
    var watchElement = document.getElementsByTagName("ytd-watch")[0];

    if (!watchElement)
    {
        return;
    }

    clearInterval(timer);

    setup();
}
