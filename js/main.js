

$(document).ready(function() {
	targetScrollFnc = function(targetName){
		var target = $('[data-scroll-id=' +targetName+']');
		if(target.length){
			var px = target.offset().top;
			var body = $("html, body");
			body.stop().animate({scrollTop:target.offset().top-30}, '1000', 'swing', function() {
			   if ($('.navigation_toogle').css('display') == 'block') {
					$('.navigation li:not(".navigation_toogle")').hide();
			   }
			});
		}
	};
	window.targetScrollFnc = targetScrollFnc;

	$('[data-scroll-target]').click(function(e){
		e.preventDefault();
		var targetName = $(this).data('scroll-target');
		targetScrollFnc(targetName);
	});

	$('.navigation_toogle').click(function(e){
		e.preventDefault();
		$('.navigation li:not(".navigation_toogle")').toggle();
	});

	var sticky = new Waypoint.Sticky({
	  element: $('.navigation')[0]
	});
});
