$(window).resize(function (event) {
	adaptive_function();
});
function adaptive_header(w, h) {
	var headerMenu = $('.header-menu');
	var headerLang = $('.header-top-lang');
	if (w < 767) {
		if (!headerLang.hasClass('done')) {
			headerLang.addClass('done').appendTo(headerMenu);
		}
	} else {
		if (headerLang.hasClass('done')) {
			headerLang.removeClass('done').prependTo($('.header-top'));
		}
	}
	if (w < 767) {
		if (!$('.header-bottom-menu').hasClass('done')) {
			$('.header-bottom-menu').addClass('done').appendTo(headerMenu);
		}
	} else {
		$.each($('.header-bottom-menu'), function (index, val) {
			if ($(this).hasClass('header-bottom-menu--right')) {
				if ($(this).hasClass('done')) {
					$(this).removeClass('done').prependTo($('.header-bottom__column').eq(2));
				}
			} else {
				if ($(this).hasClass('done')) {
					$(this).removeClass('done').prependTo($('.header-bottom__column').eq(0));
				}
			}
		});
	}
}

function adaptive_function() {
	var w = $(window).outerWidth();
	var h = $(window).outerHeight();
	adaptive_header(w, h);
}
adaptive_function();

$('.menu-header__icon').click(function (event) {
	$(this).toggleClass('active');
	$('.menu-header__menu').toggleClass('active');
	if ($(this).hasClass('active')) {
		$('body').data('scroll', $(window).scrollTop());
	}
	$('body').toggleClass('lock');
	if (!$(this).hasClass('active')) {
		$('body, html').scrollTop(parseInt($('body').data('scroll')));
	}
});

function ibg() {
	let ibg = document.querySelectorAll(".ibg"); for (var i = 0; i < ibg.length; i++) { if (ibg[i].querySelector('img')) { ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')'; } }
}
ibg();

$('body').on('click', '.tab__navitem', function(event) {
				var eq=$(this).index();
			if($(this).hasClass('parent')) {
				var eq=$(this).parent().index();
			}
		if(!$(this).hasClass('active')) {
			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if($(this).closest('.tabs').find('.slick-slider').length>0) {
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function(index, val) {
	$(this).next().show();
});
$('body').on('click', '.spoller', function(event) {
	if($(this).hasClass('mob') && !isMobile.any()) {
		return false;
	}
	if($(this).hasClass('closeall') && !$(this).hasClass('active')) {
		$.each($(this).closest('.spollers').find('.spoller'), function(index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300, function(index, val) {
			if($(this).parent().find('.slick-slider').length>0) {
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
	});
	return false;
});

function scrolloptions() {
	var scs=100;
	var mss=50;
	var bns=false;
if(isMobile.any()) {
	scs=10;
	mss=1;
	bns=true;
}
var opt={
	cursolrcolor: "#fff",
	cursorwidth: "4px",
	background: "",
	autohidemode: true,
	cursoropacitymax: 0.4,
	bouncescroll: bns,
	cursorborderradius: "0px",
	scrollspeed: scs,
	mousescrollstep: mss,
	directionlockdeadzone: 0,
	cursorborder: "0px solid #fff",
};
return opt;
}
function scroll() {
	$('.scroll-body').niceScroll('.scroll-list', scrolloptions());
}
if(navigator.appVersion.indexOf("Mac")!=-1){
}else{
	if($('.scroll-body').length>0){scroll();}
}

function map(n) {
	google.maps.Map.prototype.setCenterWithOffset = function (latlng, offsetX, offsetY) {
		var map = this;
		// var ov = new.google.maps.OverlayView();
		ov.onAdd = function () {
			var proj = this.getProjection();
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x + offsetX;
			aPoint.y = aPoint.y + offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function () { };
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		// pixelOffset: new google.maps.Size(-230, 250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055, 27.8813694)],
		[new google.maps.LatLng(50.4500336, 30.5241361)],
		[new google.maps.LatLng(52.2319581, 21.0067249)],
		[new google.maps.LatLng(54.6870458, 25.2829111)],
		[new google.maps.LatLng(50.0596288, 14.44645927)]
	]
	var options = {
		zoom: 4,
		panControl: false,
		mapTypeControl: false,
		center: locations[0][0],
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon = {
		url: '',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			position: locations[i][0],
			map: map,
		});
		markers.push(marker);
	}
}
if ($("#map").length > 0) {
	map();
}