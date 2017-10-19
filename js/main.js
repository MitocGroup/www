$(function() {
  'use strict';

  let $content = $('#jsonContent');

  $('.icon-burger').on('click', function() {
    $(this).toggleClass('open').toggleClass('icon-burger').toggleClass('icon-arrow');

    if ($('.icon-arrow').hasClass('open')) {
      $('html').css('overflow', 'hidden');
      $('.navbar-fix').addClass('color-nav-responsive');
      $('.hide-mobile, footer').addClass('hidden');
    } else {
      $('html').css('overflow', 'scroll');
      $('.navbar-fix').removeClass('color-nav-responsive');
      $('.hide-mobile, footer').removeClass('hidden');
    }
  });

  $('.anchor').on('click', function(e) {
    if ($(window).width() > 992) {
      e.preventDefault();
      e.stopPropagation();

      let anchor = this.getAttribute('href').replace(new RegExp('\/', 'g'), '');
      $(`#${anchor}`).goTo('-50', 1000);
    }
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

  /**
   * Render Medium feed (on home page only)
   */
  function renderMediumFeed() {
    if ($content.length === 0) {
      return;
    }

    $.getJSON('/json/medium-feed.json').done(data => {
      let html = '';
      data.forEach((post, index) => {
        let flexClass = 'flex-item-12';
        let posClass = '';

        if (index > 0) {
          flexClass = 'flex-item-6';
          posClass = (index === 1) ? 'leftPostItem' : 'rightPostItem';
        }

        html += `<div class="${flexClass} ${posClass}">
          <div class="blog-post flex-row">
              <div class="blog-content flex-item-6 block-effect">
                  <span class="post-date">${post.publishedAt}</span>
                  <h4><a href="${post.url}" target="_blank">${post.title}</a></h4>
                  <a href="${post.url}" class="button read-more" target="_blank">
                      Read More <i class="icon-arrow icon-arrow-more"></i>
                  </a>
              </div>
              <div class="flex-item-6 img-block">
                  <a href="${post.url}" class="blog-element" target="_blank">
                      <img class="img-responsive" src="images/medium/${post.image}">
                  </a>
              </div>
          </div>
      </div>`;
      });

      $content.html(html);
    }).fail(() => {
      $content.text('Cannot fetch Medium feed');
    });
  }

  renderMediumFeed();

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
});

$(window).scroll(function() {
    // didScroll = true;
    if ($(window).scrollTop() > 30) {
        $('.navbar-fix').addClass('color-nav');
        $('.white-color').removeClass('gray-color');
    } else {
        $('.navbar-fix').removeClass("color-nav");
        $('.white-color').addClass('gray-color');
    }
});
