jQuery(function($) {

	$('ul.screenshotcircles li:first-child').addClass('active');
	$('.workitems .item ul.screenshots li').hide();
	$('ul.screenshots li:first-child').fadeIn();
	
	
	$('ul.screenshotcircles li').click(function() {
		var n = $(this).parent('ul.screenshotcircles').find('li').index($(this));
		$(this).parent('.screenshotcircles').find('li').removeClass('active');
		$(this).addClass('active');
		$(this).parent('ul').parent('div').find('ul.screenshots li').fadeOut(500);
		$(this).parent('ul').parent('div').find('ul.screenshots li:eq('+n+')').fadeIn(500);
		return false;
	});
	
	$('#header a[href*=#]').click(function() {
	  $('#header li').removeClass('active');
	  $(this).parent('li').addClass('active');
	 	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	  		var $target = $(this.hash);
	   		$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
	   		if ($target.length) {
	  			var targetOffset = $target.offset().top - 50;
	  			$('html,body').animate({scrollTop: targetOffset}, 1000);
	    		return false;
	  		}
	 	}
	});
	
	
	$('#contact p.submit').children('input').remove();
    $('#contact p.submit').append('<input type="button" name="submit" id="submit" value="SEND MESSAGE" />');
    	
    $('#contact #submit').click(function() {
        var name = $('#contact input#name').val();
        var email = $('#contact input#email').val();
        var website = $('#contact input#website').val();
    	var message = $('#contact textarea#message').val();

        $.ajax({
            type: 'post',
        	url: './sendMessage.php',
        	data: 'name=' + name + '&email=' + email + '&website=' + website + '&message=' + message,

            success: function(results) {
            $('ul#response').css({"display":"block", "opacity":"0.0"});
            $('ul#response').animate({"opacity":"0.9"});
            var resultss = results + "<li class='click'>[CLICK TO REMOVE THIS MESSAGE]</li>";
            $('ul#response').html(resultss);
            }
        }); 
    });	
    
    $('ul#response').click(function() {
    	$(this).fadeOut();
    });
	
});