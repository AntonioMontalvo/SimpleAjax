console.log("Ajax requests: Wikimedia, YouTube and Spotify");
function itemRemoval(){
    $("#wikiSummary").remove();
    $("#description").remove();
    $("#summary").remove();
    $("#media").remove();
    $("#photo_canvas").remove();
    $("#gallery-row").remove();
    $(".col-lg-3 col-md-4 col-6").remove();
    $("#uTubeVideoTitle").remove();
    $("#frame").remove();
}


$("<div></div>").addClass("container-fluid").attr("id", "out").appendTo("body");
$("<div></div>").addClass("container-fluid").attr("id", "wikiSection").appendTo("body");
$("<div></div>").addClass("container-fluid").attr("id", "Tube").appendTo("body");
$("<div></div>").addClass("container-fluid").attr("id", "wikiPhotos").appendTo("body");

$("<h1>").addClass("display-3 mb-0").text("Wikipedia, YouTube and Giphy Search").appendTo("#out");

$("<div></div>").addClass("container-fluid").attr("id", "inside").appendTo("#out");


$("<form>").addClass("for-text-input");
$("<div></div>").addClass("form-group").attr("id", "out").appendTo("form");
$("<label>").attr({
    "for": "textarea-input",
    "id": "input-label",

}).text("Enter Artist, Album or Track below").appendTo("#out");
$("<input>").attr({
    "class": "form-control",
    "id": "user-input",
    "style": "display : flex"
}).appendTo("label");

$("<button>").attr({
    "type": "submit",
    "class": "btn btn-primary"
}).text("Submit").appendTo("#out");

$("<button>").attr({
    "type": "submit",
    "class": "btn btn-warning",
    "id" : "reset"
}).text("Reset Search").appendTo("#out");

var userRequest = "Duran Duran"
var counter = 0;
 $("button").on("click", function (){
     userRequest = $("#user-input").val();
     console.log(userRequest);
     if($("#user-input").val() !== ""){
         trigger();
     }
     $("#user-input").val("");
     counter++;
 });

$("#reset").on("click", function () {
itemRemoval();
});

//WIKIMEDIA AJAX REQUEST***********************************************
//The summary request
// var requestForWikiMedia;

function trigger() {
    if($("#Tube").length === 1) {
        itemRemoval();
    }

    $.ajax({
        url: "https://en.wikipedia.org/api/rest_v1/page/summary/" + userRequest.toLowerCase(),
        method: "GET"
    }).done(function (summary_response) {
        console.log("***The Wiki summary request***")
        console.log(summary_response)
        $("<h3>").attr({
            "id": "wikiSummary"
        }).appendTo("#wikiSection").text("Wikipedia Summary");

        $("<h5>").attr({
            "id": "description"
        }).text(summary_response.description).appendTo('#wikiSection');

        $("<p>").attr({
            "id": "summary"
        }).text(summary_response.extract).appendTo("#wikiSection");
    });

//THE GiPhy LIST REQUEST****************************************
//PixBay
    var giphyKey = 'mCwyynVes7w6HbUZse4t2HYt2Or7tvNJ';
    var giphyURL = "https://api.giphy.com/v1/gifs/search?api_key=mCwyynVes7w6HbUZse4t2HYt2Or7tvNJ&q="+userRequest+"&limit=25&offset=0&rating=g&lang=en"
    $("<h3>").attr({
        "id": "media",
        "class": "font-weight-light text-center text-lg-left mt-4 mb-0"
    }).text("Gif Gallery").appendTo('#wikiPhotos');

    $("<hr>").attr({
        "class": "mt-2 mb-5",
        "id": "photo_canvas"
    }).appendTo("#wikiPhotos");

    $("<div>").attr({
        "class": "row text-center text-lg-left",
        "id": "gallery-row"
    }).appendTo("#wikiPhotos");


    $.ajax({
        type: 'GET',
        url: giphyURL,
    }).done(function (giphyRes) {
        console.log("***Giphy response***");
        console.log(giphyRes.data)
        if(giphyRes.data.length === 0) {
            $("<h2>").text("This search engine did not generate any matches. Try something else!").appendTo("#gallery-row");
        }
        for (var i = 0; i < giphyRes.data.length; i++) {
            var gif = giphyRes.data[i].images.downsized.url;
            console.log(giphyRes.data[i].images.downsized.url);
            $("<div>").attr({
                "class": "col-lg-3 col-md-4 col-6",
                "id": "border" + i + ""
            }).appendTo("#gallery-row");

            $("<img>").attr({
                "class": "img-fluid img-thumbnail imagen",
                "src": gif
            }).appendTo("#border" + i + "");
        }
    });


//Youtube AJAX REQUEST***********************************************
    var goggleAPIKey = "AIzaSyD-6dGCSZUoVRpT4HAh6297YSzVbbAMgvM";

//var youTubeURL = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=u2%20w&regionCode=us&type=video&videoEmbeddable=true&alt=json&key=[YOUR_API_KEY]' \

    $.ajax({
        type: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: goggleAPIKey,
            q: userRequest,
            part: 'snippet',
            order: 'viewCount',
            maxResults: 5,
            type: 'video'
        }
    }).done(function (youTube_response) {
        console.log("***YouTube  response***")
        console.log(youTube_response)
        // console.log(youTube_response.items[0].id.videoId);

        $("<h3>").attr({"id": "uTubeVideoTitle"}).text("This is YouTube's most viewed video for your search").appendTo("#Tube");

        $("<div>").attr({
            "class": "embed-responsive embed-responsive-16by9",
            "id": "frame"
        }).appendTo('#Tube');

        $("<iframe>").attr({
            "class": "embed-responsive-item",
            "id": "uTube",
            "src": "https://www.youtube.com/embed/" + youTube_response.items[0].id.videoId + "?controls=1"
        }).appendTo("#frame");
    });
}



//Spotify AJAX REQUEST***********************************************

// var clientID = "112cf65e94824e258367e50f09e4edce";
// var clientSecret = "807c1bc0ff8c48aebce449a075e5eab9";
// var accessToken = "BQD884xN_DFHvuBHbf1l2CFTB0hZJxbLAckzzJGXMrqL-5ucN7QKzB5sR9uk6cxl5iKB3vXD-gVw9uXP_nlZkRSjuH2yf585jOuoGmskvhEZ9HVFgcYc7mvoHkpUeMrTkY8_M1Sl8go69wXv6bwNuPZ-tQG-J9r-ia8H6dGG06xCmAU3vvfRiAE8EDWeHPCyk1yyzLq46q9tsidVsSY0eTGpOpYc8dNxxA";
//this works, if you manually go to https://developer.spotify.com/console/get-search-item/ and request an OAuth Token. Paste it above where it says accessToken and run it.
// $.ajax({
//     type: 'GET',
//     url: "https://api.spotify.com/v1/search?query="+userRequest+"&type=artist&offset=0&limit=5",
//
//     headers: {
//         'Authorization': 'Bearer ' + accessToken
//     },
//     q : userRequest
//     ,error: function (request, status, error) {
//         alert(request.responseText);
//     }
//
// }).done(function (youTube_response){
//     console.log("***Spotify  response***")
//     console.log(youTube_response);
// });










