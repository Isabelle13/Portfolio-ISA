$(document).ready(function () {
	particlesJS('particles-js', {
		"particles": {
			"number": {
				"value": 80,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#6bccef"
			},
			"shape": {
				"type": "circle",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "img/github.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 3,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 30,
					"size_min": 0.1,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 6,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": false,
					"mode": "repulse"
				},
				"onclick": {
					"enable": false,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});

	$(".navbar-collapse").addClass("animated fadeInDown");
	$("#profile-img").addClass("animated fadeIn");
	$("span.name").parent().addClass("animated fadeInLeft");
	$("span.title").parent().addClass("animated fadeInRight");

	new WOW().init();

	$(".nav-link").on("click", function (e) {
		e.preventDefault();
		var targetSelector = $(this).attr("href");
		$(".navbar-collapse").collapse('hide');
		$("html, body").animate({
			scrollTop: $(targetSelector).offset().top - 80
		}, "slow");
	});
});


/*Skills*/
$(function () {

	// Rotate Skill Badges
	let $badges = $(".amg-badge img");

	function rotateBadge(passedBadge, speed) {
		let rotateSpeed = speed / 180,
			current = 0;

		function badgeRotation(passedBadge) {
			current = (current == 90) ? 271 : current + 1;

			passedBadge.css({
				"-webkit-transform": "rotate3d(0,1,0," + current + "deg)",
				"-moz-transform": "rotate3d(0,1,0," + current + "deg)",
				"transform": "rotate3d(0,1,0," + current + "deg)"
			});

			if (current == 360) {
				clearInterval(rotateInterval);
				passedBadge.removeAttr('style').removeClass('spinning');
			}
		}

		let rotateInterval = setInterval(function () { badgeRotation(passedBadge) }, rotateSpeed);
	}

	$badges.mouseenter(function () {
		if ($(this).hasClass('spinning')) {
			return false;
		} else {
			rotateBadge($(this), 500);
			$(this).addClass('spinning');
		}
	});

});

$(".hover").mouseleave(
	function () {
		$(this).removeClass("hover");
	}
);

/*projets*/
$(document).ready(function () {

	$("nav a").on("click", function (event) {
		$("nav").addClass("fixed");
		event.preventDefault();
		id = ($(this).attr("href"));
		scrollVertical = $(id).offset().top;

		$("body, html").animate({ scrollTop: scrollVertical });
	});

	$(document).on("scroll", function () {
		secondPage = $("nav li:nth-child(2) a").attr("href");

		if ($("body").scrollTop() >= $("nav").height()) {
			$("nav").addClass("fixed");
		} else {
			$("nav").removeClass("fixed");
		}
	});

});

/*portfolio*/
/**
* jquery.gallery.js
* http://www.codrops.com
*
* Copyright 2011, Pedro Botelho / Codrops
* Free to use under the MIT license.
*
* Date: Mon Jan 30 2012
*/

(function ($, undefined) {

	/*
	 * Gallery object.
	 */
	$.Gallery = function (options, element) {

		this.$el = $(element);
		this._init(options);

	};

	$.Gallery.defaults = {
		current: 0,	// index of current item
		autoplay: true,// slideshow on / off
		interval: 2000  // time between transitions
	};

	$.Gallery.prototype = {
		_init: function (options) {

			this.options = $.extend(true, {}, $.Gallery.defaults, options);

			// support for 3d / 2d transforms and transitions
			this.support3d = Modernizr.csstransforms3d;
			this.support2d = Modernizr.csstransforms;
			this.supportTrans = Modernizr.csstransitions;

			this.$wrapper = this.$el.find('.dg-wrapper');

			this.$items = this.$wrapper.children();
			this.itemsCount = this.$items.length;

			this.$nav = this.$el.find('nav');
			this.$navPrev = this.$nav.find('.dg-prev');
			this.$navNext = this.$nav.find('.dg-next');

			// minimum of 3 items
			if (this.itemsCount < 3) {

				this.$nav.remove();
				return false;

			}

			this.current = this.options.current;

			this.isAnim = false;

			this.$items.css({
				'opacity': 0,
				'visibility': 'hidden'
			});

			this._validate();

			this._layout();

			// load the events
			this._loadEvents();

			// slideshow
			if (this.options.autoplay) {

				this._startSlideshow();

			}

		},
		_validate: function () {

			if (this.options.current < 0 || this.options.current > this.itemsCount - 1) {

				this.current = 0;

			}

		},
		_layout: function () {

			// current, left and right items
			this._setItems();

			// current item is not changed
			// left and right one are rotated and translated
			let leftCSS, rightCSS, currentCSS;

			if (this.support3d && this.supportTrans) {

				leftCSS = {
					'-webkit-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
					'-moz-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
					'-o-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
					'-ms-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
					'transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)'
				};

				rightCSS = {
					'-webkit-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
					'-moz-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
					'-o-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
					'-ms-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
					'transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)'
				};

				leftCSS.opacity = 1;
				leftCSS.visibility = 'visible';
				rightCSS.opacity = 1;
				rightCSS.visibility = 'visible';

			}
			else if (this.support2d && this.supportTrans) {

				leftCSS = {
					'-webkit-transform': 'translate(-350px) scale(0.8)',
					'-moz-transform': 'translate(-350px) scale(0.8)',
					'-o-transform': 'translate(-350px) scale(0.8)',
					'-ms-transform': 'translate(-350px) scale(0.8)',
					'transform': 'translate(-350px) scale(0.8)'
				};

				rightCSS = {
					'-webkit-transform': 'translate(350px) scale(0.8)',
					'-moz-transform': 'translate(350px) scale(0.8)',
					'-o-transform': 'translate(350px) scale(0.8)',
					'-ms-transform': 'translate(350px) scale(0.8)',
					'transform': 'translate(350px) scale(0.8)'
				};

				currentCSS = {
					'z-index': 999
				};

				leftCSS.opacity = 1;
				leftCSS.visibility = 'visible';
				rightCSS.opacity = 1;
				rightCSS.visibility = 'visible';

			}

			this.$leftItm.css(leftCSS || {});
			this.$rightItm.css(rightCSS || {});

			this.$currentItm.css(currentCSS || {}).css({
				'opacity': 1,
				'visibility': 'visible'
			}).addClass('dg-center');

		},
		_setItems: function () {

			this.$items.removeClass('dg-center');

			this.$currentItm = this.$items.eq(this.current);
			this.$leftItm = (this.current === 0) ? this.$items.eq(this.itemsCount - 1) : this.$items.eq(this.current - 1);
			this.$rightItm = (this.current === this.itemsCount - 1) ? this.$items.eq(0) : this.$items.eq(this.current + 1);

			if (!this.support3d && this.support2d && this.supportTrans) {

				this.$items.css('z-index', 1);
				this.$currentItm.css('z-index', 999);

			}

			// next & previous items
			if (this.itemsCount > 3) {

				// next item
				this.$nextItm = (this.$rightItm.index() === this.itemsCount - 1) ? this.$items.eq(0) : this.$rightItm.next();
				this.$nextItm.css(this._getCoordinates('outright'));

				// previous item
				this.$prevItm = (this.$leftItm.index() === 0) ? this.$items.eq(this.itemsCount - 1) : this.$leftItm.prev();
				this.$prevItm.css(this._getCoordinates('outleft'));

			}

		},
		_loadEvents: function () {

			let _self = this;

			this.$navPrev.on('click.gallery', function (event) {

				if (_self.options.autoplay) {

					clearTimeout(_self.slideshow);
					_self.options.autoplay = false;

				}

				_self._navigate('prev');
				return false;

			});

			this.$navNext.on('click.gallery', function (event) {

				if (_self.options.autoplay) {

					clearTimeout(_self.slideshow);
					_self.options.autoplay = false;

				}

				_self._navigate('next');
				return false;

			});

			this.$wrapper.on('webkitTransitionEnd.gallery transitionend.gallery OTransitionEnd.gallery', function (event) {

				_self.$currentItm.addClass('dg-center');
				_self.$items.removeClass('dg-transition');
				_self.isAnim = false;

			});

		},
		_getCoordinates: function (position) {

			if (this.support3d && this.supportTrans) {

				switch (position) {
					case 'outleft':
						return {
							'-webkit-transform': 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
							'-moz-transform': 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
							'-o-transform': 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
							'-ms-transform': 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
							'transform': 'translateX(-450px) translateZ(-300px) rotateY(45deg)',
							'opacity': 0,
							'visibility': 'hidden'
						};
						break;
					case 'outright':
						return {
							'-webkit-transform': 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
							'-moz-transform': 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
							'-o-transform': 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
							'-ms-transform': 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
							'transform': 'translateX(450px) translateZ(-300px) rotateY(-45deg)',
							'opacity': 0,
							'visibility': 'hidden'
						};
						break;
					case 'left':
						return {
							'-webkit-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
							'-moz-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
							'-o-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
							'-ms-transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
							'transform': 'translateX(-350px) translateZ(-200px) rotateY(45deg)',
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
					case 'right':
						return {
							'-webkit-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
							'-moz-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
							'-o-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
							'-ms-transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
							'transform': 'translateX(350px) translateZ(-200px) rotateY(-45deg)',
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
					case 'center':
						return {
							'-webkit-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'-moz-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'-o-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'-ms-transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'transform': 'translateX(0px) translateZ(0px) rotateY(0deg)',
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
				};

			}
			else if (this.support2d && this.supportTrans) {

				switch (position) {
					case 'outleft':
						return {
							'-webkit-transform': 'translate(-450px) scale(0.7)',
							'-moz-transform': 'translate(-450px) scale(0.7)',
							'-o-transform': 'translate(-450px) scale(0.7)',
							'-ms-transform': 'translate(-450px) scale(0.7)',
							'transform': 'translate(-450px) scale(0.7)',
							'opacity': 0,
							'visibility': 'hidden'
						};
						break;
					case 'outright':
						return {
							'-webkit-transform': 'translate(450px) scale(0.7)',
							'-moz-transform': 'translate(450px) scale(0.7)',
							'-o-transform': 'translate(450px) scale(0.7)',
							'-ms-transform': 'translate(450px) scale(0.7)',
							'transform': 'translate(450px) scale(0.7)',
							'opacity': 0,
							'visibility': 'hidden'
						};
						break;
					case 'left':
						return {
							'-webkit-transform': 'translate(-350px) scale(0.8)',
							'-moz-transform': 'translate(-350px) scale(0.8)',
							'-o-transform': 'translate(-350px) scale(0.8)',
							'-ms-transform': 'translate(-350px) scale(0.8)',
							'transform': 'translate(-350px) scale(0.8)',
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
					case 'right':
						return {
							'-webkit-transform': 'translate(350px) scale(0.8)',
							'-moz-transform': 'translate(350px) scale(0.8)',
							'-o-transform': 'translate(350px) scale(0.8)',
							'-ms-transform': 'translate(350px) scale(0.8)',
							'transform': 'translate(350px) scale(0.8)',
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
					case 'center':
						return {
							'-webkit-transform': 'translate(0px) scale(1)',
							'-moz-transform': 'translate(0px) scale(1)',
							'-o-transform': 'translate(0px) scale(1)',
							'-ms-transform': 'translate(0px) scale(1)',
							'transform': 'translate(0px) scale(1)',
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
				};

			}
			else {

				switch (position) {
					case 'outleft':
					case 'outright':
					case 'left':
					case 'right':
						return {
							'opacity': 0,
							'visibility': 'hidden'
						};
						break;
					case 'center':
						return {
							'opacity': 1,
							'visibility': 'visible'
						};
						break;
				};

			}

		},
		_navigate: function (dir) {

			if (this.supportTrans && this.isAnim)
				return false;

			this.isAnim = true;

			switch (dir) {

				case 'next':

					this.current = this.$rightItm.index();

					// current item moves left
					this.$currentItm.addClass('dg-transition').css(this._getCoordinates('left'));

					// right item moves to the center
					this.$rightItm.addClass('dg-transition').css(this._getCoordinates('center'));

					// next item moves to the right
					if (this.$nextItm) {

						// left item moves out
						this.$leftItm.addClass('dg-transition').css(this._getCoordinates('outleft'));

						this.$nextItm.addClass('dg-transition').css(this._getCoordinates('right'));

					}
					else {

						// left item moves right
						this.$leftItm.addClass('dg-transition').css(this._getCoordinates('right'));

					}
					break;

				case 'prev':

					this.current = this.$leftItm.index();

					// current item moves right
					this.$currentItm.addClass('dg-transition').css(this._getCoordinates('right'));

					// left item moves to the center
					this.$leftItm.addClass('dg-transition').css(this._getCoordinates('center'));

					// prev item moves to the left
					if (this.$prevItm) {

						// right item moves out
						this.$rightItm.addClass('dg-transition').css(this._getCoordinates('outright'));

						this.$prevItm.addClass('dg-transition').css(this._getCoordinates('left'));

					}
					else {

						// right item moves left
						this.$rightItm.addClass('dg-transition').css(this._getCoordinates('left'));

					}
					break;

			};

			this._setItems();

			if (!this.supportTrans)
				this.$currentItm.addClass('dg-center');

		},
		_startSlideshow: function () {

			let _self = this;

			this.slideshow = setTimeout(function () {

				_self._navigate('next');

				if (_self.options.autoplay) {

					_self._startSlideshow();

				}

			}, this.options.interval);

		},
		destroy: function () {

			this.$navPrev.off('.gallery');
			this.$navNext.off('.gallery');
			this.$wrapper.off('.gallery');

		}
	};

	var logError = function (message) {
		if (this.console) {
			console.error(message);
		}
	};

	$.fn.gallery = function (options) {

		if (typeof options === 'string') {

			let args = Array.prototype.slice.call(arguments, 1);

			this.each(function () {

				let instance = $.data(this, 'gallery');

				if (!instance) {
					logError("cannot call methods on gallery prior to initialization; " +
						"attempted to call method '" + options + "'");
					return;
				}

				if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
					logError("no such method '" + options + "' for gallery instance");
					return;
				}

				instance[options].apply(instance, args);

			});

		}
		else {

			this.each(function () {

				let instance = $.data(this, 'gallery');
				if (!instance) {
					$.data(this, 'gallery', new $.Gallery(options, this));
				}
			});

		}

		return this;

	};

})(jQuery);

$(function () {
	$('#dg-container').gallery();

});

