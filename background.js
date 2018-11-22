function getUrl(tab)
{
    console.log(tab);
    return tab.url;
}


chrome.runtime.onMessage.addListener(
    function(request, sender, callback)
    {
        console.log("request: " + request + " sender: " + sender + " callback: " + callback);
        if (request.action === "get_url")
        {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                callback(getUrl(tabs[0]));
            });
        }
    }
);
