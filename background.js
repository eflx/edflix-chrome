function getUrl(tab)
{
    return tab.url;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, callback)
    {
        if (request.action === "get_url")
        {
            // the sender is the tab
            callback(getUrl(sender));
        }
    }
);
