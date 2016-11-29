//duplicate-nav

$(document).ready(function(){

	if(window.matchMedia("(min-width: 768px)").matches)	{


		$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
		$('.duplicate-nav').fadeIn();
		} else {
		$('.duplicate-nav').fadeOut();
		}
		});

	};


});
