$(document).ready(function() {
  streamers = [
    "ESL_SC2",
    "OgamingSC2",
    "cretetion",
    "freecodecamp",
    "storbeck",
    "habathcx",
    "RobotCaleb",
    "noobs2ninjas",
  ];
  streamers.sort();

  streamers.forEach(function(streamer) {
    $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamer + '?callback=?', function(json) {
      //declare variables
      var name;
      var icon;
      var status;
      var preview;
      
      if (json.stream === null) { // not currently streaming
        $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + streamer + '?callback=?', function(json2) { //get user details
          //get html - name header linking to account
          name = "<h2><a href=https://www.twitch.tv/" + streamer + ">" + json2.display_name + "</a></h2>";
          //does the streamer have a logo?
          if (json2.logo === null) {
            //no logo, use generic question mark
            icon = "<img class='logo' src='http://findicons.com/files/icons/1965/colorcons_smoke/128/questionmark.png'>"
          } else {
            //get html for icon
            icon = "<img class='logo' src='" + json2.logo + "'>";
          }
          
          //add the details to the page
        $("#main").append("<div class='result offline animated fadeInLeft'>" + icon + name + "<p>Offline</p></div>");
        }); //end of get json2 function
        
      } else { //user is streaming
        //get html for name linking to account
        name = "<h2><a href=" + json.stream.channel.url + ">" + json.stream.channel.display_name + "</a></h2>";
        //does the streamer have a logo?
        if (json.stream.channel.logo === null) {
          //as before, use generic logo
          icon = "<img class='logo' src='http://findicons.com/files/icons/1965/colorcons_smoke/128/questionmark.png'>"
        } else {
          //get logo
          icon = "<img class='logo' src='" + json.stream.channel.logo + "'>";
        }
        //get status of channel
        status = json.stream.channel.status;
        //get preview image (link to channel)
        preview = "<a href=" + json.stream.channel.url + ">" + "<p class='preview'><img src='" + json.stream.preview.medium + "'></a></p>";
        
        //add to page
        $("#main").append("<div class='result online animated fadeInLeft'>" + icon + name + "<p>" + status + "</p>" + preview + "</div>");
      }
      
    }) //end of get json function
    //if the username does not exist, getjson fails
    .fail(function() {
        $("#main").append("<div class='result inactive animated fadeInLeft'><img class='logo' src='http://findicons.com/files/icons/1965/colorcons_smoke/128/questionmark.png'><h2>" + streamer + "</h2><p>Username does not exist<p></div>")
      });
  });
});