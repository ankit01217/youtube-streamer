
function getListItem(item){
    var thumbnailURL = item.snippet.thumbnails.default.url;
    var itemHTML = '<li><a href="#" onclick="onItemClick(\''+item.id.videoId+'\')"><img src="'+thumbnailURL+'"><h2>'+item.snippet.title+'</h2><p>'+item.snippet.description+'</p></a></li>';
    //console.log(itemHTML);
    return itemHTML;
}

function onItemClick(videoId){
    //alert("on item click "+videoId);
    sessionStorage.videoId = videoId;

    $(document).on("pagebeforeshow", "#preview",function(){
        playVideo();

    });

    // Change page
    $.mobile.changePage("#preview");


}

$(document).on('keydown', '#search-1', function(event) {
    // This function wil be called.
    if(event.keyCode == 13)
    {
        stopSubmission = true;
        //getVideoList($('#search-1').val());
        $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+$('#search-1').val()+"&maxResults=30&type=video&key=AIzaSyA2Ix0wFmHFapgruDm5uh0iknYGmaj6RjY",function(response){

            var videoList = $('#video-list');
            videoList.empty();
            $.each(response.items, function() {

                videoList.append(getListItem(this));
                videoList.listview('refresh');
            });

            if (videoList.children().length == 0) {
                displayMessage('Your channel does not have any videos that have been viewed.');
            }
        });

        return false;
    }

});


/*
function stopVideo() {
    //player.stopVideo();
}

function playVideo(id){
    $('#ytplayer').attr('src','https://www.youtube.com/embed/'+id+'?autoplay=1');
    //player.videoId = id;
    //player.playVideo();

}


$( window ).on( "navigate",function( event, data ){
    if ( data.state.direction == "back" ) {
        // Make use of the directional information
        stopVideo();
        $.mobile.changePage("#home");

    }
});*/

