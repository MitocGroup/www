(function($, win) {
  'use strict';

  let $win = $(win);
  let $content = $('#jsonContent');

  $('.mdi-menu').on('click', function() {
    $(this).toggleClass('open').toggleClass('mdi-menu').toggleClass('mdi-close');

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
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
  });

  $('#mce-error-response, #mce-success-response').on('click',function() {
    $('#mce-error-response, #mce-success-response').fadeOut('fast');
  });

  /**
   * Parse confirmation message and append it to the page
   */
  function confirmationMessage() {
    let location = document.location.toString();
    if (location.toString().indexOf('?mc-message=') > 0) {
      let message = (location.split('?mc-message='))[1];

      $('#mc-message').text(decodeURI(message || ''));
    }
  }

  confirmationMessage();

  // /**
  //  * Render Medium feed (on home page only)
  //  */
  // function renderMediumFeed() {
  //   if ($content.length === 0) {
  //     return;
  //   }

  //   $.getJSON('/json/medium-feed.json').done(data => {
  //     let html = '';

  //     data.forEach((post, index) => {
  //       post.image.replace('images/v2/medium/', '');
  //       html += `<div class="flex-item-4">
  //          <div class="blog-content flex-column">
  //          <div class="img-block">
  //            <a href="${post.url}" class="blog-element" alt="${post.title}" target="_blank" rel="noopener">
  //              <img class="img-responsive lazyload" data-src="/images/v2/medium/${post.image}" alt="${post.title}" />
  //            </a>
  //          </div>
  //             <span class="post-date">${post.publishedAt}</span>
  //             <h4 class="post-title"><a href="${post.url}" target="_blank" rel="noopener">${post.title}</a></h4>
  //             <a href="${post.url}" class="read-more" target="_blank" rel="noopener">
  //               Read More <i class="mdi mdi-chevron-right"></i>
  //             </a>
  //          </div> 
  //       </div>`;
  //     });
  //     $content.html(html);
  //   }).fail(() => {
  //     $content.text('Cannot fetch Medium feed');
  //   });
  // }

  // // renderMediumFeed();

  let $filterBtns = $('.filter-btn');
  let $parent = $('#parent').children('div');

  $filterBtns.on('click', function() {
    if (this.id === 'all') {
      $parent.fadeIn(450);
    } else {
      let $el = $(`.${this.id}`).fadeIn(450);
      $parent.not($el).hide();
    }

    $filterBtns.removeClass('active');
    $(this).addClass('active');
  });

  $win.on('scroll', function() {
    let $whiteCol = $('.white-color');
    let $navBarFix = $('.navbar-fix');

    if ($win.scrollTop() > 30) {
      $navBarFix.addClass('color-nav');
      $whiteCol.removeClass('gray-color');
    } else {
      $navBarFix.removeClass("color-nav");
      $whiteCol.addClass('gray-color');
    }
  });

  /**
   * Scroll to the element
   * @param {string} offsetAdj
   * @param {int} time
   * @returns {$}
   */
  $.fn.goTo = function(offsetAdj, time) {
    let realOffset = $(this).offset().top;
    let animationTime = time || 'fast';
    let additionalOffset = offsetAdj || '+0';

    $('html, body').animate({
      scrollTop: eval(realOffset + additionalOffset) + 'px'
    }, animationTime);

    return this;
  };
  
  $('.team-show-more, .team-less-more').on('click', function(e) {
    e.preventDefault();
    let $parentBlock = $(this).parents('.shadow-block');
    let $hiddenBlock = $parentBlock.find('.hidden-block');

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
  window.history.back()
}

const lazy = () => {
  document.addEventListener('lazyloaded', (e) => {
    e.target.parentNode.classList.add('image-loaded');
    e.target.parentNode.classList.remove('loading');
  });
}

lazy();
