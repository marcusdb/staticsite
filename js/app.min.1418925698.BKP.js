// rb.modulePrototype = (function(){
//     return {
//         init: function() {

//         }
//     };
// })();

/* TOC

 @MAIN
 @MASTHEAD
 @TIMER
 @FEATURE (HOME)
 @CAROUSEL
 @TEAM MEMBERS LIST
 @AMAZING MAGICALLY MUTATING TABS
 @PILL TABS
 @VERTICAL TABS
 @TELEPORT
 @INLINESVG
 @VERTICAL CENTERING
 @AJAX REPLACE

 TOC */

/*-----------------------*/

jQuery.fn.centerH = function () {
    this.css("position","absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + 
                                                $(window).scrollTop()) + "px");
    return this;
}

jQuery.fn.centerW = function () {
    this.css("position","absolute");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 
                                                $(window).scrollLeft()) + "px");
    return this;
}

var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

$.event.special.swipeupdown = {
    setup: function() {
    	console.log("setup");
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function(event) {
        	console.log("$this.bind(touchStartEvent, function(event) {");
            var data = event.originalEvent.touches ?
                    event.originalEvent.touches[ 0 ] :
                    event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ],
                        origin: $(event.target)
                    },
                    stop;

            function moveHandler(event) {
            	console.log("moveHandler");
                if (!start) {
                    return;
                }
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event;
                stop = {
                    time: (new Date).getTime(),
                    coords: [ data.pageX, data.pageY ]
                };

                // prevent scrolling
                if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                    event.preventDefault();
                }
            }
            $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function(event) {
                $this.unbind(touchMoveEvent, moveHandler);
                if (start && stop) {
                    if (stop.time - start.time < 1000 &&
                            Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                            Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                        start.origin
                                .trigger("swipeupdown")
                                .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                    }
                }
                start = stop = undefined;
            });
        });
    }
};

$.each({
    swipedown: "swipeupdown",
    swipeup: "swipeupdown"
}, function(event, sourceEvent){
    $.event.special[event] = {
        setup: function(){
        	console.log("setup");
            $(this).bind(sourceEvent, $.noop);
        }
    };
});

if (typeof rb == 'undefined') {
	var rb = {};
}

$(window).resize(function() {
	if (this.resizeTO) {
		clearTimeout(this.resizeTO);
	}
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	}, 500);
});

var scrollTripped = 0;
var $slider;

/*-----------------------
 @MAIN
 ------------------------*/
rb.main = (function() {

	return {
		isMobile: false,
		init: function() {

			$.Android = (navigator.userAgent.match(/Android/i));
			$.iPhone = ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)));
			$.iPad = ((navigator.userAgent.match(/iPad/i)));
			$.iOs4 = (/OS [1-4]_[0-9_]+ like Mac OS X/i.test(navigator.userAgent));

			if ($.iPhone || $.iPad || $.Android) {
				this.isMobile = true;
			}
			this.registerEvents();
			this.resizeBindings();
		},
		registerEvents: function() {
			/*

			ESSAS DUAS FUNCOES PODE TER ALGUM SENTINDO.


			rb.masthead.init();
			rb.navbar.init();

			*/
			
			if ($("body.page-home").length) {
				rb.feature.init();
			}
			/*if ($(".m_tabs").length) {
				console.log("2")
				rb.tabs.init();
			}
			if ($(".m_pill-tabs").length) {
				console.log("3")
				rb.pillTabs.init();
			}
			if ($(".m_tabs-vertical").length || $(".m_tabs-horizontal").length) {
				console.log("4")
				rb.basicTabs.init();
			}
			if ($(".m_teleport").length) {
				console.log("5")
				rb.teleport.init();
			}
			if ($(".m_modal").length) {
				console.log("6")
				rb.modal.init();
			}
			if ($("[data-ajax-append]").length) {
				console.log("7")
				rb.loadMore.init();
			}
			if ($(".homeSlides").length) {
				console.log("8")
				rb.home.init();
			}
			if($('.page-case-study').length) {
				console.log("9")
				rb.video.init();
			}
			if($('.alert-bar').length) {
				rb.alert.init();
			}*/
			//$(".fitvids").fitVids();

			//rb.loading.init($('.page-case-study').length);
			/*
			$(window).load(function() {
				if ($("[data-inlinesvg]").length) {
					rb.inlinesvg.init();
				}
				
				if ($(".m_carousel").length) {
				rb.carousel.prep();
				}
				if ($(".page-case-study").length) {
					console.log("13")
					rb.casestudy.init();
				}
			});
			*/
		},
		windowWide: function() {
			console.log("windowWide")
			return $(window).width() > 767 ? true : false;
		},
		isTouchDevice: function() {
			console.log("isTouchDevice")
			console.log("                                        ")
			var is_touch_device = 'ontouchstart' in document.documentElement;
			return is_touch_device;
		},
		rgbToHex: function(rgb) {
			console.log("rgbToHex")
		    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    function hex(x) {
		        return ("0" + parseInt(x).toString(16)).slice(-2);
		    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		},
		/*setLogoColors: function(bolt, letters)
		{
			var boltColor = bolt ? bolt : $('.brand .bolt').attr('data-original-fill');
			var letterColor = letters ? letters : $('.brand .letter').attr('data-original-fill');

			$("body .brand .bolt").animate({
				fill: boltColor
			}, 200);
			$("body .brand .letter").animate({
				fill: letterColor
			}, 200);
		},
		
		scrollBindings: function() {
			console.log("dsdda")
			if($('.page-case-study').length) {
				if($(window).width() >= 1200 && !rb.main.isMobile) {
					rb.casestudy.playOrPauseHero();
					rb.casestudy.fadeInObjects();
					rb.parallax.doCaseStudy();
				}
			}
			else {
				if($(window).width() >= 1200 && $('.page-home').length == 0) {
					rb.parallax.doStandard();
				}
			}
		},
		*/
		resizeBindings: function() {
		
			if($(window).width() < 1200 || rb.main.isMobile) rb.parallax.resetStandard();
			
			var paddingdatafarma = ($(window).width() / 2) - 414;
			
			$(".datafarma3-line1").css("left", paddingdatafarma);
			$(".datafarma3-line2").css("left", paddingdatafarma);

			var lefttxtdatafarma6 = ($(window).width() / 2) - ($(".txt-datafarma6").width() * 0.5);
			
			if($('body').attr('data-project') == "datafarma5"){

				if($(window).width() > 1200){
					$(".aba-esq").css("left",  -280 )
					$(".aba-dir").css("right",  -280 )
				}else{
					$(".aba-esq").css("left",  - ((1200+280)-$(window).width()) )
					$(".aba-dir").css("right", - ((1200+280)-$(window).width()) )
				}
								
			}


			if($('body').attr('data-project') == "datafarma6"){

				if($(window).width() > 1200){
					$(".aba-esq").css("left",  0 )
					$(".aba-dir").css("right",  0 )
				}else{
					$(".aba-esq").css("left",  - ((1200)-$(window).width()) )
					$(".aba-dir").css("right", - ((1200)-$(window).width()) )
				}
								
			}
						
		}
		
	};
})();

/*-----------------------
 @AJAX REPLACE

 Replace append content from ajax response
 ------------------------*/
 /*
rb.loadMore = (function() {

	appendContent = function($clicked) {
		var ajaxUrl = $clicked.attr('href');
		var resultContainerSelector = $clicked.attr('data-ajax-append');
		var $resultContainer = $(resultContainerSelector);

		// get the old offset
		var offset = ajaxUrl.match(/offset=(.*)/)[1];

		// add 10 to the old offset
		var newOffset = parseInt(offset) + 10;

		var contents = $.get(ajaxUrl, function(data) {
			if (data) {
				// update the ajax url with the new offset
				$clicked.attr('href', ajaxUrl.replace('offset=' + offset, 'offset=' + newOffset));

				// add the content
				$resultContainer.append(data);

				$flag = $resultContainer.find('[data-no-more-posts]');
				if($flag.length > 0) {
					$clicked.hide();
				}

			} else {
				$clicked.text('Sorry, No More Posts');
			}
		});
	}

	return {
		init: function() {
			$('body').on('click', '[data-ajax-append]', function(e) {
				e.preventDefault();
				appendContent($(this));
			});
		}
	};
})();
*/
/*-----------------------
 @MASTHEAD

 Adding a background and adjusting padding when scroll position is greater than .m_jumbotron height.
 ------------------------*/
/*
rb.masthead = (function() {
	var settings = {
		$scroller: $(window),
		$masthead: $(".masthead"),
		$jumboHeight: $(".m_jumbotron").outerHeight() / 2,
		$mHeightFixed: $(".masthead").outerHeight(),
	}
	return {
		init: function() {


			if ($("body.page-blog").length || $("div.no-header-image").length) {
				// blog listing page uses fixed by default
				settings.$masthead.addClass("is-fixed");
			} else {
				settings.$masthead.addClass("ready-to-fix");
				this.doFixed();
			}
		},
		doFixed: function() {
			settings.$scroller.scroll(function() {
				rb.masthead.isItFixed();
			});
			rb.masthead.isItFixed();
		},
		isItFixed: function() {
			if (settings.$scroller.scrollTop() > settings.$jumboHeight - settings.$mHeightFixed && $('.page-home').length == 0) {
				settings.$masthead.addClass("is-fixed");
			} else {
				settings.$masthead.removeClass("is-fixed");
			}
		}
	};
})();
*/
/*-----------------------
 @NAVBAR
 ------------------------*/
/*
rb.navbar = (function() {
	var htmlHeight = 0,
		scrollPos = 0,
		currentTopMargin,
		currentTopOffset,
		wasNavFixed = false;

	return {
		init: function() {
			$(".menu-trigger").on("click", function(e) {
				e.preventDefault();
				if ($("#st-container").hasClass("menu-open")) {
					setTimeout(function() {
						$(".st-content").prependTo("body");
						$(".masthead").prependTo("body");

						if($('body').hasClass('page-home')) {
							rb.feature.rebindScroll();
						}
						rb.video.play();
						$('html,.st-container').height(htmlHeight + "px");
						$('.st-container').height('0');
						$(window).scrollTop(scrollPos);
						$(window).trigger('scroll');
					}, 500);
				} else {
					htmlHeight = $("html").height();
					scrollPos = $(window).scrollTop();
					$(".st-content").appendTo(".st-pusher");
					$(".masthead").prependTo("#st-container");
					$(".masthead").removeClass('is-fixed');

					if($('body').hasClass('page-home')) {
						rb.feature.unbindScroll();
					}
					rb.video.pause();
					console.log("video pause");

					$("body, html,.st-container").height('100%');
					$(".st-pusher").scrollTop(scrollPos);
					$(window).trigger('scroll');
				}

				$("#st-container").toggleClass("menu-open");
			});
		}
	};
})();
*/

/*-----------------------
 @TIMER
 ------------------------*/
/*
rb.timer = (function() {
	var timer = null;

	return {
		drawTimer: function() {
			console.log("drawTimer")
			var $circle = $(".feature-timer"),
					$bg = $(".feature-background");

			var degrees = 360, // don't change this
					i = 0;

			var radius = 120, // circle radius relative to svg viewbox (be sure to account for stroke width)
					increment = 5, // number of degrees to add per loop
					angle = -90 - increment, // start position (top minus an increment)
					numTicks = (degrees / increment) + 2, // number of times the loop will run
					ms = rb.feature.s.constants.pause - rb.feature.s.constants.speed - 400, // duration of animation (milliseconds)
					interval = ms / numTicks; // timer interval

			var radians = null,
					x = null,
					y = null,
					d = null;

			timer = setInterval(
				function() {
				console.log("setInterval timer")
					angle += increment;
					angle %= degrees;
					radians = (angle / (degrees / 2)) * Math.PI;
					x = 150 + Math.cos(radians) * radius;
					y = 150 + Math.sin(radians) * radius;
					d = $circle.attr("d");

					if (i == 0) {
						d = d + " M " + x + " " + y;
					}
					else {
						d = d + " L " + x + " " + y;
					}
					$circle.attr("d", d);
					i++;

					if (i >= numTicks) {
						rb.timer.stopTimer();
						rb.feature.$bxapi.goToNextSlide();
					}
				}, interval);
		},
		stopTimer: function()
		{
			console.log("stopTimer")

			clearInterval(timer);
		}
	}
})();
*/
/*-----------------------
 @FEATURE (HOME)
 ------------------------*/

rb.feature = (function() {
	var $bxapi = {},
		inTransition = 0,
		mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
	return {
		s: {
			classes: {
				i: "carousel",
				e: "is-enabled",
				p: "pager"
			},
			constants: {
				delay: 250,
				pause: 6000,
				speed: 800
			},
			obj: {
				pager: $("<div class='pager' />")
			},
			svg: {
				// "bg" is just a copy of a generated timer saved via Developer Tools
				// if the timer dimensions change this will need to be replaced
				// also, change the stroke-width to be less than #feature-timer so it doesn't poke out from underneath
				//bg: '<svg version="1.1" id="feature-timer-background" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="612px" height="792px" viewBox="0 0 612 792" enable-background="new 0 0 612 792" xml:space="preserve"><path fill="#FFFFFF" d="M306,685.8l-25.3-1.1l-25.1-3.3L231,676l-24.1-7.6l-23.4-9.7L161.1,647l-21.3-13.6L119.7,618L101.1,601 L84,582.3l-15.4-20.1L55,540.9l-11.7-22.4l-9.7-23.4L26,471l-5.5-24.7l-3.3-25.1L16.2,396l1.1-25.3l3.3-25.1L26,321l7.6-24.1 l9.7-23.4L55,251.1l13.6-21.3L84,209.7l17.1-18.6l18.6-17.1l20.1-15.4l21.3-13.6l22.4-11.7l23.4-9.7L231,116l24.7-5.5l25.1-3.3 l25.3-1.1l25.3,1.1l25.1,3.3L381,116l24.1,7.6l23.4,9.7l22.4,11.7l21.3,13.6l20.1,15.4l18.6,17.1l17.1,18.6l15.4,20.1l13.6,21.3 l11.7,22.4l9.7,23.4L586,321l5.5,24.7l3.3,25.1l1.1,25.3l-1.1,25.3l-3.3,25.1L586,471l-7.6,24.1l-9.7,23.4L557,540.9l-13.6,21.3 L528,582.3L511,601L492.3,618l-20.1,15.4L450.9,647l-22.4,11.7l-23.4,9.7L381,676l-24.7,5.5l-25.1,3.3L306,685.8z M288.6,595 l17.4,0.8l17.4-0.8l17.3-2.3l17-3.8l16.6-5.2l16.1-6.7l15.5-8l14.7-9.4l13.8-10.6l12.8-11.8l11.8-12.8l10.6-13.8l9.4-14.7l8-15.5 l6.7-16.1l5.2-16.6l3.8-17l2.3-17.3l0.8-17.4l-0.8-17.4l-2.3-17.3l-3.8-17l-5.2-16.6l-6.7-16.1l-8-15.5l-9.4-14.7L459,267.6 l-11.8-12.8L434.4,243l-13.8-10.6l-14.7-9.4l-15.5-8l-16.1-6.7l-16.6-5.2l-17-3.8l-17.3-2.3l-17.4-0.8l-17.4,0.8l-17.3,2.3l-17,3.8 l-16.6,5.2l-16.1,6.7l-15.5,8l-14.7,9.4L177.6,243l-12.8,11.8L153,267.6l-10.6,13.8l-9.4,14.7l-8,15.5l-6.7,16.1l-5.2,16.6l-3.8,17 l-2.3,17.3l-0.8,17.4l0.8,17.4l2.3,17.3l3.8,17l5.2,16.6l6.7,16.1l8,15.5l9.4,14.7l10.6,13.8l11.8,12.8l12.8,11.8l13.8,10.6 l14.7,9.4l15.5,8l16.1,6.7l16.6,5.2l17,3.8L288.6,595z"/></svg>',
				bg: '',
				// anim: "<svg id='feature-timer' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' preserveAspectRatio='xMidYMid' viewbox='0 0 300 300'><path class='feature-timer' stroke-width='60' d='M300,300' fill='none' /></svg>",
				anim: "",
				bull: "&bull;"
			},
			colors: {
				rb: "#f6364d",
				sobrerb: "#f6364d",
				datafarma1: "#68c223",
				datafarma2: "#ea0023"
			},
			txt: {
				rb: "#f5f5f5",
				sobrerb: "#f5f5f5",
				datafarma1: "#24334c",
				datafarma2: "#f5f5f5"
			}
		},
		init: function()
		{
			var t = window.setTimeout(kickoff, rb.feature.s.constants.delay);
			function kickoff()
			{
				scrollTripped = 1; // REMOVE THIS LINE if we want the slides to cycle through automatically
				$("html").css({height: "100%", overflow: "hidden"}); //set html to 100

				var s = rb.feature.s;
				var $c = $("." + s.classes.i),
						$items = $c.find(".item");

				if ($items.length) {
					rb.feature.resizeItems();

                    $(window).on("throttledresize", function() {
                        rb.feature.resizeItems();
                    });

					rb.feature.enable(s, $c, $items);
				}
				// jQuery Color plugin
				$.Color.hook("fill");
				if(rb.main.isTouchDevice()) {
					document.body.addEventListener('touchmove',function(event){
						event.preventDefault();
					});
				}
				rb.video.init();
			}
		},
		resizeItems: function() {
			console.log("resizeItems")
			var s = rb.feature.s;
			var $c = $("." + s.classes.i),
					$items = $c.find(".item");
			$items.css("height", $(window).height());
			$items.find(".screenshot").each(function(index, item) {

				var h = $(item).height();
				var w = $(item).width();
				var vh = $(window).height();
				var vw = $(window).width();
				var padding = 0.35 * vw;
				if (h - 30 > vh - padding) {
					$(item).css({bottom: vh - padding - h, left: vw / 2 - w / 2});
				} else {
					$(item).css({bottom: "-10px", left: vw / 2 - w / 2});
				}

			});
		},
		enable: function(s, $c, $items)
		{
			console.log("enable")
			var $pager = $("." + s.classes.p);

			rb.feature.$bxapi = $c.bxSlider({
                minSlides: 1,
                maxSlides: 1,
				auto: false,
                useCSS: true,
                responsive: true,
                preloadImages: "all",
				controls: false,
				mode: "vertical",
				pagerCustom: $pager,
				slideMargin: 0,
				pause: s.constants.pause,
				speed: s.constants.speed,
				touchEnabled: true,
				oneToOneTouch: false,
				infiniteLoop: false,
				onSliderLoad: function(currentIndex) {
					console.log("onSliderLoad");
					$c.addClass(s.classes.e);
					rb.feature.setClient(s, currentIndex, $items);
					rb.feature.setActive(s, currentIndex, $pager, $items);
				},
				onSlideBefore: function($slideElement, oldIndex, newIndex) {
					
					rb.feature.hide(s, oldIndex, newIndex, $items, $pager);
					rb.feature.setClient(s, newIndex, $items);
					//rb.timer.stopTimer();
					if(scrollTripped) inTransition = 1;

				},
				onSlideAfter: function($slideElement, oldIndex, newIndex) {
					
					console.log("onSlideAfter");
					rb.feature.setActive(s, newIndex, $pager, $items);
					//setTimeout(function() {
						inTransition = 0;
					//},100);
					
					if($c.getCurrentSlide() == ($c.getSlideCount() - 1)) {
						$('body').bind('swipeup',function() {
							rb.feature.scrollToInfo();
						});
					}
					else {
						$('body').unbind('swipeup');
					}

				}
			});
			$slider = $c;
			rb.feature.bindScroll();
			/*$('body').on('click', '.to-case-studies', function(e) {
				e.preventDefault();
				$c.goToNextSlide();
			});*/
		},
		setClient: function(s, i, $items)
		{
			console.log("setClient");
			var $pager = $("." + s.classes.p);
			var newProject = $items.eq(i).attr("data-project");

			$("body").attr("data-project", newProject);
			
			$("body").removeAttr('class');
			$("body").attr('class', '');
			$("body").addClass("page-"+newProject)

			//console.log(newProject);
			if(newProject !== "rb" || newProject !== " sobrerb") {
				rb.video.pause();
				// console.log("video pause");
			} else {
				rb.video.play()
				//console.log("video play");
			};
		},
		setActive: function(s, i, $pager, $items)
		{
		console.log("setActive")	
		console.log("                        ")	
			var newProject = $items.eq(i).attr("data-project");
			// var currentColor = s.colors[newProject.replace("-", "")];
			if(!scrollTripped) currentColor = s.txt[newProject.replace("-", "")];

			//$pager.find(".animated").removeClass("animated");
			//$pager.find("a").eq(i).html(s.svg.bg + s.svg.anim);
			//$('#feature-timer-background *').css('fill',currentColor);

			// console.log(newProject);
			if(newProject == "rb" || newProject == " sobrerb") {	
				rb.video.pause();
				// console.log("video pause__");
			} else {
				rb.video.play();
				// console.log("video play__");
			}

/*			if(!scrollTripped) {
				$pager.find("a").eq(i).addClass("animated");
				rb.timer.drawTimer();
			}
*/
			// rb.main.setLogoColors(s.colors[newProject.replace("-", "")], s.txt[newProject.replace("-", "")]);
			// rb.feature.setPagerColor($pager, s.txt[newProject.replace("-", "")]);

/*			$('.menu-trigger span').animate({
				backgroundColor: s.txt[newProject.replace("-", "")]
			}, s.constants.speed);*/
		},
		hide: function(s, oldIndex, newIndex, $items, $pager)
		{
			console.log("hide")
			var currentProject = $items.eq(oldIndex).attr("data-project");
			var newProject = $items.eq(newIndex).attr("data-project");
			// var currentColor = s.colors[currentProject.replace("-", "")];

			//$pager.find("a").eq(oldIndex).html(s.svg.bull);
			//$pager.find("a").eq(newIndex).html(s.svg.bg);

			// $('#feature-timer-background *').css('fill',currentColor);
		},
		setPagerColor: function($pager, color)
		{
			console.log("setPagerColor")
			var realColor = $('body').attr('data-project') == "content" ? '#61625F' : color;

			$pager.find("a").animate({
				color: realColor
			}, 200);
		},
		bindScroll: function()
		{
			console.log("bindScroll")

			if(!rb.main.isMobile) {
				var currentActive,
					totalSlides = $slider.getSlideCount(),
					s = rb.feature.s;
				$('body').bind(mousewheelevt, function(e){

					scrollTripped = 1;
					currentActive = $slider.getCurrentSlide();

					console.log("currentActive:     "+currentActive)

					var evt = window.event || e;
					evt = evt.originalEvent ? evt.originalEvent : evt;
					var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;

					$slider.stopAuto();
					if(delta > 0) {
						if(currentActive > 0 && !inTransition) {

							console.log("DATAPROJETO PREV----- "+$('body').attr('data-project'))

							if($('body').attr('data-project') == "datafarma1" ){
								$(".item.datafarma1").css("background","url(imgs/bg-datafarma.jpg)");
								$(".item.datafarma1").css("background-size","cover");
								$(".item.datafarma1").css("background-position","center center");
							}	

							if($('body').attr('data-project') == "datafarma3"){
								$slider.goToSlide(currentActive-2, 'prev');
							}else{
								$slider.goToPrevSlide();
							}
							
							if($('body').attr('data-project') == "datafarma4"){
								$(".bx-viewport").css("background-image","url()");

								$(".aba-esq").css("left",  -500 )
								$(".aba-esq").css("-webkit-transition","1s");
								$(".aba-esq").css("transition","1s");

								$(".aba-dir").css("right", -500 )
								$(".aba-dir").css("-webkit-transition","1s");
								$(".aba-dir").css("transition","1s");
							}


							if($('body').attr('data-project') == "datafarma5"){
								
								$(".item.datafarma4").css("background","url(imgs/bg-datafarma.jpg)");
								$(".item.datafarma4").css("background-size","cover");
								$(".item.datafarma4").css("background-position","center center");
								
								$(".aba-esq").css("left", -500 )
								$(".aba-esq").css("-webkit-transition","0");
								$(".aba-esq").css("transition","0");
								
								$(".aba-dir").css("right", -500 )
								$(".aba-dir").css("-webkit-transition","0");
								$(".aba-dir").css("transition","0");
								
								$(".aba-esq").css("-webkit-transition","1s");
								$(".aba-esq").css("transition","1s");
								

								$(".aba-dir").css("-webkit-transition","1s");
								$(".aba-dir").css("transition","1s");
								
								 
								if($(window).width() > 1200){
									$(".aba-esq").css("left",  -280 )
									$(".aba-dir").css("right",  -280 )
								}else{
									$(".aba-esq").css("left",  - ((1200+280)-$(window).width()) )
									$(".aba-dir").css("right", - ((1200+280)-$(window).width()) )
								}

								$(".item.consumer1").css("background-image","url(imgs/bg-consumer.jpg)");
								$(".item.consumer1").css("background-size","cover");
								$(".item.consumer1").css("background-position","center center");

								$(".bx-viewport").css("background-image","url()");
							}

							if($('body').attr('data-project') == "datafarma6"){
								if($(window).width() > 1200){
									$(".aba-esq").css("left",  0 )
									$(".aba-dir").css("right",  0 )
								}else{
									$(".aba-esq").css("left",  - ((1200)-$(window).width()) )
									$(".aba-dir").css("right", - ((1200)-$(window).width()) )
								}

								$(".item.consumer1").css("background-image","url(imgs/bg-consumer.jpg)");
								$(".item.consumer1").css("background-size","cover");
								$(".item.consumer1").css("background-position","center center");

								$(".bx-viewport").css("background-image","url()");
							}

							if($('body').attr('data-project') == "consumer2"){
								$(".item.consumer2").css("background-image","");
							}


						}
					


					} else {


						if(currentActive < (totalSlides - 1) && !inTransition) {
							
							console.log("DATAPROJETO NEXT----- "+$('body').attr('data-project'))




							if($('body').attr('data-project') == "datafarma4"){

								$(".item.datafarma4").css("background","url(imgs/bg-datafarma.jpg)");
								$(".item.datafarma4").css("background-size","cover");
								$(".item.datafarma4").css("background-position","center center");
								
								$(".aba-esq").css("left", -500 )
								$(".aba-esq").css("-webkit-transition","0");
								$(".aba-esq").css("transition","0");
								
								$(".aba-dir").css("right", -500 )
								$(".aba-dir").css("-webkit-transition","0");
								$(".aba-dir").css("transition","0");
								
								
								$(".aba-esq").css("-webkit-transition","1s");
								$(".aba-esq").css("transition","1s");
								

								$(".aba-dir").css("-webkit-transition","1s");
								$(".aba-dir").css("transition","1s");
								
								 
								if($(window).width() > 1200){

									$(".aba-esq").css("left",  -280 )
									$(".aba-dir").css("right",  -280 )
								}else{
									$(".aba-esq").css("left",  - ((1200+280)-$(window).width()) )
									$(".aba-dir").css("right", - ((1200+280)-$(window).width()) )
								}
									
							}


							if($('body').attr('data-project') == "datafarma5"){

								if($(window).width() > 1200){
									$(".aba-esq").css("left",  0 )
									$(".aba-dir").css("right",  0 )
								}else{
									$(".aba-esq").css("left",  - ((1200)-$(window).width()) )
									$(".aba-dir").css("right", - ((1200)-$(window).width()) )
								}
												
							}

							if($('body').attr('data-project') == "datafarma6"){
								$(".item.datafarma1").css("background-image","url(imgs/bg-datafarma.jpg)");
								$(".item.consumer1").css("background-image","url(imgs/bg-consumer.jpg)");
								// $(".item.datafarma6").css("background","#003B65");
								$(".bx-viewport").css("background-image","url()");


								$(".aba-esq").css("left",  -500 )
								$(".aba-dir").css("right", -500 )
							}



							if($('body').attr('data-project') == "consumer1"){
								$(".bx-viewport").css("background-image",$(".item.consumer1").css("background-image") );
								$(".item.consumer1").css("background-image","");
							}
							if($('body').attr('data-project') == "consumer2"){
								$(".item.consumer2").css("background-image","url(imgs/bg-consumer.jpg)");
								$(".item.consumer2").css("background-size","cover");
								$(".item.consumer2").css("background-position","center center");
							}

							if($('body').attr('data-project') == "datafarma1"){
								$(".item.datafarma1").css("background-image","");
								$slider.goToSlide(currentActive+2,'next');
							}else{
								$slider.goToNextSlide();	
							}


							
						}
					}
				});
				$('.' + s.classes.p).find('a').click(function() {
					scrollTripped = 1;
				});
			}
		},
		rebindScroll: function()
		{
			console.log("rebindScroll")
			if(!rb.main.isMobile) {
				rb.feature.bindScroll();
			}
		},
		unbindScroll: function()
		{
			console.log("unbindScroll")
			if(!rb.main.isMobile) {
				$('body').unbind(mousewheelevt);
			}
		}
	};
})();


/*-----------------------
 @CAROUSEL
 ------------------------*/
 /*
rb.carousel = (function() {
	var settings = {
		$el: $(".m_carousel ul"),
		slideWidth: 960
	}

	return {
		prep: function() {
			if (rb.main.windowWide()) {

				// all carousel items
				var $items = settings.$el
						.filter(".consolidate-items")
						.children(".carousel-item");

				// consolidate in the first carousel
				settings.$el
						.filter(".consolidate-items")
						.first()
						.html($items)
						.addClass("master");

				// remove the others
				settings.$el.filter(":not('.master')")
						.closest(".tab-item")
						.remove();
			}

			rb.carousel.init();
		},
		init: function() {
			// allow multiple carousels per page
			settings.$el.each(function() {

				var $c = $(this),
						$m = $c.closest(".m_carousel"),
						enableCaptions = $m.hasClass("enable-captions"),
						enableTabControls = $m.hasClass("enable-tab-controls") && rb.main.windowWide();

				var $bxapi = $c.bxSlider({
					captions: false, // always handle captions manually
					controls: false,
					oneToOneTouch: false,
					pager: false,
					slideWidth: settings.slideWidth,
					swipeThreshold: 20,
					onSliderLoad: function(currentIndex) {
						// first active item
						var $active = $c.find(".carousel-item").not(".bx-clone").eq(currentIndex);
						$active.addClass("active");

						// insert caption container if enabled
						if (enableCaptions) {
							rb.carousel.insertCaptions($m, $c, $active);
						}

						// add controls
						rb.carousel.insertControls($c);
					},
					onSlideAfter: function($slideElement, oldIndex, newIndex) {
						$c.find(".active").removeClass("active");
						$slideElement.addClass("active");

						if (enableCaptions) {
							rb.carousel.updateCaption($m, $c, $slideElement);
						}
						if (enableTabControls) {
							rb.carousel.setActiveTab($c, $slideElement);
						}
					}
				});

				// enable controls
				rb.carousel.bindControls($c, $bxapi);
				enableTabControls
						? rb.carousel.bindTabControls($c, $bxapi)
						: null;
			});
		},
		// insert prev / next controls
		insertControls: function($c) {
			$c.parent(".bx-viewport").append(
					"<a href='#' class='my-control my-bx-prev' />",
					"<a href='#' class='my-control my-bx-next' />"
					);
		},
		// bind prev / next controls
		bindControls: function($c, $bxapi) {
			$c.nextAll(".my-bx-prev").on("click", function(e) {
				e.type; // fixes click on ipad. don't know why.
				e.preventDefault();
				$bxapi.goToPrevSlide();
			});
			$c.nextAll(".my-bx-next").on("click", function(e) {
				e.preventDefault();
				$bxapi.goToNextSlide();
			});
		},
		// tab + carousel hybrid
		// go to a slide based on the selected tab
		// example: /about/culture
		bindTabControls: function($c, $bxapi) {
			var slideHash,
					slideIndex;
			$c.closest(".m_tabs").find(".tab-selectors .tab-item-cell").on("click", function(e) {
				e.stopPropagation();
				e.preventDefault();
				slideHash = $(this).attr("href").replace("#", "");
				slideIndex = $c.find("[data-slide-hash='" + slideHash + "']").not(".bx-clone").index();
				$bxapi.goToSlide(slideIndex - 1);
			});
		},
		// tab + carousel hybrid
		// make tab active based on current slide
		// example: /about/culture
		setActiveTab: function($c, $slideElement) {
			var $tabs = $c.closest(".m_tabs").find(".tab-selectors .tab-item-cell"),
					$activeTab = $tabs.filter(".active"),
					activeTabHash = $activeTab.attr("href").replace("#", ""),
					slideHash = $slideElement.attr("data-slide-hash");

			if (activeTabHash !== slideHash) {
				$activeTab.removeClass("active");
				$tabs.filter("[href='#" + slideHash + "']").addClass("active");
			}
		},
		// insert caption container
		insertCaptions: function($m, $c, $active) {
			$m.append("<div class='my-bx-caption' style='max-width:" + settings.slideWidth + "px'></div>");
			rb.carousel.updateCaption($m, $c, $active);
		},
		// update caption on slide change
		updateCaption: function($m, $c, $slideElement) {
			$m.find(".my-bx-caption").text($slideElement.find("img").attr("title"));
		},
	};
})();
*/
/*-----------------------
 @AMAZING MAGICALLY MUTATING TABS

 Originally based on http://codepen.io/chriscoyier/pen/gHnGD
 Modified beyond recognition. Don't try this at home.
 ------------------------*/
 /*
var selectorCount = 0;
rb.tabs = {
	settings: {
		$el: $(".m_tabs"),
		$selectorWrap: $("<div class='row tab-selectors'></div>")
	},
	init: function()
	{
		var $t, moduleType;

		this.settings.$el.each(function() {
			$t = $(this);
			isTeam = $(this).hasClass('team');

			// "large" screen
			if (rb.main.windowWide()) {
				moduleType = "tabs";

				rb.tabs.upgradeTags($t, isTeam);
				rb.tabs.enableModule($t, moduleType, isTeam);
				rb.tabs.buildSelectors($t, moduleType, isTeam);
				rb.tabs.pageLoadActiveItem($t.not('[data-not-expanded]'), moduleType, isTeam);
				rb.tabs.bindUIfunctions($t, moduleType, isTeam);
			}
			// "small" screen & transform to accordion
			else if ($t.hasClass("m_accordion")) {
				moduleType = "accordion";

				rb.tabs.upgradeTags($t, isTeam);
				rb.tabs.enableModule($t, moduleType, isTeam);
				rb.tabs.buildSelectors($t, moduleType, isTeam);
				rb.tabs.pageLoadActiveItem($t, moduleType, isTeam);
				rb.tabs.bindUIfunctions($t, moduleType, isTeam);
			}
		});
	},
	// reconfigure DOM
	upgradeTags: function($t, isTeam)
	{
		var $el,
			$tagHTML,
			newTag;

		// replace tags first, it takes the most work
		$t.find("[data-upgrade-tag]").each(function() {
			$el = $(this);
			$tagHTML = $el.html();

			newTag = $("<" + $el.attr("data-upgrade-tag") + " />");
			if ($el.attr("data-upgrade-tag") === "a") {
				if ($el.attr("data-upgrade-hash").length) {
					newTag.attr("href", $el.attr("data-upgrade-hash"));
				} else {
					newTag.attr("href", "#");
				}
			}

			newTag.addClass($el.attr("data-upgrade-class")).html($tagHTML);
			$el.replaceWith(newTag);
		});

		// simple replaces for classes
		$t.find("[data-upgrade-class]").each(function() {
			$(this)
					.attr("class", $(this).attr("data-upgrade-class"))
					.removeAttr("data-upgrade-class");
		});
	},
	enableModule: function($t, moduleType, isTeam)
	{
		$t.removeClass(moduleType + "-disabled").addClass(moduleType + "-enabled");
	},
	buildSelectors: function($t, moduleType, isTeam)
	{
		if (moduleType == "tabs") {
			if(isTeam) {
				var $newRow = $('<div class="row tab-selectors"></div>');
				$t.find('[data-tab-selector]').each(function(i, el) {
					selectorCount++;
					$(el).appendTo($newRow);

					if(selectorCount == 4) {
						$newRow.insertBefore($t.find('.tab-content'));

						$newRow = $("<div class='row tab-selectors'></div>");
						selectorCount = 0;
					}
				});
				$newRow.insertBefore($t.find('.tab-content'));
				$('.row').after('<div class="content-container"></div>');
			} else {
				// build
				$t.find("[data-tab-selector]").appendTo(rb.tabs.settings.$selectorWrap);
				// insert
				rb.tabs.settings.$selectorWrap.insertAfter($t.find(".module-heading").first());
			}
		}

		if (moduleType == "accordion") {
			// build
			$t.find("[data-accordion-tab]").attr("class", "accordion-tab-cell").wrap("<div class='row accordion-tab' />");
			// flag content
			$t.find(".accordion-tab").next(".row").addClass("accordion-content");
		}
	},
	bindUIfunctions: function($t, moduleType, isTeam)
	{
		if (moduleType == "tabs") {
			$t.children(".tab-selectors")
				.on("click", "a", function(e) {
					if (rb.main.windowWide()) {
						e.preventDefault();
					}
				})
				.on("click", "a[href^='#']", function(e) {
					if (rb.main.windowWide()) {
						rb.tabs.changeTab($t, this.hash, isTeam, $(this).hasClass('active'));
					}
				});
		}

		if (moduleType == "accordion") {
			$t.find(".tab-item .accordion-tab")
				.on("click", function(e) {
					e.preventDefault();

					var $tabItem = $(this).parents('.tab-item');
					rb.tabs.toggleAccordion($t, $tabItem);
				});
		}
	},
	pageLoadActiveItem: function($t, moduleType, isTeam)
	{
		if (moduleType == "tabs") {
			var hash = document.location.hash.length
					? document.location.hash
					: false;

			// if there's no document hash OR if the given hash doesn't match one of the selector IDs, use the first item
			if (!hash || !$t.find(".tab-selectors #" + hash.replace("#", "")).length) {
				hash = "#" + $t.children(".tab-content").children(".tab-item").first().attr("id");
			}
			this.changeTab($t, hash, isTeam, false);
		}

		if (moduleType == "accordion") {
			$t.find(".accordion-tab").first().parent(".tab-item").addClass("active");
			$t.find(".tab-content .tab-item").not(".active").children(".accordion-content").hide();
		}
	},
	// tabs only
	changeTab: function($t, hash, isTeam, collapse)
	{
		var anchor = $("[href=" + hash + "]").closest(".tab-item-cell");
		var rowContent = anchor.parents('.row').next('.content-container');
		var div = $(hash);

		if(isTeam) {
			if(collapse) {
				$('.content-container.active').empty().removeClass('active');
				anchor.removeClass('active');
			} else {
				$('.tab-selectors').find('.active').removeClass('active');
				anchor.addClass('active');

				// activate content
				$('.content-container').empty().find('.tab-item').removeClass('active');
				div.clone().appendTo(rowContent).addClass('active');
				$('.content-container').removeClass('active');
				rowContent.addClass('active');
			}
			$('.tab-item-cell .jump').text('Expand');
			anchor.find('.jump').text(collapse ? 'Expand' : 'Collapse');
		} else {
			// activate selector
			anchor.addClass("active").parent().siblings().find(".active").removeClass("active");

			// activate content
			div.addClass("active").siblings().removeClass("active");

			// update URL, no history addition
			// You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
			// window.history.replaceState("", "", hash);
		}
	},
	// accordion only
	toggleAccordion: function($t, $clickedTab, isTeam)
	{
		if (!$clickedTab.hasClass("active")) {
			$t.find(".tab-item.active").removeClass("active").children(".accordion-content").slideUp("fast");
			$clickedTab.addClass("active").children(".accordion-content").slideDown("fast", function() {
				rb.tabs.positionAccordion($t);
			});
		} else {
			$clickedTab.removeClass("active").children(".accordion-content").slideUp("fast");
		}
	},
	positionAccordion: function($t, isTeam)
	{
		$(".st-content").scrollTo($t.find(".module-heading"), 400);
	},
}
*/
/*-----------------------
 @PILL TABS
 ------------------------*/
 /*
rb.pillTabs = {
	settings: {
		$el: $(".m_pill-tabs"),
	},
	init: function()
	{
		var $t;

		this.settings.$el.each(function() {
			$t = $(this);

			rb.pillTabs.enableModule($t);
			rb.pillTabs.bindUIfunctions($t);
			rb.pillTabs.pageLoadActiveItem($t);
		});
	},
	enableModule: function($t, moduleType)
	{
		$t.removeClass("pill-tabs-disabled").addClass("pill-tabs-enabled");
	},
	bindUIfunctions: function($t, moduleType)
	{
		$t.children(".pill-tab-selectors")
				.on("click", "a", function(e) {
					e.preventDefault();
				})
				.on("click", "a[href^='#']:not('.active')", function(e) {
					rb.pillTabs.changeTab($t, this.hash);
				});
	},
	pageLoadActiveItem: function($t)
	{
		var hash = document.location.hash.length
				? document.location.hash
				: false;

		// if there's no document hash OR if the given hash doesn't match one of the selector IDs, use the first item
		if (!hash || !$t.find(".pill-tab-selectors #" + hash.replace("#", "")).length) {
			hash = "#" + $t.children(".pill-tab-content").children(".pill-tab-item").first().attr("id");
		}

		this.changeTab($t, hash);
	},
	// tabs only
	changeTab: function($t, hash)
	{
		var anchor = $("[href=" + hash + "]");
		var div = $(hash);

		// activate selector
		anchor.removeClass("pill-inactive").parent().siblings().find(".pill").addClass("pill-inactive");

		// activate content
		div.addClass("active").siblings().removeClass("active");

		// update URL, no history addition
		// You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
		// window.history.replaceState("", "", hash);
	},
}
*/
/*-----------------------
 @BASIC TABS

 Either vertical or horizonal. Probably only used in case studies.
 ------------------------*/
 /*
rb.basicTabs = {
	settings: {
		$el: $(".m_tabs-vertical").add(".m_tabs-horizontal"),
	},
	init: function()
	{
		var $t,
				moduleType;

		this.settings.$el.each(function() {
			$t = $(this);

			if ($t.hasClass("m_tabs-vertical")) {
				moduleType = "vertical";
			} else if ($t.hasClass("m_tabs-horizontal")) {
				moduleType = "horizontal";
			}
			rb.basicTabs.enableModule($t, moduleType);
			rb.basicTabs.bindUIfunctions($t, moduleType);
			rb.basicTabs.pageLoadActiveItem($t, moduleType);
		});
	},
	enableModule: function($t, moduleType)
	{
		$t.addClass("tabs-" + moduleType + "-enabled");
	},
	bindUIfunctions: function($t, moduleType)
	{
		$t.find(".tabs-" + moduleType + "-selectors")
				.on("click", "a", function(e) {
					e.stopPropagation();
					e.preventDefault();
				})
				.on("click", "a[href^='#']:not('.active')", function(e) {
					rb.basicTabs.changeTab($t, this.hash);
				});
	},
	pageLoadActiveItem: function($t, moduleType)
	{
		var hash = document.location.hash.length
				? document.location.hash
				: false;

		// if there's no document hash OR if the given hash doesn't match one of the selector IDs, use the first item
		if (!hash || !$t.find(".tabs-" + moduleType + "-selectors #" + hash.replace("#", "")).length) {
			hash = "#" + $t.find(".tabs-" + moduleType + "-content").children(".tab-item").first().attr("id");
		}
		this.changeTab($t, hash);
	},
	// tabs only
	changeTab: function($t, hash)
	{
		var anchor = $("[href=" + hash + "]");
		var div = $(hash);

		// activate selector
		anchor.addClass("active").parent().siblings().find(".active").removeClass("active");

		// activate content
		div.addClass("active").siblings().removeClass("active");

		// update URL, no history addition
		// You'd have this active in a real situation, but it causes issues in an <iframe> (like here on CodePen) in Firefox. So commenting out.
		// window.history.replaceState("", "", hash);
	},
}*/

/*-----------------------
 @TELEPORT
 ------------------------*/
 /*
rb.teleport = (function() {
	var settings = {
		$el: $(".m_teleport"),
		$close: $("#tmp_close"),
	}

	return {
		init: function() {
			settings.$el.each(function() {
				var $m = $(this);

				if (rb.main.windowWide()) {
					rb.teleport.enableModule($m);
					rb.teleport.bindUIfunctions($m);
				} else {
					$m.find(".teleport-selectors").slideUp(); // hide() is buggy on iOS
					$m.find(".module-heading").on("click", function() {
						$(this).toggleClass("is-open");
						$m.find(".teleport-selectors").slideToggle();
					});
				}
			});
		},
		enableModule: function($m)
		{
			$m.removeClass("teleport-disabled").addClass("teleport-enabled");
		},
		bindUIfunctions: function($m)
		{
			$m.on("click", ".close", function(e) {
				e.preventDefault();
				rb.teleport.revert($m);
			});

			$m.children(".teleport-selectors").on("click", ".teleport-item-cell", function(e) {
				rb.teleport.changeTab($m, this.hash);
				e.preventDefault();
			});
		},
		insertNodes: function($t)
		{
			var $closeBtn = settings.$close.clone().removeAttr("id");

			$t.html($closeBtn);
		},
		changeTab: function($m, hash)
		{
			var anchor = $("[href=" + hash + "]").closest(".teleport-item-cell");
			var $newTextHolder = $m.find(".teleport-new-text");
			var div = $(hash);

			// keep track of active tab
			anchor.addClass("active").parent().siblings().find(".active").removeClass("active");

			rb.teleport.insertNodes($newTextHolder);
			$newTextHolder.find(".close").show();

			// send content to bucket
			$newTextHolder.append(div.html());

			$('html,body').animate({
				scrollTop: ($m.find('.anchor-here').offset().top - $('.masthead').outerHeight())
			},1000);
		},
		revert: function($m)
		{
			var $newTextHolder = $m.find(".teleport-new-text");

			$newTextHolder.empty();
			$newTextHolder.find(".close").hide();
			$m.children(".teleport-selectors").find(".active").removeClass("active");
		},
	};
})();
*/

/*
rb.modal = (function() {
	var settings = {
		$el: $(".m_modal"),
		$appendModalTo: $("body"),
		$close: $("#tmp_close"),
		$backdrop: $("<div class='modal-backdrop' />"),
		$modalWrapper: "<div class='modal-content'></div>",
	}
	var htmlHeight = 0;
	var scrollPos = 0;
	return {
		init: function() {
			// insert backdrop
			settings.$backdrop.appendTo(settings.$appendModalTo);

			// each
			settings.$el.each(function() {
				var $m = $(this);

				rb.modal.bindUIfunctions();
				rb.modal.insertModal($m);
			});

			// close modal with esc
			$(document).keydown(function(e) {
				if (e.keyCode == 27) {
					rb.modal.closeModal($(".m_modal"));
				}
			});
		},
		insertModal: function($m) {
			// insert close button
			$m.prepend(settings.$close.clone().removeAttr("id"));

			// add wrapper
			$m.wrapInner(settings.$modalWrapper);

			// insert modal before $backdrop
			$m.addClass("is-enabled").insertBefore(settings.$backdrop).hide();
		},
		bindUIfunctions: function() {
			var hash;

			$(".show-modal").on("click", function(e) {
				e.preventDefault();
				rb.modal.openModal($("#" + this.hash.replace("#", "")));
			});
			$(".m_modal").on("click", ".close", function(e) {
				e.preventDefault();
				rb.modal.closeModal($(this).closest(".m_modal"));
			});
		},
		openModal: function($m) {
			// show backdrop
			if (!rb.main.isMobile) {
				htmlHeight = $("html").height();
				scrollPos = $(window).scrollTop();
				$("body, html,.st-container").height("100%");
			}
			settings.$backdrop.fadeIn('fast', function() {
				// show modal
				$m.show();
			});
		},
		closeModal: function($m) {
			// hide modal
			if (!rb.main.isMobile) {
				$("html,.st-content").height(htmlHeight + "px");
				$(".st-container ").height("0px");
				$(window).scrollTop(scrollPos);
			}
			$m.fadeOut('fast', function() {
				// hide backdrop
				settings.$backdrop.hide();
			});
		}
	};
})();
*/
/*-----------------------
 @INLINESVG
 Conditionally loading svg or fallback png
 ------------------------*/
 /*
rb.inlinesvg = (function() {
	var $el;

	return {
		init: function() {
			for (i = 0; i < $("[data-inlinesvg]").length; i++) {
				$el = $("[data-inlinesvg]").eq(i);
				if (Modernizr.inlinesvg) {
					$el.load($el.attr("data-inlinesvg"));
				} else {
					$el.html("<img src='" + $el.attr("data-inlinesvg").replace(".svg", ".png") + "' />");
				}
			}
		},
	};
})();
*/
/*-----------------------
 @PARALLAX
 Cool effect for various hero sections
 ------------------------*/

 
rb.parallax = (function() {
	var $el,
		scrollPos,
		windowWidth,
		timer;

	return {
		doStandard: function() {
		    scrollPos = $(window).scrollTop();

		    if(scrollPos < 0) {
		    	return; // OSX overscroll perf. fix
		    }

		    $('.m_jumbotron').css({
	      		backgroundPosition: 'center ' + (scrollPos/2)+"px"
		    });

		    $('.m_jumbotron .positioning').css({
				transform: 'translateY('+(scrollPos/3)+"px)",
				opacity: 1-(scrollPos/300)
		    });
		},
		
		resetStandard: function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				$('.m_jumbotron').css({
					backgroundPosition: '50% 0px'
				});
				$('.m_jumbotron .positioning').removeAttr('style');
			},60);
		}
	};
})();

/*-----------------------
 Curtain effect
 init curtain effect
 ------------------------*/
 /*
rb.casestudy = (function() {
	var rTimer,
		sTimer,
		animateObjects = $(),
		sideRailCTA = $();

	return {
		init: function() {
			$(window).on('resize', function() {
				clearTimeout(rTimer);
				rTimer = setTimeout(function() {
					rb.casestudy.setJumbotronSize();
				}, 60);
			});

			animateObjects = $('.animate-objects');
			sideRailCTA = $('.side-rail-cta');

			rb.casestudy.setJumbotronSize();
		},
		setJumbotronSize: function() {
			var h = $(window).height();
			if($('.page-case-study').length && $(window).width() >= 1200 && $(window).height() >= 800 && !rb.main.isMobile) {
				h = $(window).height() - 150;
			}
			$(".m_jumbotron").height(h);
		},
		playOrPauseHero: function() {
			var vidPlaying = true;

			clearTimeout(sTimer);
			sTimer = setTimeout(function() {
				if($(window).scrollTop() > $(window).height()) {
					console.log("video pause");
					rb.video.pause();
				} else {
					console.log("video play");
					rb.video.play();
				}
			}, 90);
		},
		fadeInObjects: function () {
			var timeSpan = 1500; // How long each animation chunk should last

			var scrollTop = $(window).scrollTop();
			var windowHeight = $(window).height();

			var $this = animateObjects.eq(0);

			if ($this.length) {
				var $items = $this.is('ul') ? $this.find('li') : $this.find('.fade-in');

				if($this.is('[data-time-span]') && !isNaN($this.attr('data-time-span'))) {
					timeSpan = parseInt($this.attr('data-time-span'));
				}

				if(scrollTop >= ($this.offset().top - (windowHeight * 0.85))) {
					$items.each(function(i, el) {
						var $item = $(el);
						setTimeout(function() {
							$item.addClass('show');
						}, (i * (timeSpan / $items.length)));
					});

					animateObjects = animateObjects.not($this);
				}
			}

			var toggleClass = (scrollTop > 500) ? 'addClass' : 'removeClass';
			sideRailCTA[toggleClass]('on-screen');
		}
	}
})();
*/
rb.loading = (function() {
	var $loader = $('#loader');

	return { 
		init: function(isAnimated) {
			$loader.addClass('play');
			$(window).load(function() {
				rb.loading.done(isAnimated);
			});
		},
		done: function(isAnimated) {
			$loader.removeClass('play').addClass('done');
			setTimeout(function() {
				$('html').addClass('loaded');
				$('[data-top-reveal] > li, [data-top-reveal] .fade-in').each(function(i, el) {
					var $item = $(el);
					setTimeout(function() {
						$item.addClass('show');
					}, (i * (1500 / $item.siblings().andSelf().length)));
				});
			}, (isAnimated ? 1000 : 0));
		}
	}
})();

rb.alert = (function() {
	return {
		init: function() {
			$('body').on('click', '[data-close]', function() {
				$('body').removeClass('has-alert');
				if($(this).parents('.alert-bar').hasClass('reminder')) {
					rb.alert.setCookie();
				}
			});
			$('body').on('click', '.alert-bar a', function() {
				if($(this).parents('.alert-bar').hasClass('reminder')) {
					rb.alert.setCookie();
				}
			});
		},
		setCookie: function() {
			$.cookie('hideAlert', 'true', { expires: 9999 });
		}
	}
})();

rb.home = (function() {
	return {
		init: function() {

			console.log("init home")

		}
	}
})();

rb.video = (function() {
	var	video;
	return {
		init: function() {
			$("video").each(function() {
				var $video  = $(this),
					$parent = $video.parent(),
					poster  = $video.attr("poster");

				// Disable for touch devices
				if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
					$video.remove();
				} else {
					video = $video.get(0);

					$video.find("source").each(function() {
						var $source = $(this);
						if (maxWidth = $source.attr("data-max-width")) {
							if ($(window).width() <= maxWidth) {
								$source.attr("src", $source.attr("data-src"));
								$source.attr("data-src", null);
							} else {
								$source.remove();
							}
						} else {
							$source.attr("src", $source.attr("data-src"));
							$source.attr("data-src", null);
						}
					});

					// Autoplay
					if ($video.attr("autoplay")) {
						$video.show();
						$video.get(0).play();
					}
				}

				// Responsive poster image
				poster && $parent.css("background-image", "url(" + poster + ")");
			});
		},
		pause: function() {
			video && video.pause();
		},
		play: function() {
			video && video.play();
		}
	}
})();

/*
 * LOAD!
 */
jQuery(function() {

	rb.main.init();

	/*$(window).scroll(function() {
		console.log("fjghdsvdabdskjhhb")
		rb.main.scrollBindings();
	});*/
	$(window).resize(function() {
		rb.main.resizeBindings();
	})
});










/*!
 * jCarouselLite - v1.1 - 2014-09-28
 * http://www.gmarwaha.com/jquery/jcarousellite/
 * Copyright (c) 2014 Ganeshji Marwaha
 * Licensed MIT (https://github.com/ganeshmax/jcarousellite/blob/master/LICENSE)
 */

(function($) {                                          // Compliant with jquery.noConflict()
    $.jCarouselLite = {
        version: '1.1'
    };

    $.fn.jCarouselLite = function(options) {

        options = $.extend({}, $.fn.jCarouselLite.options, options || {});

        return this.each(function() {   // Returns the element collection. Chainable.

            var running,
                animCss, sizeCss,
                div = $(this), ul, initialLi, li,
                liSize, ulSize, divSize,
                numVisible, initialItemLength, itemLength, calculatedTo, autoTimeout;

            initVariables();                    // Set the above variables after initial calculations
            initStyles();                       // Set the appropriate styles for the carousel div, ul and li
            initSizes();                        // Set appropriate sizes for the carousel div, ul and li
            attachEventHandlers();              // Attach event handlers for carousel to respond

            function go(to) {
            	console.log("go");
                if(!running) {
                    clearTimeout(autoTimeout);  // Prevents multiple clicks while auto-scrolling - edge case
                    calculatedTo = to;

                    if(options.beforeStart) {   // Call the beforeStart() callback
                        options.beforeStart.call(this, visibleItems());
                    }

                    if(options.circular) {      // If circular, and "to" is going OOB, adjust it
                        adjustOobForCircular(to);
                    } else {                    // If non-circular and "to" is going OOB, adjust it.
                        adjustOobForNonCircular(to);
                    }                           // If neither overrides "calculatedTo", we are not in edge cases.

                    animateToPosition({         // Animate carousel item to position based on calculated values.
                        start: function() {
                        	console.log("start")	
                            running = true;
                        },
                        done: function() {
                        	console.log("done")	
                            if(options.afterEnd) {
                                options.afterEnd.call(this, visibleItems());
                            }
                            if(options.auto) {
                                setupAutoScroll();
                            }
                            running = false;
                        }
                    });

                    if(!options.circular) {     // Enabling / Disabling buttons is applicable in non-circular mode only.
                        disableOrEnableButtons();
                    }

                }
                return false;
            }

            function initVariables() {
            	console.log("initVariables")	
                running = false;
                animCss = options.vertical ? "top" : "left";
                sizeCss = options.vertical ? "height" : "width";
                ul = div.find(">ul");
                initialLi = ul.find(">li");
                initialItemLength = initialLi.size();

                // To avoid a scenario where number of items is just 1 and visible is 3 for example.
                numVisible = initialItemLength < options.visible ? initialItemLength : options.visible;

                if(options.circular) {
                    var $lastItemSet = initialLi.slice(initialItemLength-numVisible).clone();
                    var $firstItemSet = initialLi.slice(0,numVisible).clone();

                    ul.prepend($lastItemSet)        // Prepend the lis with final items so that the user can click the back button to start with
                        .append($firstItemSet);     // Append the lis with first items so that the user can click the next button even after reaching the end

                    options.start += numVisible;    // Since we have a few artificial lis in the front, we will have to move the pointer to point to the real first item
                }

                li = $("li", ul);
                itemLength = li.size();
                calculatedTo = options.start;
            }

            function initStyles() {
            	console.log("initStyles")	
                div.css("visibility", "visible");   // If the div was set to hidden in CSS, make it visible now

                li.css({
                    overflow: "hidden",
                    "float": options.vertical ? "none" : "left" // Some minification tools fail if "" is not used
                });

                ul.css({
                    margin: "0",
                    padding: "0",
                    position: "relative",
                    "list-style": "none",
                    "z-index": "1"
                });

                div.css({
                    overflow: "hidden",
                    position: "relative",
                    "z-index": "2",
                    left: "0px"
                });

                // For a non-circular carousel, if the start is 0 and btnPrev is supplied, disable the prev button
                if(!options.circular && options.btnPrev && options.start == 0) {
                    $(options.btnPrev).addClass("disabled");
                }
            }

            function initSizes() {
console.log("initSizes")
                liSize = options.vertical ?         // Full li size(incl margin)-Used for animation and to set ulSize
                    li.outerHeight(true) :
                    li.outerWidth(true);
                ulSize = liSize * itemLength;       // size of full ul(total length, not just for the visible items)
                divSize = liSize * numVisible;      // size of entire div(total length for just the visible items)

                // Generally, LI's dimensions should be specified explicitly in a style-sheet
                // But in the case of img (with width and height attr), we can derive LI's dimensions and set here
                // May be applicable for other types of LI children if their dimensions are explicitly specified
                // Individual LI dimensions
                li.css({
                    width: li.width(),
                    height: li.height()
                });

                // Size of the entire UL. Including hidden and visible elements
                // Will include LI's (width + padding + border + margin) * itemLength - Using outerwidth(true)
                ul.css(sizeCss, ulSize+"px")
                    .css(animCss, -(calculatedTo * liSize));

                // Width of the DIV. Only the width of the visible elements
                // Will include LI's (width + padding + border + margin) * numVisible - Using outerwidth(true)
                div.css(sizeCss, divSize+"px");

            }

            function attachEventHandlers() {
            	console.log("attachEventHandlers")
                if(options.btnPrev) {
                    $(options.btnPrev).click(function() {

                        return go(calculatedTo - options.scroll);
                    });
                }

                if(options.btnNext) {
                    $(options.btnNext).click(function() {
                        return go(calculatedTo + options.scroll);
                    });
                }

                if(options.btnGo) {
                    $.each(options.btnGo, function(i, val) {
                        $(val).click(function() {
                            return go(options.circular ? numVisible + i : i);
                        });
                    });
                }

                if(options.mouseWheel && div.mousewheel) {
                    div.mousewheel(function(e, d) {
                    	console.log("div.mousewheel(function(e, d) {")
                        return d > 0 ?
                            go(calculatedTo - options.scroll) :
                            go(calculatedTo + options.scroll);
                    });
                }

                if(options.auto) {
                    setupAutoScroll();
                }
            }

            function setupAutoScroll() {
            	console.log("setupAutoScroll")
                autoTimeout = setTimeout(function() {
                    go(calculatedTo + options.scroll);
                }, options.auto);
            }

            function visibleItems() {
            	console.log("visibleItems")
                return li.slice(calculatedTo).slice(0,numVisible);
            }

            function adjustOobForCircular(to) {
            	console.log("adjustOobForCircular")
                var newPosition;

                // If first, then goto last
                if(to <= options.start - numVisible - 1) {
                    newPosition = to + initialItemLength + options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition - options.scroll;

                    console.log("Before - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }

                // If last, then goto first
                else if(to >= itemLength - numVisible + 1) {
                    newPosition = to - initialItemLength - options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition + options.scroll;

                    console.log("After - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }
            }

            function adjustOobForNonCircular(to) {
            	console.log("adjustOobForNonCircular")
                // If user clicks "prev" and tries to go before the first element, reset it to first element.
                if(to < 0) {
                    calculatedTo = 0;
                }
                // If "to" is greater than the max index that we can use to show another set of elements
                // it means that we will have to reset "to" to a smallest possible index that can show it
                else if(to > itemLength - numVisible) {
                    calculatedTo = itemLength - numVisible;
                }

                console.log("Item Length: " + itemLength + "; " +
                    "To: " + to + "; " +
                    "CalculatedTo: " + calculatedTo + "; " +
                    "Num Visible: " + numVisible);
            }

            function disableOrEnableButtons() {
            	console.log("disableOrEnableButtons")
                $(options.btnPrev + "," + options.btnNext).removeClass("disabled");
                $( (calculatedTo-options.scroll<0 && options.btnPrev)
                    ||
                    (calculatedTo+options.scroll > itemLength-numVisible && options.btnNext)
                    ||
                    []
                ).addClass("disabled");
            }

            function animateToPosition(animationOptions) {
            	console.log("animateToPosition")
                running = true;

                ul.animate(
                    animCss == "left" ?
                    { left: -(calculatedTo*liSize) } :
                    { top: -(calculatedTo*liSize) },

                    $.extend({
                        duration: options.speed,
                        easing: options.easing
                    }, animationOptions)
                );
            }
        });
    };

    $.fn.jCarouselLite.options = {
        btnPrev: null,              // CSS Selector for the previous button
        btnNext: null,              // CSS Selector for the next button
        btnGo: null,                // CSS Selector for the go button
        mouseWheel: false,          // Set "true" if you want the carousel scrolled using mouse wheel
        auto: null,                 // Set to a numeric value (800) in millis. Time period between auto scrolls

        speed: 200,                 // Set to a numeric value in millis. Speed of scroll
        easing: null,               // Set to easing (bounceout) to specify the animation easing

        vertical: false,            // Set to "true" to make the carousel scroll vertically
        circular: true,             // Set to "true" to make it an infinite carousel
        visible: 3,                 // Set to a numeric value to specify the number of visible elements at a time
        start: 0,                   // Set to a numeric value to specify which item to start from
        scroll: 1,                  // Set to a numeric value to specify how many items to scroll for one scroll event

        beforeStart: null,          // Set to a function to receive a callback before every scroll start
        afterEnd: null              // Set to a function to receive a callback after every scroll end
    };

})(jQuery);


$(function() {
    $(".dashboard-imagens .carouseldashboard").jCarouselLite({
        btnNext: ".next",
        btnPrev: ".prev",
        visible: 1,
        speed: 500
    });
});