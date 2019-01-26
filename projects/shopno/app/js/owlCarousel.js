
$(document).ready(function() {
    $('#about-carousel').owlCarousel({
        loop: true,
        nav: true,
        navText: false,
        items: 1,
        responsiveClass: true,
        responsive: {
            0: {nav: false, navText: false},
            992: {nav: true, navText: false, items: 1}
        }
    });
    $('#comments-carousel').owlCarousel({
        loop:true,
        nav:true,
        navText:false,
        items:1,
        responsiveClass:true,
        responsive:{
            0:{nav:false, navText:false},
            768:{nav:true, navText:false, items:1}}
    });
});
