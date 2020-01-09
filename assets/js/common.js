'use strict';
$(document).ready(function() {

    var isMobile = false; 
    if( /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('html').addClass('touch');
        isMobile = true;
	
    }
    else {
        $('html').addClass('no-touch');
        isMobile = false;
    }

	var tweenTime = 4; 

	var master = new TimelineMax({delay: tweenTime-1.2});
	master.eventCallback('onComplete', function() {
        tween(); 
		sliders(); 
    });

	$('body, .js-img-load').imagesLoaded({ background: !0 }).always( function( instance ) {
	    preloader(); 
    });

	function preloader() {
		var tl = new TimelineMax({paused: true});
		tl.set('body', {
			className: '+=no-scroll'
		})
		.set('.preloader', {
			opacity: 1
		})
		.addLabel('first')
		.to('.preloader__logo', 1.5, {
			opacity: 1,
			scale: 1,
			webkitFilter: 'blur(0px)',
			ease: 'Power3.easeInOut'
		})
		.to('.preloader__progress span', 1, {
			width: '100%',
			ease: 'Power3.easeInOut'
		}, 'first+=.5')	
		.to('.preloader', 1.3, {
			delay: 1,
			opacity: 0,
			zIndex: -1,
			ease: 'Power3.easeInOut'
		})
		.to('.preloader__wrap', .5, {
			yPercent: '100%',
			opacity: 0,
			ease: 'Power1.easeIn'
		}, '-=1.5')		
        .to('body', 0, {
			className: '-=no-scroll'
		}, '-=1.0');

        tl.duration(tweenTime).play();
        console.log(tl.endTime());
			
		return tl;
	};


	function niceScroll() {
	    if (!isMobile) {
            $('html').niceScroll({
		        horizrailenabled:false,
		        cursorborder: "none",
		        scrollspeed: 80, 
                mousescrollstep: 40,
	        });
	    }
	};

	niceScroll();

    $('.hamburger').on('click', function() {
        $(this).toggleClass('is-active');
        $('html').toggleClass('is-scroll-disabled');
	    $('body').toggleClass('open');
	    $('.menu').toggleClass('menu-show');
        $('.ef-background').addClass('animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
        function(){
            $(this).removeClass('animated');
        });
    });

    $(document).on('keyup', function(e) {
        if (e.keyCode === 27) $('.open .hamburger').click();
    });

    $('.menu-list__item').on('mouseenter', function(){
        $('.menu-list').addClass('has-hovered-link');
    });
    $('.menu-list__item').on('mouseleave', function(){
        $('.menu-list').removeClass('has-hovered-link');
    });
  
    $(window).on('scroll', function() {
	    $('.navbar-change').each(function(index, value) {
            var navToggle = $('#start').offset().top;

            if ($(window).scrollTop() >= navToggle){
                $('.navbar').removeClass('navbar--white');
            } else {
                $('.navbar').addClass('navbar--white');
            }
        });
    });
  
    var sideNavOpen = $('.hamburger');
    var tl = new TimelineMax({paused:true, reversed:true});

    $('.sideNav').each(function(i) {
        tl.timeScale(1);
        tl.to('.overlay-sideNav', 0.3, { opacity:1, zIndex:2, visibility:'visible' })

        .to('.sideNav', 0.5, {
            x: 0,
            ease: Power2.easeInOut
        },'-=0.5')

        .staggerFrom('.sideNav__item', 0.2, {
            opacity: 0,
            x: 70,
            ease: Back.easeOut
        },0.06, '-=0.18');
    });  
  
    $(sideNavOpen).on('click', function() {
        tl.reversed() ? tl.play() : tl.reverse();	
    });
  
    $('.sideNav-collapsed').on('click', function() {
        $(this).toggleClass('sideNav__item-open').parent('li').siblings('li').children('span.sideNav-collapsed').removeClass('sideNav__item-open');
        $(this).parent().toggleClass('sideNav__item-open').children('ul').slideToggle(500).end().siblings('.sideNav__item-open').removeClass('sideNav__item-open').children('ul').slideUp(500);
    });
  
    function followCursor() {
        var $circleCursor = $('.cursor');
        function moveCursor(e) {
	        var t = e.clientX + "px",
                n = e.clientY + "px";
			
	        TweenMax.to($circleCursor, .2, {
                left: t,
                top: n,
	            ease: 'Power1.easeOut'
            });
        }
        $(window).on('mousemove', moveCursor);
  
        function zoomCursor(e) {
	        TweenMax.to($circleCursor, .1, {
	            scale: 4,
	            ease: 'Power1.easeOut'
            });
		    $($circleCursor).removeClass('cursor-close');
        }  
        $('a, .zoom-cursor').on('mouseenter', zoomCursor);
  
        function closeCursor(e) {
	        TweenMax.to($circleCursor, .1, {
	            scale: 4,
	            ease: 'Power1.easeOut'
            });
		    $($circleCursor).addClass('cursor-close');
        }  
        $('.trigger-close').on('mouseenter', closeCursor);  

        function defaultCursor(e) {
	        TweenLite.to($circleCursor, .1, {
	            scale: 1,
	            ease: 'Power1.easeOut'
            });
		    $($circleCursor).removeClass('cursor-close');
        }
  
        $('a, .zoom-cursor, .trigger-close, .trigger-plus').on('mouseleave', defaultCursor);
    };
	
	followCursor();
    
	function scrollIndicator() {
        $(window).on('scroll', function() {
            var wintop = $(window).scrollTop(), docheight = 
            $(document).height(), winheight = $(window).height();
 	        var scrolled = (wintop/(docheight-winheight))*100;
  	        $('.scroll-line').css('width', (scrolled + '%'));
        });
    };

	scrollIndicator();

	var $sliderDelay = 15000,
	    $sliderSpeed = 1200; 
	
    var count = 0,
    $svg = $('.slider-nav--progress').drawsvg({
		duration: $sliderDelay,
		stagger: $sliderSpeed,
		reverse: true
    });
    function animateDrawsvg() {
        $svg.drawsvg('animate');
    }
	
    function sliders() {
        $('.slider-horizontal').each(function() {
            var interleaveOffset = 0.5;
			
            var halfSliderCaption = new Swiper('.slider__caption', {
                slidesPerView: 1,
                effect: 'fade',			
	            parallax: true,
                speed: $sliderSpeed,
                simulateTouch: false,
				on: {
                    slideChange: function() {
                        animateDrawsvg();
                    }
                }
            });
			
            var halfSliderImage = new Swiper('.slider__image', {
                slidesPerView: 1,
			    speed: $sliderSpeed,
                simulateTouch: false,
	            roundLengths: true,
	            parallax: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
		            clickable: true
                },
                autoplay: {
                    disableOnInteraction: false,
					delay: $sliderDelay,
                },
                keyboard: {
	                enabled: true
	            },
                mousewheel: {
		            eventsTarged: '.hero',
		            sensitivity: 1
	            },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                on: {
                    progress: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;					
                            swiper.slides[i].querySelector('.cover-slider').style.transform = 'translateX(' + innerTranslate + 'px)';
                        }
                    },
                    touchStart: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = '';
                        }
                    },
                    setTransition: function(speed) {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + 'ms';
                            swiper.slides[i].querySelector('.cover-slider').style.transition = speed + 'ms';
                        }
                    }
                }
            });

            halfSliderCaption.controller.control = halfSliderImage;
            halfSliderImage.controller.control = halfSliderCaption;
		});
		
		$('.slider-vertical').each(function() {
            var interleaveOffset = 0.5;
	        var interleaveOffsetCaption = 1;
	
            var halfSliderCaption = new Swiper('.slider__caption', {
                slidesPerView: 1,
                effect: 'fade',
	            direction: 'vertical',
	            parallax: true,
                speed: $sliderSpeed,
                simulateTouch: false,
				on: {
                    slideChange: function() {
                        animateDrawsvg();
                    }
                }
            });
	
            var halfSliderImage = new Swiper('.slider__image', {
                slidesPerView: 1,
			    speed: $sliderSpeed,
			    direction: 'vertical',
                simulateTouch: false,
	            roundLengths: true,
	            parallax: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'fraction',
		            clickable: true
                },
                autoplay: {
                    disableOnInteraction: false,
					delay: $sliderDelay,
                },
                keyboard: {
	                enabled: true
	            },
                mousewheel: {
		            eventsTarged: '.hero',
		            sensitivity: 1
	            },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                on: {
                    progress: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.height * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;
                                swiper.slides[i].querySelector('.cover-slider').style.transform = 'translateY(' + innerTranslate + 'px)';
                        }
                    },
                    touchStart: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = '';
                        }
                    },
                    setTransition: function(speed) {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + 'ms';
                            swiper.slides[i].querySelector('.cover-slider').style.transition = speed + 'ms';
                        }
                    }
                }
            });
    
            var halfSliderDetails = new Swiper('.slider-container-details', {
                slidesPerView: 1,
                
                effect: 'fade',
	            parallax: true,
                speed: $sliderSpeed,
                simulateTouch: false
            });
		

            halfSliderCaption.controller.control = halfSliderImage;
            halfSliderImage.controller.control = halfSliderCaption;

            halfSliderImage.controller.control = halfSliderDetails;
            halfSliderDetails.controller.control = halfSliderImage;
		
            halfSliderCaption.controller.control = halfSliderDetails;
            halfSliderDetails.controller.control = halfSliderCaption;		
		});
		
		$('.slider-fullscreen').each(function() {
            var interleaveOffset = 0.7;
			
            var halfSliderCaption = new Swiper('.slider__caption', {
                slidesPerView: 1,
                effect: 'fade',
	            parallax: true,
                speed: $sliderSpeed,
                simulateTouch: false,
				on: {
                    slideChange: function() {
                        animateDrawsvg();
                    }
                }
            });
			
            var halfSliderImage = new Swiper('.slider__image', {
                slidesPerView: 1,
			    speed: $sliderSpeed,
                simulateTouch: false,
	            roundLengths: true,
	            parallax: true,
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
		            clickable: true
                },
                autoplay: {
                    disableOnInteraction: false,
					delay: $sliderDelay,
                },
                keyboard: {
	                enabled: true
	            },
                mousewheel: {
		            eventsTarged: '.header-fullscreen',
		            sensitivity: 1
	            },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                on: {
                    progress: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            var slideProgress = swiper.slides[i].progress,
                                innerOffset = swiper.width * interleaveOffset,
                                innerTranslate = slideProgress * innerOffset;					
                                swiper.slides[i].querySelector('.cover-slider').style.transform = 'translateX(' + innerTranslate + 'px)';
                        }
                    },
                    touchStart: function() {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = '';
                        }
                    },
                    setTransition: function(speed) {
                        var swiper = this;
                        for (var i = 0; i < swiper.slides.length; i++) {
                            swiper.slides[i].style.transition = speed + 'ms';
                            swiper.slides[i].querySelector('.cover-slider').style.transition = speed + 'ms';
                        }
                    }
                }
			
            });
			
            halfSliderCaption.controller.control = halfSliderImage;
            halfSliderImage.controller.control = halfSliderCaption;
		});
		
        var interleaveOffsetArticle = 0.7;
        var halfSliderImage = new Swiper('.slider-article', {
            slidesPerView: 1,
            loop: true,
		    speed: 1200,
            simulateTouch: false,
	        roundLengths: true,
	        parallax: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
		        clickable: true
            },
            autoplay: {
                disableOnInteraction: false,
				delay: 5000, 
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },

            on: {
                progress: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        var slideProgress = swiper.slides[i].progress,
                            innerOffset = swiper.width * interleaveOffsetArticle,
                            innerTranslate = slideProgress * innerOffset;
                            swiper.slides[i].querySelector('.cover-slider').style.transform = 'translateX(' + innerTranslate + 'px)';
                    }
                },
                touchStart: function() {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = '';
                    }
                },
                setTransition: function(speed) {
                    var swiper = this;
                    for (var i = 0; i < swiper.slides.length; i++) {
                        swiper.slides[i].style.transition = speed + 'ms';
                        swiper.slides[i].querySelector('.cover-slider').style.transition = speed + 'ms';
                    }
                }
            }
        });
        var swiper = new Swiper('.projects-carousel', {
		    loop: true,
            slidesPerView: 'auto',
            spaceBetween: 140,
            centeredSlides: true,
		    speed: 900,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
			    type: 'progressbar',
            },		
		    keyboard: {
	            enabled: true
	        },
            mousewheel: {
		        eventsTarged: '.grid-carousel',
		        sensitivity: 1
	        },
		    breakpoints: {
		        0: {
                    spaceBetween: 0
                },
			    580: {
				    spaceBetween: 0
			    },
			    768: {
				    spaceBetween: 40
			    },
			    990: {
				    spaceBetween: 80
			    },
			    1200: {
				    spaceBetween: 100
			    },
			    1500: {
				    spaceBetween: 120
			    }			
            }
        });		
    };
  
    $('.js-image').each(function(){
        var dataImage = $(this).attr('data-image');
        $(this).css('background-image', 'url(' + dataImage + ')');
    });
  
    $('.select').on('click','.placeholder',function(){
      var parent = $(this).closest('.select');
      if ( ! parent.hasClass('is-open')){
          parent.addClass('is-open');
          $('.select.is-open').not(parent).removeClass('is-open');
      }else{
          parent.removeClass('is-open');
      }
    }).on('click','ul>li',function(){
        var parent = $(this).closest('.select');
        parent.removeClass('is-open').find('.placeholder').text( $(this).text() );
        parent.find('input[type=hidden]').attr('value', $(this).attr('data-value') );
	
	    $('.filters__item').removeClass('active');
	    $(this).addClass('active');
	    var selector = $(this).attr('data-filter');
	    $('.js-sort').isotope({
	        filter: selector
	    });
	    return false;	
    });
	

    function tween() {
        var ctrl = new ScrollMagic.Controller(); 
        var $split = $('.js-lines'); 
        function textWave(){
            if($(".js-text-wave").length){
                $(".js-text-wave").each(function(){
                    if(!$(this).hasClass("complete")){
                        $(this).addClass("complete");
		                var textChange = $(this).html().replace("<br />", "~"),
		                    textChange = textChange.replace("<br>", "~"),
                            textChange = $(this).html(),
                            textArray = textChange.split(""),
                            textDone = "",
                            num;
                        for (var i = 0; i < textArray.length; i++) {
                            if(textArray[i] == " "){
                                textDone += " ";
                            } else if(textArray[i] == "~"){
                                textDone += "<br />";
                            } else{
                                textDone += '<div><span style="transition-delay: '+(i/30)+'s;">'+textArray[i]+'</span></div>';
                            }
                        }
                        $(this).html(textDone);
                    }
                });
            }
        }	
        textWave();	
	    var $splitWords = $('.js-words').length;

	    if($splitWords){
	        var $splitWords = new SplitText('.js-words', {type: 'chars, words'});
	        var tweenWords = new TimelineMax();
            tweenWords.add([
                TweenMax.staggerFrom($splitWords.chars, 0.3, {
                    y: 60,
                    opacity: 0,
			        delay: .3,
                    ease: 'Power2.easeOut'
                }, 0.05),
                TweenMax.staggerTo($splitWords.chars, 0.3, {
                    y: 0,
                    opacity: 1,
			        delay: .3,
                    ease: 'Power2.easeOut'
                }, 0.05)
            ]);
	    }
	    var $splitLoad = $('.js-lines-l');
	  
        $('.js-lines-l').each(function(i) {
	        var splitoneL = new SplitText($splitLoad[i], {type: 'lines'});
            var tweenLine = new TimelineMax({
	            delay: .6
	        });
            if (!isMobile) {
                tweenLine.staggerFrom(splitoneL.lines, .6, {
                    yPercent: 100,
                    opacity: 0,
	                ease: 'Circ.easeOut'
                }, 0.2);
            }
        });
	  
        $('.js-down').each(function() {
            var tweenDown = new TimelineMax({
		        delay: .6,
	        });
            if (!isMobile) {
                tweenDown.from(this, .6, {
                    yPercent: 100,
			        opacity: 0,
	                ease: 'Circ.easeOut'
                }, 0.2);
            }
        });
	  
        var steps = document.querySelectorAll('.reveal');

        $.each(steps, function(index, step){
		    if (!isMobile) {
                new ScrollMagic.Scene({
                    triggerElement: step,
		            triggerHook: 'onEnter',
	                reverse: false
                })
                .setClassToggle(step, 'animated')
                .addTo(ctrl);
		    }
	    });

        $('.js-scale').each(function() {
            var tweenScale = new TimelineMax();
            if (!isMobile) {
                tweenScale.from(this, .6, {
                    scale: 1.2,
			        opacity: 0,
	                ease: 'Circ.easeOut'
                });
            }
        });
	  
        $('.js-lines').each(function(i) {
	        var splitone = new SplitText($split[i], {type: 'lines'});
            var tweenLine = new TimelineMax({
		        delay: .6,
	        });
            if (!isMobile) {
                tweenLine.staggerFrom(splitone.lines, .6, {
                    y: 50,
                    opacity: 0,
	                ease: 'Circ.easeOut'
                }, 0.2);
            }
            new ScrollMagic.Scene({
                triggerElement: this,
	            triggerHook: 'onEnter',
	            reverse: false
            })
            .setTween(tweenLine)
            .addTo(ctrl);
        });

        $('.js-block').each(function() {
            var tweenBlock = new TimelineMax();
            if (!isMobile) {
                tweenBlock.from(this, .6, {
                    y: 50,
                    opacity: 0,
                    delay: .6,
	                ease: 'Circ.easeOut'
                });
            }
            new ScrollMagic.Scene({
                triggerElement: this,
	            triggerHook: 'onEnter',
	            reverse: false
            })
            .setTween(tweenBlock)
            .addTo(ctrl);
        });

        $('.js-opacity').each(function() {
            var tweenOpacity = new TimelineMax();
            if (!isMobile) {
                tweenOpacity.to(this, .6, {
                    y: 50,
                    opacity: 0,
	                ease: 'Power2.easeOut'
                });
            }
            new ScrollMagic.Scene({
                triggerElement: this,
	            triggerHook: 'onLeave',
	            duration: '100%'
            })
            .setTween(tweenOpacity)
            .addTo(ctrl);
        });
    }; 

    function parallax() {
        $('.jarallax').jarallax({
			disableParallax: /iPhone|iPod|Android/,
            speed: 0.8,
            type: 'scroll'
        });

        $('.jarallaxVideo').jarallax({
            disableVideo: /iPad|iPhone|iPod|Android/
        });
	};
	
	parallax(); 

  
    mediumZoom($('[data-zoomable]').toArray())	
	
    $('a[href^="!#"]').on('click',function (e) {
        e.preventDefault();
        var target = this.hash;
	    var $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
	
    var $someImages = $('img.cover');
    objectFitImages($someImages);

	var timeout;
    $('.parallax-container').mousemove(function(e){
        if(timeout) clearTimeout(timeout);
            setTimeout(callParallax.bind(null, e), 200);
  
    });

    function callParallax(e){
        parallaxIt(e, '.error-page', -30);
    }

    function parallaxIt(e, target, movement){
		if (!isMobile) {
            var $this = $('.parallax-container'),
                relX = e.pageX - $this.offset().left,
                relY = e.pageY - $this.offset().top;
  
            TweenMax.to(target, 1, {
                x: (relX - $this.width()/2) / $this.width() * movement,
                y: (relY - $this.height()/2) / $this.height() * movement,
                ease: Power2.easeOut
            })
		}
    }

    var initPhotoSwipeFromDOM = function(gallerySelector) {
        var parseThumbnailElements = function(el) {
            var thumbElements = el.childNodes,
                numNodes = thumbElements.length,
                items = [],
                figureEl,
                linkEl,
                size,
                item;

            for(var i = 0; i < numNodes; i++) {
                figureEl = thumbElements[i]; 
					
                if(figureEl.nodeType !== 1) {
                    continue;
                }

                linkEl = figureEl.children[0]; 
                size = linkEl.getAttribute('data-size').split('x');

                item = {
                    src: linkEl.getAttribute('href'),
                    w: parseInt(size[0], 10),
                    h: parseInt(size[1], 10)
                };

                if(figureEl.children.length > 1) {
                    item.title = figureEl.children[1].innerHTML; 
                }

                if(linkEl.children.length > 0) {
                    item.msrc = linkEl.children[0].getAttribute('src');
                } 

                item.el = figureEl;
                items.push(item);
            }
            return items;
        };

        var closest = function closest(el, fn) {
            return el && ( fn(el) ? el : closest(el.parentNode, fn) );
        };

        var onThumbnailsClick = function(e) {
            e = e || window.event;
            e.preventDefault ? e.preventDefault() : e.returnValue = false;

            var eTarget = e.target || e.srcElement;

            var clickedListItem = closest(eTarget, function(el) {
                return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
            });

            if(!clickedListItem) {
                return;
            }

            var clickedGallery = clickedListItem.parentNode,
                childNodes = clickedListItem.parentNode.childNodes,
                numChildNodes = childNodes.length,
                nodeIndex = 0,
                index;

            for (var i = 0; i < numChildNodes; i++) {
                if(childNodes[i].nodeType !== 1) { 
                    continue; 
                }

                if(childNodes[i] === clickedListItem) {
                    index = nodeIndex;
                    break;
                }
                nodeIndex++;
            }
					
            if(index >= 0) {
                openPhotoSwipe( index, clickedGallery );
            }
            return false;
        };

        var photoswipeParseHash = function() {
            var hash = window.location.hash.substring(1),
                params = {};

            if(hash.length < 5) {
                return params;
            }

            var vars = hash.split('&');
            for (var i = 0; i < vars.length; i++) {
                if(!vars[i]) {
                    continue;
                }
                var pair = vars[i].split('=');  
                if(pair.length < 2) {
                    continue;
                }           
                params[pair[0]] = pair[1];
            }

            if(params.gid) {
                params.gid = parseInt(params.gid, 10);
            }

            return params;
        };

        var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
            var pswpElement = document.querySelectorAll('.pswp')[0],
                gallery,
                options,
                items;

            items = parseThumbnailElements(galleryElement);

            options = {
                captionEl: false,
                closeEl: false,
                arrowEl: true,
                fullscreenEl: false,
                shareEl: false,
                counterEl: false,
                zoomEl: false,
                maxSpreadZoom: 1,
			    barsSize: { top: 40, bottom: 40, left: 40, right: 40 },
                closeElClasses: [
                    "item",
                    "caption",
                    "zoom-wrap",
                    "ui",
                    "top-bar",
                    "img"
                ],
			    galleryUID: 0,
                getDoubleTapZoom: function(isMouseClick, item) {
                    return item.initialZoomLevel;
                },
                pinchToClose: false,
                getThumbBoundsFn: function(index) {
                    var thumbnail = items[index].el.getElementsByTagName("img")[0], 
                        pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                        rect = thumbnail.getBoundingClientRect();
                    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                }
            };

            if(fromURL) {
                if(options.galleryPIDs) {
                    for(var j = 0; j < items.length; j++) {
                        if(items[j].pid == index) {
                            options.index = j;
                            break;
                        }
                    }
                } else {
                    options.index = parseInt(index, 10) - 1;
                }
            } else {
                options.index = parseInt(index, 10);
            }

            if( isNaN(options.index) ) {
                return;
            }

            if(disableAnimation) {
                options.showAnimationDuration = 0;
            }

            gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
            gallery.init();
        };

        var galleryElements = document.querySelectorAll( gallerySelector );
            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }

        var hashData = photoswipeParseHash();
        if(hashData.pid && hashData.gid) {
            openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
        }
    };

    initPhotoSwipeFromDOM('.photoswiper');
	
});