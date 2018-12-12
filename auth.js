//Set userid and auth0 assess_tokan to API call

window.userid = 0
window.assess_tokan = 0

chrome.cookies.get({"url": "http://edtechdiary.com", "name": "edflix_user_auth"}, function(cookie) {
    if(cookie) {
        var temData = cookie.value.split('edflix_user_assess ')
        window.userid  = temData[0];
        window.assess_tokan = temData[1]   
        window.edflixusername = temData[2]  
    }
  
});