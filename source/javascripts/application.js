$(document).ready(function(){
	// Activate Fastclick
	FastClick.attach(document.body);

	var $footer = $('.footer');
	var $header = $('.l-header');
	var $blocker = $('.content_blocker');
	var $body = $('body');
	var $html = $('html');
	var $main = $('.l-main');
	var $window = $(window);
	var $heroImage = $('.hero img');
	var $title = $('.entry-title');
	var $menuToggle = $('.subnav_button-toggle');
	var $subnav = $('.subnav');
	
	var _onResize = function() {		
		if(window.innerWidth < 960) {
			$html.addClass('is-mobile');
		} else {
			$html.removeClass('is-mobile');
			if($header.hasClass('is-open')) {
				_toggleMenu(null, true);
			}
		}

		_resizeMainContainer();
		_resizePostTitle();
		_setSubnavPosition();
	}

	var _resizeMainContainer = function() {
		// Fit the main content area to fill the height of the window if there isn't enough content
		var headerHeight = $header.height();
		var footerHeight = $footer.height();
		var fixedHeight = window.innerHeight - footerHeight - headerHeight;
		if($main.height() <= fixedHeight) {
			$footer.css({
				'position': 'fixed',
				'bottom': '0'
			});
			$html.height('100%');
			$body.height('100%');
			// $main.height(fixedHeight);
		} else {
			$footer.css({
				'position': 'relative',
				'bottom': 'auto'
			});
			$main.height('auto');
		}
	}

	var _resizePostTitle = function() {
		var titlePositionY = $title.height() * -1.5;
		$title.css({
			'top': titlePositionY
		});
	}

	$window.on('resize', _onResize);

	var _onScroll = function() {
		if(!$html.hasClass('touch') && !$html.hasClass('is-mobile') && $heroImage.length) {
			if($window.scrollTop() > $heroImage.height()) {
				$header.addClass('is-translucent');
			} else {
				$header.removeClass('is-translucent');
			}
		} else {
			$header.removeClass('is-translucent');
		}
	};

	$window.on('scroll', _onScroll);

	var _toggleMenu = function(e, quickMode) {
		if($header.hasClass('is-open')) {
			$header.removeClass('is-open');
			$blocker.removeClass('is-visible');
			$blocker.off('click', _toggleMenu);
			$html.removeClass('is-scrolling-blocked');

			if(!quickMode) {
				TweenMax.to($header, 0.42, {transform: 'translateY(0)', ease: Expo.easeInOut});
				TweenMax.to($blocker, 0.6, {opacity: 0, ease: Expo.easeInOut, delay: 0.1, onComplete: function(){
					$blocker.css({
						'display': 'none'
					})
				}});
			} else {
				TweenMax.set($header, {transform: 'translateY(0)'});
				TweenMax.set($blocker, {opacity: 0, display: 'none'});
			}
		} else {
			$header.addClass('is-open');
			$blocker.addClass('is-visible');
			$blocker.on('click', _toggleMenu);
			$html.addClass('is-scrolling-blocked');

			TweenMax.to($header, 0.42, {transform: 'translateY(' +  $subnav.height() + 'px)', ease: Expo.easeInOut});
			TweenMax.to($blocker, 0.3, {opacity: 1, ease: Expo.easeInOut, onStart: function(){
				$blocker.css({
					'display': 'block'
				})
			}});
		}
	}

	var _setSubnavPosition = function () {
		if($html.hasClass('is-mobile')) {
			$subnav.css({
				'top': -1 * $subnav.height()
			})
		} else {
			$subnav.css({
				'top': 0
			})
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

		$window.resize();

		$menuToggle.on('click', _toggleMenu);
	}
	_init();
});