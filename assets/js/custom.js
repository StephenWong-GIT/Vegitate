gapi.load("client", loadClient);
  
function loadClient() {
    gapi.client.setApiKey("YOUTUBE_API_KEY");
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
                function(err) { console.error("Error loading GAPI client for API", err); });