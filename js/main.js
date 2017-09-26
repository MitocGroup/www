jQuery(function($) {
    'use strict';

    $('.carousel-mission').slick({
        infinite: false,
        arrows: true,
        dots: false
    });

});

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.navbar-fix').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
    if ($(window).scrollTop() > 50) {
        $('.navbar-fix').addClass('color-nav');
    }
    else {
        $('.navbar-fix').removeClass("color-nav");
    }
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight){
        
        $('.navbar-fix').removeClass('nav-down').addClass('nav-up');
    } else {
        
        if(st + $(window).height() < $(document).height()) {
            $('.navbar-fix').removeClass('nav-up').addClass('nav-down');
        }
    }

    lastScrollTop = st;
}



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

$(function () {
    var $content = $('#jsonContent');
    var data = {
        rss_url: 'https://blog.mitocgroup.com/feed'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
        if (response.status == 'ok') {
            var output = '';
            var count = 0;
            $.each(response.items, function (k, item) {
                if (/.*vinde-utilaje-absolut-gratuit-575eed5d9185.*/.test(item.link)) {
                    return;
                }

                count++;
                var visibleSm;

                if (count < 3){

                    visibleSm = '';
                } else {
                    visibleSm = ' visible-sm';
                }
                console.log(k);
                var flexN = '';
                var leftPostItem = '';
                var rightPostItem = '';
                if (k == 0) flexN = 12;
                else flexN = 6;

                if (k == 1) leftPostItem = ' leftPostItem';
                if (k == 2) rightPostItem = ' rightPostItem';

                output += '<div class="flex-item-'+ flexN + visibleSm + rightPostItem + leftPostItem + '">';
                // output += '<span class="post-date">' + $.format.date(item.pubDate, 'MMM dd') + '</span>';
                output += '<div class="blog-post flex-row">';
                var tagIndex = item.description.indexOf('<img');
                var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;
                var srcStart = srcIndex + 5;
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;
                var src = item.description.substring(srcStart, srcEnd);
                output += '<div class="blog-content flex-item-6"><h4><a href="' + item.link + '" target="_blank">' + item.title + '</a></h4><a href="https://blog.mitocgroup.com/" class="button" target="_blank">Read More </a></div>';
                output += '<div class="flex-item-6 img-block"><a href="' + item.link + '" class="blog-element" target="_blank"><img class="img-responsive" src="' + src + '"></a></div>';
                var yourString = item.description.replace(/<img[^>]*>/g, "");
                var maxLength = 120;
                output += '</div></div>';
                return count < 3;
            });
            $content.html(output);
        }
    });
});
