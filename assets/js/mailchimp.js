jQuery(function($) {
  'use strict';

  const inputForm = $('.input');
  const $subscribeForm = $('#subscribe-form-blog');
  const subscriptionBtn = $('#submit-blog-subscribe');

  $subscribeForm.on('submit', function(e) {
    e.preventDefault();
    $(subscriptionBtn).trigger('click');
  });

  $subscribeForm.MailChimpForm({
    url: 'https://mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&amp;id=243972cdb5',
    fields: '0:EMAIL',
    inputSelector: '.input',
    submitSelector: '#submit-blog-subscribe',
    onFail: function(errMsg) {
      let genErr = $('#mc-general');
      genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => {
        genErr.html('');
      }, 5000);
    },
    onOk: function(okMsg) {
      $('#hide-mc').hide();
      let genMc = $('#mc-message');
      genMc.html(`<div class="success">${okMsg}</div>`);
    }
  });

  /**
   * mc:input:error event handler
   */
  inputForm.on('mc:input:error', function() {
    $(this).addClass('error');
  });

  /**
   * mc:input:error event handler
   */
  inputForm.on('mc:input:ok', function() {
    $(this).removeClass('error');
  });
});
