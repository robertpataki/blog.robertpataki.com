$(document).ready(function(){
	// Activate Fastclick
	FastClick.attach(document.body);

	var $footer = $('.footer');
	var $main = $('.l-main');
	var $window = $(window);
	var $heroImage = $('.hero img');
	var $title = $('.entry-title');
	
	var _onResize = function() {
		// Fit the main content area to fill the height of the window if there isn't enough content
		if($main.height() < window.innerHeight - $footer.height()) {
			$main.height(window.innerHeight - $footer.height());
		} else {
			$main.height('auto');
		}

		$title.css({
			'top': -1 * $title.height() * 1.5
		});
	}

	$window.on('resize', _onResize);
	setTimeout(function(){
		$window.resize();
	}, 100);

	var _init = function() {
		// Distinguish touch devices
		if(!!('ontouchstart' in window) || (!!('onmsgesturechange' in window) && !!window.navigator.maxTouchPoints)) {
			$('html').addClass('touch');
		}

		// Decent hero image loading and displaying
		$heroImage.css({'opacity': 0});
		$heroImage.one('load', function(e){
			_onResize();
			TweenMax.to($heroImage, 0.6, {css: {opacity: 1}, delay: 0.1, ease: Strong.easeOut});
		}).each(function(){
			if(this.complete) {
				$(this).load();
			};
		});
	}
	_init();
});