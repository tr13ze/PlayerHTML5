$(window).ready(function () {

    i = 0;
    
    
    var playListCount = $(".playsong").size();
    nowPlaying = $(".playsong");
    nowPlaying[i].load();

    var playing = false;

    $('.play').click(function () {
        //$(this).toggleClass("down");

        if (playing == false) {
            nowPlaying[i].play();
            playing = true;
            $(this).text("PAUSE");
            callMeta();

        } else {
            nowPlaying[i].pause();
            playing = false;
            $(this).text("PLAY");
            callMeta();
        }    
    
    });
    
    $(".next").click(function(){
        if ( i < playListCount-1 ) {
            $.each($("audio.playsong"),function(){
            this.pause();
            });
            ++i;
            nowPlaying[i].load();
            nowPlaying[i].play();
            callMeta();
        }
        
    
    });

    $(".prev").click(function(){
        if ( i >= playListCount-1 ) {
            $.each($("audio.playsong"),function(){
            this.pause();
            });
            --i;
            nowPlaying[i].load();
            nowPlaying[i].play();
            callMeta();
        }
        
    
    });      
      
    
    /*
    $(".next").click(function () {
        $.each($("audio.playsong"), function () {
            this.pause();
        });
        ++i;
        nowPlaying[i].load();
        nowPlaying[i].play();
        callMeta();
    });
    $(".prev").click(function () {
        $.each($("audio.playsong"), function () {
            this.pause();
        });
        --i;
        nowPlaying[i].load();
        nowPlaying[i].play();
        callMeta();
    });
*/


    $("audio.playsong").bind('timeupdate', function () {

        var track_length = nowPlaying[i].duration;
        var secs = nowPlaying[i].currentTime;
        var progress = (secs / track_length) * 100;

        $('#progress').css({
            'width': progress + "%"
        });

    })



    $("audio.playsong").bind("timeupdate", function () {
        $("#current_time").html(formatTime(nowPlaying[i].currentTime))
    });
    $("audio.playsong").bind("durationchange", function () {
        $("#duration_time").html(formatTime(nowPlaying[i].duration))
    });



    function formatTime(seconds) {
        var seconds = Math.round(seconds);
        var minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        minutes = (minutes >= 10) ? minutes : "0" + minutes;
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        return minutes + ":" + seconds;
    }

    if ($("audio.playsong").src = "") {
        $("#current_time").html("--:--");
        $("#duration_time").html("--:--");
    }



    function callMeta() {
        var trackTitle = $(nowPlaying[i]).attr("data-songtitle");
        $(".songtitle").html(trackTitle);
        var trackArtist = $(nowPlaying[i]).attr("data-songartist");
        $(".songartist").html(trackArtist);
        var albumart = $(nowPlaying[i]).attr("data-albumart");
        $("img.albumart").attr("src", albumart);
    }

});