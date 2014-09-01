$(document).ready(function(){
	// Activate Fastclick
	FastClick.attach(document.body);

	var $footer = $('.l-footer');
	var $main = $('.l-main');
	var $window = $(window);
	var $hero = $('.hero');
	var $subnav = $('.subnav');
	
	var _onResize = function() {
		// Fit the main content area to fill the height of the window if there isn't enough content
		if($main.height() < window.innerHeight - $footer.height()) {
			$main.height(window.innerHeight - $footer.height());
		}
	}

	var _onScroll = function () {
        window.scrollPosition = $window.scrollTop();    
		
		if(!$('html').hasClass('touch')) {
			var offsetY = Math.round(-0.5 * window.scrollPosition);
			TweenMax.set($hero, {'backgroundPosition': '50% ' +  offsetY + 'px'});
		}
    }

	$window.on('resize', _onResize);
	$window.resize();

	if(typeof $hero !== 'undefined') {
		$window.on('scroll', _onScroll);
	}

	var _init = function() {
		// Distinguish touch devices
		if(!!('ontouchstart' in window) || (!!('onmsgesturechange' in window) && !!window.navigator.maxTouchPoints)) {
			$('html').addClass('touch');
		}
	}
});