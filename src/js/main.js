$(function() {

	const heroSwiper = new Swiper('.hero__swiper', {
		slidesPerView: 1
	});

	$('.header__btn').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('is-fixed');
		$('.header__main').fadeToggle(300);
	});

});
