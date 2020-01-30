/* eslint-disable no-unused-vars */
(function($, win) {
  'use strict';

  const $win = $(win);

  $.fn.fixedMenu = function() {
    const scrollPos = $win.scrollTop();
    const $whiteCol = $('.white-color');
    const $navBarFix = $('.navbar-fix');

    if (scrollPos > 30) {
      $navBarFix.addClass('color-nav');
      $whiteCol.removeClass('gray-color');
    } else {
      $navBarFix.removeClass('color-nav');
      $whiteCol.addClass('gray-color');
    }
    return this;
  };

  $(document).ready(function() {
    $win.fixedMenu();
  });

  // $('.mdi-menu').on('click', function() {
  //   $(this)
  //     .toggleClass('open')
  //     .toggleClass('mdi-menu')
  //     .toggleClass('mdi-close');

  //   if ($('.mdi-close').hasClass('open')) {
  //     $('html').css('overflow', 'hidden');
  //     $('.navbar-fix').addClass('color-nav-responsive');
  //     $('.hide-mobile, footer').addClass('hidden');
  //   } else {
  //     $('html').css('overflow', 'scroll');
  //     $('.navbar-fix').removeClass('color-nav-responsive');
  //     $('.hide-mobile, footer').removeClass('hidden');
  //   }
  // });

  const $menu = $('#menu-toggle');

  $menu.click(function() {
    $(this)
      .toggleClass('open')
      .toggleClass('mdi-menu')
      .toggleClass('mdi-close');

    if ($('.mdi-close').hasClass('open')) {
      $('html').css('overflow', 'hidden');
      $('.navbar-fix').addClass('color-nav-responsive');
      $('.hide-mobile, footer').addClass('hidden');
    } else {
      $('html').css('overflow', 'scroll');
      $('.navbar-fix').removeClass('color-nav-responsive');
      $('.hide-mobile, footer').removeClass('hidden');
    }
  });

  $('.anchor').click(function() {
    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top
      },
      500
    );
    return false;
  });

  $('#mce-error-response, #mce-success-response').on('click', function() {
    $('#mce-error-response, #mce-success-response').fadeOut('fast');
  });

  /**
   * Parse confirmation message and append it to the page
   */
  function confirmationMessage() {
    const location = document.location.toString();
    if (location.toString().indexOf('?mc-message=') > 0) {
      const message = location.split('?mc-message=')[1];

      $('#mc-message').text(decodeURI(message || ''));
    }
  }

  confirmationMessage();

  const $filterBtns = $('.filter-btn');
  const $parent = $('#parent').children('div');

  $filterBtns.on('click', function() {
    if (this.id === 'all') {
      $parent.fadeIn(450);
    } else {
      const $el = $(`.${this.id}`).fadeIn(450);
      $parent.not($el).hide();
    }

    $filterBtns.removeClass('active');
    $(this).addClass('active');
  });

  $win.on('scroll', function() {
    $win.fixedMenu();
  });

  /**
   * Scroll to the element
   * @param {string} offsetAdj
   * @param {int} time
   * @returns {$}
   */
  $.fn.goTo = function(offsetAdj, time) {
    const realOffset = $(this).offset().top;
    const animationTime = time || 'fast';
    const additionalOffset = offsetAdj || '+0';

    $('html, body').animate(
      {
        // eslint-disable-next-line no-eval
        scrollTop: eval(realOffset + additionalOffset) + 'px'
      },
      animationTime
    );

    return this;
  };

  $('.team-show-more, .team-less-more').on('click', function(e) {
    e.preventDefault();
    const $parentBlock = $(this).parents('.shadow-block');
    const $hiddenBlock = $parentBlock.find('.hidden-block');

    $parentBlock.find('.team-less-more').toggleClass('hidden');
    $parentBlock.find('.team-show-more').toggleClass('hidden');
    $parentBlock.find('.hover-effect').toggleClass('open');
    $parentBlock.find('.info-blocks').toggleClass('scroll');
    if (!$hiddenBlock.hasClass('hidden')) {
      $parentBlock.goTo('-80', 500);
    }

    $hiddenBlock.toggleClass('hidden');
    $parentBlock.find('.info').toggleClass('dots');
  });

  $(window).resize(function() {
    if ($win.width() > 992) {
      $('.hide-mobile, footer').removeClass('hidden');
      $('html').css('overflow-y', 'scroll');
    }
  });
})(jQuery, window);

function goBack() {
  window.history.back();
}

const lazy = () => {
  document.addEventListener('lazyloaded', (e) => {
    e.target.parentNode.classList.add('image-loaded');
    e.target.parentNode.classList.remove('loading');
  });
};

lazy();
