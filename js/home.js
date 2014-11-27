

function getListItem(item){
    var thumbnailURL = item.snippet.thumbnails.default.url;
    var itemHTML = '<li><a id="'+item.id.videoId+'" href="#popupVideo" data-rel="popup" data-position-to="window" onclick="addIframePopup(\''+item.id.videoId+'\')"><img class="thumbImg" height="100%" src="'+thumbnailURL+'"><h2>'+item.snippet.title+'</h2><p>'+item.snippet.description+'</p></a><a href="http://youtubeinmp3.com/fetch/?video=https://www.youtube.com/watch?v='+item.id.videoId+'" target="_blank" id="download-btn" class="ui-btn ui-btn-b"></a></li>';
    
    return itemHTML;
}


function addIframePopup(videoId){
    //alert("addIframePopup");
    sessionStorage.videoId = videoId;

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



// popup functions
$( document ).on( "pagecreate", function() {
    // The window width and height are decreased by 30 to take the tolerance of 15 pixels at each side into account
    function scale( width, height, padding, border ) {
        var scrWidth = $( window ).width() - 30,
            scrHeight = $( window ).height() - 30,
            ifrPadding = 2 * padding,
            ifrBorder = 2 * border,
            ifrWidth = width + ifrPadding + ifrBorder,
            ifrHeight = height + ifrPadding + ifrBorder,
            h, w;
        if ( ifrWidth < scrWidth && ifrHeight < scrHeight ) {
            w = ifrWidth;
            h = ifrHeight;
        } else if ( ( ifrWidth / scrWidth ) > ( ifrHeight / scrHeight ) ) {
            w = scrWidth;
            h = ( scrWidth / ifrWidth ) * ifrHeight;
        } else {
            h = scrHeight;
            w = ( scrHeight / ifrHeight ) * ifrWidth;
        }
        return {
            'width': w - ( ifrPadding + ifrBorder ),
            'height': h - ( ifrPadding + ifrBorder )
        };
    };
    $( ".ui-popup iframe" )
        .attr( "width", 0 )
        .attr( "height", "auto" );
    $( "#popupVideo" ).on({
        popupbeforeposition: function() {
            //alert('before open');
            $("#youtube-iframe").attr("src","http://www.youtube.com/embed/"+sessionStorage.videoId+"?autoplay=1");

            // call our custom function scale() to get the width and height
            var size = scale( $( window ).width() *0.6, $( window ).height() *(0.6*4/3), 10, 1 ),
                w = size.width,
                h = size.height;
            $( "#popupVideo iframe" )
                .attr( "width", w )
                .attr( "height", h );
        },
        popupafteropen:function(){
            //$("#youtube-iframe").;

        },
        popupafterclose: function() {
            $("#youtube-iframe").attr("src","");

            $( "#popupVideo iframe" )
                .attr( "width", 0 )
                .attr( "height", 0 );
        }
    });
});



