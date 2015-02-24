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
var imgsZoom = ["imgs/zoom-estrutura-1.png",
				"imgs/zoom-estrutura-2.png",
				"imgs/zoom-estrutura-3.png",
				"imgs/zoom-estrutura-4.png",
				"imgs/zoom-estrutura-5.png",
				"imgs/zoom-estrutura-6.png",
				"imgs/zoom-estrutura-7.png",
				"imgs/zoom-estrutura-8.png",
				"imgs/zoom-estrutura-9.png",
				"imgs/zoom-estrutura-10.png",
				"imgs/zoom-estrutura-11.png",
				"imgs/zoom-estrutura-12.png",
				"imgs/zoom-estrutura-13.png",
				"imgs/zoom-estrutura-14.png",
				"imgs/zoom-estrutura-15.png"
				];

var imgsZoomAtual = 0; 			

var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

$.event.special.swipeupdown = {
    setup: function() {
    	// //console.log("setup");
        var thisObject = this;
        var $this = $(thisObject);
        $this.bind(touchStartEvent, function(event) {
        	//console.log("$this.bind(touchStartEvent, function(event) {");
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
            	//console.log("moveHandler");
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
        	//console.log("setup");
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

			ESSAS DUAS FUNCOES PODE	M TER ALGUM SENTINDO.


			rb.masthead.init();
			*/
			rb.navbar.init();

			
			
			if ($("body.page-home").length) {
				rb.feature.init();
			}
			/*if ($(".m_tabs").length) {
				//console.log("2")
				rb.tabs.init();
			}
			if ($(".m_pill-tabs").length) {
				//console.log("3")
				rb.pillTabs.init();
			}
			if ($(".m_tabs-vertical").length || $(".m_tabs-horizontal").length) {
				//console.log("4")
				rb.basicTabs.init();
			}
			if ($(".m_teleport").length) {
				//console.log("5")
				rb.teleport.init();
			}
			if ($(".m_modal").length) {
				//console.log("6")
				rb.modal.init();
			}
			if ($("[data-ajax-append]").length) {
				//console.log("7")
				rb.loadMore.init();
			}
			if ($(".homeSlides").length) {
				//console.log("8")
				rb.home.init();
			}
			if($('.page-case-study').length) {
				//console.log("9")
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
					//console.log("13")
					rb.casestudy.init();
				}
			});
			*/
		},
		windowWide: function() {
			//console.log("windowWide")
			return $(window).width() > 767 ? true : false;
		},
		isTouchDevice: function() {
			//console.log("isTouchDevice")
			//console.log("                                        ")	
			var is_touch_device = 'ontouchstart' in document.documentElement;
			return is_touch_device;
		},
		rgbToHex: function(rgb) {
			//console.log("rgbToHex")
		    if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

		    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		    function hex(x) {
		        return ("0" + parseInt(x).toString(16)).slice(-2);
		    }
		    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		},
		scrollBindings: function() {
				if($(window).width() >= 1200 && $('.page-home').length == 0) {
					rb.parallax.doStandard();
				}
		},
		
		resizeBindings: function() {
		
			if($(window).width() < 1200 || rb.main.isMobile) rb.parallax.resetStandard();
			
			// var paddingdatafarma = ($(window).width() / 2) - 414;
			
			//$(".datafarma3-line1").css("left", paddingdatafarma);
			//$(".datafarma3-line2").css("left", paddingdatafarma);

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


			//if($(".dashboard-imagens").width()){
				///setInterval(function(){
				var wdash;
				if(!rb.main.isMobile){
					wdash = $(window).width() - ($(window).width()*0.2);
					$(".dashboard-imagens").width(wdash);
					$(".owl-item").width(wdash);
				}else{
					wdash = $(window).width() - ($(window).width()*0.4);
					$(".dashboard-imagens").width(wdash);
					$(".owl-item").width(wdash);
					//$(".dashboard-imagens").css("left",1%)
				}

				

			//}else{
				//$(".dashboard-imagens").width($(window).width());
			//}
		}
		
	};
})();



rb.navbar = (function() {
	var htmlHeight = 0,
		scrollPos = 0,
		currentTopMargin,
		currentTopOffset,
		wasNavFixed = false;

	return {
		init: function() {

			var estrutura1 = true;
			setInterval(function(){
				if(estrutura1){
					$(".sobrerb-estrutura .sp1").animate({opacity: 0}, 750, "linear", function() { estrutura1=false });
					setTimeout(function(){
							$(".sobrerb-estrutura .rj1").animate({opacity: 0}, 750, "linear", function() {  });
						}
					,200);

			
				}else{
					$(".sobrerb-estrutura .sp1").animate({opacity: 1}, 750, "linear", function() { estrutura1=true });
					setTimeout(function(){
							$(".sobrerb-estrutura .rj1").animate({opacity: 1}, 750, "linear", function() {  });
						},200);

				}
			},10000);

			$(".menu-trigger").on("click", function(e) {
				e.preventDefault();
				if($(".pager").css("display") == "none"){
					$(".pager").css("display","block");
					$(".pager").animate({opacity: 1}, 300, "linear", function() {  });
				}else{
					$(".pager").animate({opacity: 0}, 300, "linear", function() { $(".pager").css("display","none"); });
				}
			});

			$('.ArrowNextPage').on('click', function() {
				if($('body').attr('data-project') == "datafarma1" || $('body').attr('data-project') == "datafarma3"){
								$slider.goToSlide($slider.getCurrentSlide()+2,'next');
							}else{
								$slider.goToNextSlide();	
							}
			});




			$('.item-menu-secundario-1.bttrabalhe').click(function() {
					var url = "http://www.rastreabilidadebrasil.com.br/recrutamento/";
					window.open(url, '_blank');
				});
				$('.gotoprocess').click(function() {
					$('.item-menu-secundario-2.btdatafarma4').click();
				});

				$('.seta-consumer').click(function() {
					$('.item-menu-secundario-3.btconsumer2').click();
				});

				$('.cases .btn-hollow' ).click(function() {
					$('.cases .video-container-box' ).css("display","block");
					$(".cases .video-container-box").animate({opacity: 1}, 500, "linear", function() { 
						$(".cases .video-container-box video").get(0).play();
					});
				});

				$('.cases .close' ).click(function() {
					$(".cases .video-container-box video").get(0).pause();
					$(".cases .video-container-box").animate({opacity: 0}, 500, "linear", function() { 
						$('.cases .video-container-box' ).css("display","none");
					 });
				});
				$('.sobrerb .btn-hollow' ).click(function() {
					$('.sobrerb .video-container-box' ).css("display","block");
					$(".sobrerb .video-container-box").animate({opacity: 1}, 500, "linear", function() { 
						$(".sobrerb .video-container-box video").get(0).play();
					});
				});

				$('.sobrerb .close' ).click(function() {
					$(".sobrerb .video-container-box video").get(0).pause();
					$(".sobrerb .video-container-box").animate({opacity: 0}, 500, "linear", function() { 
						$('.sobrerb .video-container-box' ).css("display","none");
					 });
				});

				$('.rbtrack .btn-hollow' ).click(function() {
					$('.rbtrack .video-container-box' ).css("display","block");
					$(".rbtrack .video-container-box").animate({opacity: 1}, 500, "linear", function() { 
						$(".rbtrack .video-container-box video").get(0).play();
					 });
				});

				$('.rbtrack .close' ).click(function() {
					$(".rbtrack .video-container-box video").get(0).pause();
					$(".rbtrack .video-container-box").animate({opacity: 0}, 500, "linear", function() { 
						$('.rbtrack .video-container-box' ).css("display","none");
					 });
				});

				$('.sobrerb-estrutura .galeria' ).find('img').click(function() {
					$('.sobrerb-estrutura .imgzoom').fadeIn();
					imgsZoomAtual = $(this).attr("datazoom")
					$('.sobrerb-estrutura .imgzoom .imagemzoom').attr("src", imgsZoom[imgsZoomAtual])
				});

				$('.sobrerb-estrutura .imgzoom .close' ).click(function() {
					$('.sobrerb-estrutura .imgzoom').fadeOut();
				});

				$('.sobrerb-estrutura .imgzoom .seta-esq' ).click(function() {
					imgsZoomAtual--;
					if(imgsZoomAtual == -1) imgsZoomAtual = imgsZoom.length-1;
					$('.sobrerb-estrutura .imgzoom .imagemzoom').attr("src", imgsZoom[imgsZoomAtual])
				});

				$('.sobrerb-estrutura .imgzoom .seta-dir' ).click(function() {
					imgsZoomAtual++;
					if(imgsZoomAtual == imgsZoom.length) imgsZoomAtual = 0;
					$('.sobrerb-estrutura .imgzoom .imagemzoom').attr("src", imgsZoom[imgsZoomAtual])
				});




				

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
				speed: 1200
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
						//console.log("touchmove")
						event.preventDefault();
					});
				}
				rb.video.init();
			}
		},
		resizeItems: function() {
			//console.log("resizeItems")
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
			//console.log("enable")
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
					//console.log("onSliderLoad");
					$c.addClass(s.classes.e);
					rb.feature.setClient(s, currentIndex, $items);
					rb.feature.setActive(s, currentIndex, $pager, $items);
				},
				onSlideBefore: function($slideElement, oldIndex, newIndex) {
					//console.log("onSlideBefore")
					rb.feature.hide(s, oldIndex, newIndex, $items, $pager);
					rb.feature.setClient(s, newIndex, $items);
					//rb.timer.stopTimer();
					if(scrollTripped) inTransition = 1;




					var oldProject = $items.eq(oldIndex).attr("data-project");
					var newProject = $items.eq(newIndex).attr("data-project");


					//console.log("oldProject: "+oldProject)
					//console.log("newProject: "+newProject)


							if(!rb.main.isMobile){
								if(newProject == "rb" ){
									$(".pager").css("display", "block");
									$(".pager").animate({opacity: 1}, 1000, "linear", function() {  });
								}else if(newProject == "datafarma4" || newProject == "datafarma5" || newProject == "datafarma6" || newProject == "dashboard" ){
									$(".pager").animate({opacity: 0}, 1000, "linear", function() { $(".pager").css("display", "none"); });
								}else{
									$(".pager").css("display", "block");
									$(".pager").animate({opacity: 0.5}, 1000, "linear", function() {  });
								}
							} // END IS MOBILE

								$(".pager").mouseover(function() {
									$(".pager").stop().animate({opacity: 1}, 500, "linear", function() {  });
								});
								
								$(".pager").mouseout(function() {
									if(newProject == "datafarma4" || newProject == "datafarma5" || newProject == "datafarma6" || newProject == "dashboard"){
										$(".pager").stop().animate({opacity: 0}, 500, "linear", function() { $(".pager").css("display", "none"); });
									}else{
										$(".pager").css("display", "block");
										$(".pager").stop().animate({opacity: 0.5}, 500, "linear", function() {  });
									}
								});
								

								$(".logo-parceiros").mouseover(function(e){ 
									
									e.stopPropagation();
									$(this).addClass("zoom-logo-parceiros");
									$p = $(".logo-parceiros.parceiro-"+$(this).attr("dataparceiro")+" .resumo-parceiro");
									$p.fadeIn();
									$p.css({ display: "block"}); 
									$(".bt-next-page").fadeOut();
								}); 

								$(".logo-parceiros").mouseleave(function(e) {
									e.stopPropagation();
									$(this).removeClass("zoom-logo-parceiros")
									$(".resumo-parceiro").fadeOut();
									$(".bt-next-page").fadeIn();
								});
							



							if(newProject == "datafarma3" || newProject == "datafarma5" || newProject == "datafarma6" || newProject == "consumer1" || newProject == "consumer2" || newProject == "dashboard" || newProject == "cases" ){
								$(".brand").animate({opacity: 0}, 1000, "linear", function() { $(".brand").css("display", "none"); });
							}else{
								$(".brand").css("display", "block");
								$(".brand").animate({opacity: 1}, 1000, "linear", function() {  });
							}

							if(oldProject == "datafarma1" ){
								$(".item.datafarma1").css("background-image","url()");
							}


							if(newProject == "datafarma1" ){
									$(".item.datafarma1").css("background-image","url(imgs/bg-datafarma.jpg)");
									$(".item.datafarma1").css("background-size","cover");
									$(".item.datafarma1").css("background-position","center center");
								if(oldProject == "datafarma3" || oldProject == "datafarma4"){
									$(".item.datafarma1").css("background-image","url()");
									$(".bx-viewport").css("background-image","url(imgs/bg-datafarma.jpg)");
								}
							}

							if(newProject == "datafarma3" || newProject == "datafarma2"){
								$(".bx-viewport").css("background-image","url(imgs/bg-datafarma.jpg)");
								$(".bx-viewport").css("background-size","cover");
								$(".bx-viewport").css("background-position","center center");
							}

							if(newProject == "datafarma4"){
								if($(window).width() > 1200){
									$(".aba-esq").css("left",  0 )
									$(".aba-dir").css("right",  0 )
								}else{
									$(".aba-esq").css("left",  - ((1200)-$(window).width()) )
									$(".aba-dir").css("right", - ((1200)-$(window).width()) )
								}
							}
							if(newProject == "datafarma5"){
								
								
								$(".item.datafarma4").css("background-image","url()");
								$(".item.datafarma5").css("background","#003b65");
								$(".aba-dir").css("right", -500 )
								$(".aba-esq").css("left", -500 )
								setTimeout(function(){
									$(".item.datafarma5").css("background","none");
									$(".bx-viewport").css("background-image","url()");

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
								},1000)

							 
							}
							if(newProject == "datafarma6"){

								if($(window).width() > 1200){
									$(".aba-esq").css("left",  0 )
									$(".aba-dir").css("right",  0 )
								}else{
									$(".aba-esq").css("left",  - ((1200)-$(window).width()) )
									$(".aba-dir").css("right", - ((1200)-$(window).width()) )
								}
								$(".bx-viewport").css("background-image","url()");				
							}

							if(newProject == "consumer1"){
								
								$(".aba-esq").css("left",  -500 )
								$(".aba-dir").css("right",  -500 )

								$(".item.consumer1").css("background-image","url(imgs/bg-consumer.jpg)");
								$(".item.consumer1").css("background-size","cover");
								$(".item.consumer1").css("background-position","center center");
								$(".item.consumer2").css("background-image","url()");
								$(".bx-viewport").css("background-image","url()");

								if(oldProject == "consumer2"){
									$(".item.consumer1").css("background-image","url()");
									$(".bx-viewport").css("background-image","url(imgs/bg-consumer.jpg)");
									$(".bx-viewport").css("background-size","cover");
									$(".bx-viewport").css("background-position","center center");

								}
							}
							if(newProject == "consumer2"){

								$(".item.consumer1").css("background-image","url()");
								$(".item.consumer1").css("background-size","cover");
								$(".item.consumer1").css("background-position","center center");

								$(".bx-viewport").css("background-image","url(imgs/bg-consumer.jpg)");
								$(".bx-viewport").css("background-size","cover");
								$(".bx-viewport").css("background-position","center center");

							}


							if(newProject == "dashboard"){
 								$(".item.consumer2").css("background-image","url(imgs/bg-consumer.jpg)");
 								$(".item.consumer2").css("background-size","cover");
 								$(".item.consumer2").css("background-position","center center");
							}		



				},
				onSlideAfter: function($slideElement, oldIndex, newIndex) {
					//console.log("onSlideAfter");
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
			
		},
		setClient: function(s, i, $items)
		{
			//console.log("setClient");
			var $pager = $("." + s.classes.p);
			var newProject = $items.eq(i).attr("data-project");

			$("body").attr("data-project", newProject);
			
			$("body").removeAttr('class');
			$("body").attr('class', '');
			$("body").addClass("page-"+newProject)

 
			if($('body').attr('data-project')  == "sobrerb" || $('body').attr('data-project')  == "sobrerb-estrutura") {	
				$(".item-menu-secundario-1").fadeIn();
			}else{
				if($(".item-menu-secundario-1").css("display") == "block") {
					$(".item-menu-secundario-1").fadeOut();
				}
			}
		
			if($('body').attr('data-project')  == "datafarma1" || $('body').attr('data-project')  == "datafarma2" || $('body').attr('data-project')  == "datafarma3" || $('body').attr('data-project')  == "datafarma4" || $('body').attr('data-project')  == "datafarma5" || $('body').attr('data-project')  == "datafarma6") {	
				$(".item-menu-secundario-2").fadeIn();
			}else{
					$(".item-menu-secundario-2").fadeOut();
			}
			
			if($('body').attr('data-project')  == "consumer1" || $('body').attr('data-project')  == "consumer2") {	
				$(".item-menu-secundario-3").fadeIn();
			}else{
					$(".item-menu-secundario-3").fadeOut();
			}
		
			

		},
		setActive: function(s, i, $pager, $items) {
		
		//console.log("setActive")	
		//console.log("")	
			var newProject = $items.eq(i).attr("data-project");
			// var currentColor = s.colors[newProject.replace("-", "")];
			if(!scrollTripped) currentColor = s.txt[newProject.replace("-", "")];

			//$pager.find(".animated").removeClass("animated");
			//$pager.find("a").eq(i).html(s.svg.bg + s.svg.anim);
			//$('#feature-timer-background *').css('fill',currentColor);
			
			if(newProject == "rb" || newProject == "sobrerb" || newProject == "sobrerb-estrutura") {	
				rb.video.play();
				$('.overlayvideo').fadeIn();
			} else {
				$('.overlayvideo').fadeOut();
				rb.video.pause();	
			}

			if(newProject == "rb" || newProject == "sobrerb" || newProject == "sobrerb-estrutura") {	
				$(".bx-viewport").css("background","url()");
			}


		},
		hide: function(s, oldIndex, newIndex, $items, $pager)
		{
			var currentProject = $items.eq(oldIndex).attr("data-project");
			var newProject = $items.eq(newIndex).attr("data-project");
		},
		setPagerColor: function($pager, color)
		{
			//console.log("setPagerColor")
			var realColor = $('body').attr('data-project') == "content" ? '#61625F' : color;

			$pager.find("a").animate({
				color: realColor
			}, 200);
		},
		bindScroll: function()
		{
			//console.log("bindScroll")

			if(!rb.main.isMobile) {
				var currentActive,
					totalSlides = $slider.getSlideCount(),
					s = rb.feature.s;
				$('body').bind(mousewheelevt, function(e){

					scrollTripped = 1;
					currentActive = $slider.getCurrentSlide();

					//console.log("currentActive:     "+currentActive)

					var evt = window.event || e;
					evt = evt.originalEvent ? evt.originalEvent : evt;
					var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta;

					$slider.stopAuto();
 
					if(delta > 0) {
						if(currentActive > 0 && !inTransition) {

							
							if($('body').attr('data-project') == "datafarma3" || $('body').attr('data-project') == "datafarma5"){
								$slider.goToSlide(currentActive-2, 'prev');
							}else{
								$slider.goToPrevSlide();
							}


						}
					

					} else {


						if(currentActive < (totalSlides - 1) && !inTransition) {
							
							//console.log("DATAPROJETO NEXT----- "+$('body').attr('data-project'))


							if($('body').attr('data-project') == "datafarma1" || $('body').attr('data-project') == "datafarma3"){
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
			if(!rb.main.isMobile) {
				rb.feature.bindScroll();
			}
		},
		unbindScroll: function()
		{
			if(!rb.main.isMobile) {
				$('body').unbind(mousewheelevt);
			}
		}
	};
})();

 
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

			//console.log("init home")

		}
	}
})();

rb.video = (function() {
	var	video;
	return {
		init: function() {
			$(".video-container video").each(function() {
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

	$(window).scroll(function() {
		rb.main.scrollBindings();
	});
	$(window).resize(function() {
		rb.main.resizeBindings();
	})

 $("#owl-demo").owlCarousel({

      navigation : true,
      slideSpeed : 300,
      paginationSpeed : 400,
      singleItem : true,


      // "singleItem:true" is a shortcut for:
      // items : 1, 
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false

      });

});















/*!
 * jCarouselLite - v1.1 - 2014-09-28
 * http://www.gmarwaha.com/jquery/jcarousellite/
 * Copyright (c) 2014 Ganeshji Marwaha
 * Licensed MIT (https://github.com/ganeshmax/jcarousellite/blob/master/LICENSE)
 

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
            	//console.log("go");
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
                        	//console.log("start")	
                            running = true;
                        },
                        done: function() {
                        	//console.log("done")	
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
            	//console.log("initVariables")	
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
            	//console.log("initStyles")	
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
            	//console.log("attachEventHandlers")
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
                    	//console.log("div.mousewheel(function(e, d) {")
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
            	//console.log("setupAutoScroll")
                autoTimeout = setTimeout(function() {
                    go(calculatedTo + options.scroll);
                }, options.auto);
            }

            function visibleItems() {
            	//console.log("visibleItems")
                return li.slice(calculatedTo).slice(0,numVisible);
            }

            function adjustOobForCircular(to) {
            	//console.log("adjustOobForCircular")
                var newPosition;

                // If first, then goto last
                if(to <= options.start - numVisible - 1) {
                    newPosition = to + initialItemLength + options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition - options.scroll;

                    //console.log("Before - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }

                // If last, then goto first
                else if(to >= itemLength - numVisible + 1) {
                    newPosition = to - initialItemLength - options.scroll;
                    ul.css(animCss, -(newPosition * liSize) + "px");
                    calculatedTo = newPosition + options.scroll;

                    //console.log("After - Positioned at: " + newPosition + " and Moving to: " + calculatedTo);
                }
            }

            function adjustOobForNonCircular(to) {
            	//console.log("adjustOobForNonCircular")
                // If user clicks "prev" and tries to go before the first element, reset it to first element.
                if(to < 0) {
                    calculatedTo = 0;
                }
                // If "to" is greater than the max index that we can use to show another set of elements
                // it means that we will have to reset "to" to a smallest possible index that can show it
                else if(to > itemLength - numVisible) {
                    calculatedTo = itemLength - numVisible;
                }

                //console.log("Item Length: " + itemLength + "; " +
                    "To: " + to + "; " +
                    "CalculatedTo: " + calculatedTo + "; " +
                    "Num Visible: " + numVisible);
            }

            function disableOrEnableButtons() {
            	//console.log("disableOrEnableButtons")
                $(options.btnPrev + "," + options.btnNext).removeClass("disabled");
                $( (calculatedTo-options.scroll<0 && options.btnPrev)
                    ||
                    (calculatedTo+options.scroll > itemLength-numVisible && options.btnNext)
                    ||
                    []
                ).addClass("disabled");
            }

            function animateToPosition(animationOptions) {
            	//console.log("animateToPosition")
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

			//console.log("init cal func")
		    setInterval(function(){
		    	//console.log("1")
			    $(".dashboard-imagens .carouseldashboard").jCarouselLite({
			        btnNext: ".next",
			        btnPrev: ".prev",
			        visible: 1,
			        speed: 500
			    });

			    if(rb.main.isMobile){

				    $(".sobrerb-imagens .carouselsobrerb").jCarouselLite({
				        btnNext: ".nextsobrerb",
				        btnPrev: ".prevsobrerb",
				        visible: 1,
				        speed: 500
				    });
			  /*
				    $(".consumer2 .galery").jCarouselLite({
				        btnNext: ".nextconsumer2",
				        btnPrev: ".prevconsumer2",
				        visible: 1,
				        speed: 500
				    });

			
			    }
			},2500);


});


*/
