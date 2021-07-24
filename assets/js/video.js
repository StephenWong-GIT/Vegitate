gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey("AIzaSyAw-kJfm7f9eOk4vpEI3pYEoBIZuP1txDU");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); 