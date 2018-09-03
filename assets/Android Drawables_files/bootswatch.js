$('a[rel=tooltip]').tooltip({
	'placement': 'bottom'
});


$('.navbar a, .subnav a').smoothScroll();


(function ($) {

	$(function(){

		// fix sub nav on scroll
		var $win = $(window),
				$body = $('body'),
				$nav = $('.subnav'),
				navHeight = $('.navbar').first().height(),
				subnavHeight = $('.subnav').first().height(),
				subnavTop = $('.subnav').length && $('.subnav').offset().top - navHeight,
				marginTop = parseInt($body.css('margin-top'), 10);
				isFixed = 0;

		processScroll();

		$win.on('scroll', processScroll);

		function processScroll() {
			var i, scrollTop = $win.scrollTop();

			if (scrollTop >= subnavTop && !isFixed) {
				isFixed = 1;
				$nav.addClass('subnav-fixed');
				$body.css('margin-top', marginTop + subnavHeight + 'px');
			} else if (scrollTop <= subnavTop && isFixed) {
				isFixed = 0;
				$nav.removeClass('subnav-fixed');
				$body.css('margin-top', marginTop + 'px');
			}
		}

	});

})(window.jQuery);
/*
     FILE ARCHIVED ON 02:53:21 Oct 09, 2017 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:59:16 Sep 03, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 1681.747 (3)
  esindex: 0.009
  captures_list: 1704.487
  CDXLines.iter: 15.785 (3)
  PetaboxLoader3.datanode: 151.63 (4)
  exclusion.robots: 0.337
  exclusion.robots.policy: 0.325
  RedisCDXSource: 1.936
  PetaboxLoader3.resolve: 2590.351 (2)
  load_resource: 1069.028
*/