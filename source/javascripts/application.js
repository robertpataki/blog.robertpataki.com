$(document).ready(function(){
	// Activate Fastclick
	FastClick.attach(document.body);

	var $footer = $('.footer');
	var $header = $('.l-header');
	var $blocker = $('.content_blocker');
	var $html = $('html');
	var $main = $('.l-main');
	var $window = $(window);
	var $heroImage = $('.hero img');
	var $title = $('.entry-title');
	var $menuToggle = $('.subnav_button-toggle');
	
	var _onResize = function() {
		// Fit the main content area to fill the height of the window if there isn't enough content
		setTimeout(function(){
			var headerHeight = $header.height();
		var footerHeight = $footer.height();
		var fixedHeight = window.innerHeight - footerHeight - headerHeight;
		if($main.height() <= fixedHeight) {
			$main.height(fixedHeight);
		} else {
			$main.height('auto');
		}
		}, 10);

		$title.css({
			'top': -1 * $title.height() * 1.5
		});

		if(window.innerWidth < 960) {
			$html.addClass('is-mobile');
		} else {
			$html.removeClass('is-mobile');
			$html.removeClass('is-scrolling-blocked');
			$header.removeClass('is-open');
			$blocker.removeClass('is-visible');
		}
	}

	$window.on('resize', _onResize);
	setTimeout(function(){
		$window.resize();
	}, 100);
	$window.resize();

	var toggleMenu = function(e) {
		if($header.hasClass('is-open')) {
			$header.removeClass('is-open');
			$blocker.removeClass('is-visible');
			$blocker.off('click', toggleMenu);
			$html.removeClass('is-scrolling-blocked');
		} else {
			$header.addClass('is-open');
			$blocker.addClass('is-visible');
			$blocker.on('click', toggleMenu);
			$html.addClass('is-scrolling-blocked');
		}
	}

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

		$menuToggle.on('click', toggleMenu);
	}
	_init();
});