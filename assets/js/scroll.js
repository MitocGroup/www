/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
$(document).ready(function() {
  $(window).scroll(function() {
    var window_top = $(window).scrollTop() + 12;

    var div_top = $('#checkdiv').offset().top;
    if (window_top >= div_top) {
      $('.nav-scroll').addClass('stickydiv');
    } else {
      $('.nav-scroll').removeClass('stickydiv');
    }
  });

  $(document).on('scroll', onScroll);

  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off('scroll');
    $('a').each(function() {
      $(this).removeClass('active');
    });
    $(this).addClass('active');
    var target = this.hash;
    var menu = target;
    $target = $(target);
    $('html, body')
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top + 2
        },
        600,
        'swing',
        function() {
          window.location.hash = target;
          $(document).on('scroll', onScroll);
        }
      );
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('#sidebar a').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr('href'));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('#sidebar ul li a').removeClass('active');
      currLink.addClass('active');
    } else {
      currLink.removeClass('active');
    }
  });
}
