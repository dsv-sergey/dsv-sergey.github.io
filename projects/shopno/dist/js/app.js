$("#navToggle").click(function(){$(this).toggleClass("active"),$(".overlay").toggleClass("open"),$("body").toggleClass("locked")}),$(document).ready(function(){$("#about-carousel").owlCarousel({loop:!0,nav:!0,navText:!1,items:1,responsiveClass:!0,responsive:{0:{nav:!1,navText:!1},992:{nav:!0,navText:!1,items:1}}}),$("#comments-carousel").owlCarousel({loop:!0,nav:!0,navText:!1,items:1,responsiveClass:!0,responsive:{0:{nav:!1,navText:!1},768:{nav:!0,navText:!1,items:1}}})});