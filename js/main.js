$(function() {
    'use strict';

    $('.icon-burger').click(function () {
        $(this).toggleClass('open').toggleClass('icon-burger').toggleClass('icon-arrow');

        if ( $('.icon-arrow').hasClass('open')) {
            $('html').css('overflow','hidden');
            $('.navbar-fix').addClass('color-nav-responsive');
        }
        else {
            $('html').css('overflow', 'scroll');
            $('.navbar-fix').removeClass('color-nav-responsive');
        }
    });

    
    $('a[href^="#"]').click(function(e) {

        if($(window).width() < 992) {
            e.preventDefault();
            e.stopPropagation();

            var path = this.getAttribute('href');
            window.location.href = '/'+ path.replace('#', '');
            return;
        }

        var target = $(this.hash);
        if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
        if (target.length == 0) target = $('html');
        $('html, body').animate({ scrollTop: target.offset().top-50 }, 1000);
        return false;
    });
});


$(window).scroll(function(event){
    didScroll = true;
    if ($(window).scrollTop() > 30) {
        $('.navbar-fix').addClass('color-nav');
    }
    else {
        $('.navbar-fix').removeClass("color-nav");
    }
});
