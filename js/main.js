jQuery(function($) {
    'use strict';

    $('.carousel-mission').slick({
        infinite: false,
        arrows: true,
        dots: false
    });

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
                var visibleSm1;

                if (count < 3){

                    visibleSm = '';
                    visibleSm1 = '';
                } else {
                    visibleSm = ' visible-sm';
                }
                output += '<div class="flex-item-4' + visibleSm + '">';
                // output += '<span class="post-date">' + $.format.date(item.pubDate, 'MMM dd') + '</span>';
                output += '<div class="blog-post"><header>';
                var tagIndex = item.description.indexOf('<img');
                var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;
                var srcStart = srcIndex + 5;
                var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;
                var src = item.description.substring(srcStart, srcEnd);
                output += '<a href="' + item.link + '" class="blog-element" target="_blank"><img class="img-responsive" src="' + src + '" height="208px"></a></header>';
                output += '<div class="blog-content"><h4><a href="' + item.link + '" target="_blank">' + item.title + '</a></h4>';
                var yourString = item.description.replace(/<img[^>]*>/g, "");
                var maxLength = 120;
                output += '</div></div> <a href="https://blog.mitocgroup.com/" class="button" target="_blank">Read More </a></div>';
                return count < 3;
            });
            $content.html(output);
        }
    });
});
