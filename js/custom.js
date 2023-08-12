/*************************
	Navbar Sticky
**************************/	

var prevScrollpos = window.pageYOffset;
      window.onscroll = function() {

      var currentScrollpos = window.pageYOffset;
      if(prevScrollpos > currentScrollpos) {
            document.getElementById("navbar").classList.add("sticky-nav");
			if (window.pageYOffset == 0) {
				document.getElementById("navbar").classList.remove("sticky-nav");
			}
      } else {
            document.getElementById("navbar").classList.remove("sticky-nav");
      }

      prevScrollpos = currentScrollpos;

}


/***********************************
	Before & After Image Slider
***********************************/	

var moveSlider = false;
$(document).ready(function(){
    $(".ba-Slider").each(function(i){
        $(this).children(".slider").mousedown(function(){
             moveSlider = true;
            $(this).parent().children("#before").removeClass("ease");
            $(this).removeClass("ease");
        });
        $(this).children(".slider").mouseup(function(){
            moveSlider = false;
            $(this).parent().children("#before").addClass("ease");
            $(this).addClass("ease");
            var minmax = $(this).parent().width() / 8;
            if($(this).parent().children("#before").width() > $(this).parent().width() - minmax){
                $(this).parent().children("#before").width("100%");
                var sOffset = $(this).parent().width() - 16.5;
                $(this).css("left", sOffset);
            }else if($(this).parent().children("#before").width() < minmax){
                $(this).parent().children("#before").width(0);
                var sOffset = -16.5;
                $(this).css("left", sOffset);
             }
            
        });
        
        $(this).mouseup(function(){
            moveSlider = false;
            $(this).children("#before").addClass("ease");
            $(this).children(".slider").addClass("ease");
            var minmax = $(this).width() / 8;
            if($(this).children("#before").width() > $(this).width() - minmax){
                $(this).children("#before").width("100%");
                var sOffset = $(this).width() - 16.5;
                $(this).children(".slider").css("left", sOffset);
            }else if($(this).children("#before").width() < minmax){
                $(this).children("#before").width(0);
                var sOffset = -16.5;
                $(this).children(".slider").css("left", sOffset);
             }
            
            
        });
        $(this).mousemove(function(e){
            if(moveSlider == true){
                var pOffset = $(this).offset(); 
                var mouseX = e.pageX - pOffset.left;
                $(this).children("#before").width(mouseX - 0.5);
                var sOffset = mouseX - 16.5;
                $(this).children(".slider").css("left", sOffset);
            }
            
        });
    });
});


/****************************
	 Equal Height
****************************/

if ($(window).width() >= 768) {
	function setHeights() {
		$('.box-testimonial').css( 'height', 'auto' );
		// Select and loop the container element of the elements you want to equalise
		$('#sec-testimonials').each(function(){  
		  // Cache the highest
		  var highestBox = 0;
		  // Select and loop the elements you want to equalise
		  $('.box-testimonial', this).each(function(){
			// If this box is higher than the cached highest then store it
			if($(this).height() > highestBox) {
			  highestBox = $(this).height(); 
			}
		  });  
		  // Set the height of all those children to whichever was highest 
		  $('.box-testimonial',this).height(highestBox);		
		}); 
	}
	setHeights();
	setTimeout(setHeights, 3000);
	$( window ).on( 'resize', setHeights );	
}

/****************************
	 Scroll Top
****************************/    

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 100) {
    $("#toTop").fadeIn();
  } else {
    $("#toTop").fadeOut();
  }
});

$(document).on("click", "#toTop", function () {
  $("html, body").animate({ scrollTop: 0 }, 500);
});







/****************************
	 Loading
****************************/ 

anime({
  targets: 'ul li',
  // translateY: [30, 0],
  opacity: [0,1],
delay: anime.stagger(100, {start: 300}),
});

$(document).ready(function(){
  $('body').addClass('body-loaded');
});

$('a.nav-link').click(function(event){
	var url = $(this).attr('href');
	 event.preventDefault();
	 $('body').addClass('body-loader');
	  anime({
	  targets: 'ul li',
	  translateY: [0, -30],
	  opacity: [1,0],
	delay: anime.stagger(100, {start: 0}),
	});

setTimeout(function() { 
	window.location.href = url;
    }, 800);
  
});


/****************************
	 Padding Left
****************************/ 
if ($(window).width() >= 576) {
	var left = $(".container").offset().left;
	$("#sec-cta-porfolio, .padding-fluid-left").css("padding-left", left); 
}


/****************************
	 YouTube Video
****************************/ 

var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var tv,
	playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 0, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = [
  {'videoId': 'cMrjJVANsEM', 'startSeconds': 0, 'endSeconds': 46, 'suggestedQuality': 'hd720'} // sigur ros
],
	randomvid = Math.floor(Math.random() * (vid.length - 1 + 1));

function onYouTubePlayerAPIReady(){
  tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
  tv.loadVideoById(vid[randomvid]);
  tv.mute();
}

function onPlayerStateChange(e) {
  if (e.data === 1){
	$('#tv').addClass('active');
  } else if (e.data === 0){
	tv.seekTo(vid[randomvid].startSeconds)
  }
}

function vidRescale(){

  var w = $(window).width()+200,
	  h = $(window).height()+200;

  if (w/h > 16/9){
	tv.setSize(w, w/16*9);
	$('.tv .screen').css({'left': '0px'});
  } else {
	tv.setSize(h/9*16, h);
	$('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
  }
}

$(window).on('load resize', function(){
  vidRescale();
});

$('.hi span').on('click', function(){
  $('#tv').toggleClass('mute');
  if($('#tv').hasClass('mute')){
	tv.mute();
	$(this).siblings('i').html('unmute');
  } else {
	tv.unMute();
	$(this).siblings('i').html('mute');
  }
});


/****************************
	 Equal Height
****************************/ 

if ($(window).width() >= 768) {
	function setHeights() {
		$('.box-service-offer').css( 'height', 'auto' );
		// Select and loop the container element of the elements you want to equalise
		$('.block-service-offer').each(function(){  
		  // Cache the highest
		  var highestBox = 0;
		  // Select and loop the elements you want to equalise
		  $('.box-service-offer', this).each(function(){
			// If this box is higher than the cached highest then store it
			if($(this).height() > highestBox) {
			  highestBox = $(this).height(); 
			}
		  });  
		  // Set the height of all those children to whichever was highest 
		  $('.box-service-offer',this).height(highestBox);		
		}); 
	}
	setHeights();
	setTimeout(setHeights, 3000);
	$( window ).on( 'resize', setHeights );	
}


/****************************
	 Interactive
****************************/ 

function interactive (){

$('.small-image').click(function(){
    var imgsrc=$(this).attr('data-src');
    $('#large-image').attr('src',imgsrc);
	
	
	$(".small-image").removeClass("active");
    $(this).addClass("active");  
	
});

    const apiOriginUrl = 'https://platform.ar-ty.com';
    window.addEventListener("message", (event) => {
        if (event.origin === apiOriginUrl){
            let data = event.data;
            // your logic goes here
            console.log(data);
        }
    }, true);
}
interactive ();


