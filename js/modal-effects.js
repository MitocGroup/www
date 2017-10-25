$(function() {
  'use strict';

  let $body = $('body');
  let $inputViewport =   $('.viewport-control');
  
  let startProjectContent = `<div class="md-content popup">
      <h3>Start a Project</h3>
      <div>
          <form id="start-project-form" class="form-styles">
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-FNAME input-styles space-input">
                      <input type="text" name="FNAME" placeholder="Full name" class="input-popup">
                      <div class="mc-error"></div>
                  </div>    
              </div>
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-EMAIL input-styles space-input">
                      <input type="email" name="EMAIL" placeholder="Email" class="input-popup">
                      <div class="mc-error"></div>
                  </div>
              </div>
              <div class="flex-row">
                  <div class="flex-item-12" id="mc-general-error-project"></div>
              </div>
              <div class="flex-row">
                  <div class="flex-item-6">
                      <button class="btn-popup cancel-modal-btn">Cancel</button>
                  </div>
                  <div class="flex-item-6">
                      <button class="btn-popup" type="button" id="submit-modal-form">Submit</button>
                  </div>
              </div>
          </form>
      </div>
  </div>`;

  let becomePartnerContent = `<div class="md-content popup">
      <h3>Become a Partner</h3>
      <div>
          <form id="become-partner-form" class="form-styles">
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-FNAME input-styles space-input">
                      <input type="text" name="FNAME" placeholder="Full name" class="input-popup">
                      <div class="mc-error"></div>
                  </div>    
              </div>
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-COMPANY input-styles space-input">
                      <input type="text" name="COMPANY" placeholder="Company" class="input-popup">
                      <div class="mc-error"></div>
                  </div>    
              </div>
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-EMAIL input-styles space-input">
                      <input type="email" name="EMAIL" placeholder="Email" class="input-popup">
                      <div class="mc-error"></div>
                  </div>
              </div>
              <div class="flex-row">
                  <div class="flex-item-12" id="mc-general-error-partner"></div>
              </div>
              <div class="flex-row">
                  <div class="flex-item-6">
                      <button class="btn-popup cancel-modal-btn">Cancel</button>
                  </div>
                  <div class="flex-item-6">
                      <button class="btn-popup" type="button" id="submit-modal-form">Submit</button>
                  </div>
              </div>
          </form>
      </div>
  </div>`;
  
  function lockButton(target) {
    $(target).attr('disabled', 'disabled');
    $(target).css( 'cursor', 'not-allowed' );
  }
  
  function unlockButton(target) {
    $(target).removeAttr('disabled');
    $(target).css( 'cursor', 'default' );
  }

  $('.become-partner').popup({
    content: becomePartnerContent,
    type: 'html',
    preloaderContent: '',
    beforeOpen: function(type) {
      onPopupOpen();
    },
    afterOpen: function(){
      $('html').css('overflow', 'hidden');
      $('#become-partner-form').MailChimpForm({
        url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=7257663d85',
        fields: 'EMAIL,FNAME,COMPANY',
        submitSelector: '#submit-modal-form',
        onFail: function (errMsg) {
          let $genErr = $('#mc-general-error-partner');
          lockButton('#submit-modal-form');
                    
          $genErr.text(errMsg);
          setTimeout(() => { $genErr.text(''); }, 5000);
        },
        onOk: function (okMsg) {
          window.location = `/confirm/become-partner/?mc-message=${okMsg}`
        }
      });
    },
    beforeClose: function() {
      onPopupClose();
      $('html').css('overflow', 'scroll');
    }
  });

  $('.start-project').popup({
    content: startProjectContent,
    type: 'html',
    preloaderContent: '',
    beforeOpen: function(type) {
      onPopupOpen();
    },
    afterOpen: function () {
      $('html').css('overflow', 'hidden');
      $('#start-project-form').MailChimpForm({
        url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=f6629ecf38',
        fields: 'EMAIL,FNAME',
        submitSelector: '#submit-modal-form',
        onFail: function (errMsg) {
          let $genErr = $('#mc-general-error-project');
        lockButton('#submit-modal-form');

          $genErr.text(errMsg);
          setTimeout(() => { $genErr.text(''); }, 5000);
        },
        onOk: function (okMsg) {
          window.location = `/confirm/start-project/?mc-message=${okMsg}`
        }
      });
    },
    beforeClose: function() {
      onPopupClose();
      $('html').css('overflow', 'scroll');
    }
  });

  $('#contact-us-form').MailChimpForm({
    url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=daffe46160',
    fields: 'EMAIL,FNAME,COMPANY,PHONE,MESSAGE',
    submitSelector: '#submit-contact-form',
    onFail: function (errMsg) {
      let $genErr = $('#mc-general-error');
      
      lockButton('#submit-contact-form');
     
      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => { $genErr.html(''); }, 5000);
    },
    onOk: function (okMsg) {
      window.location = `/confirm/contact-us/?mc-message=${okMsg}`
    }
  });

  $body.on('keyup', $inputViewport, function (e) {
    unlockButton('#submit-contact-form');
  });

  $body.on('keyup', '.input-popup', function (e) {
    unlockButton('#submit-modal-form');
  });

  /**
   * MailChimp input error listener
   */
  $inputViewport.on('mc:input:error', function() {
    let $this = $(this);
    if ($this.offset().top <= window.pageYOffset) {
      $this.goTo('-80');
    }
  });

  /**
   * Cancel modal event listener
   */
  $body.on('click', '.cancel-modal-btn', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $('.popup_back').trigger('click');
  });

  /**
   *Open Popup and hide body
   */
  function onPopupOpen() {
    if ($(window).width() < 568) {
      $('.wrapper').addClass('hidden');
      $('footer').addClass('hidden');
    } else {
      $('.wrapper').show('');
      $('footer').show('');
    }
  }

  /**
   *Close Popup and show body
   */
  function onPopupClose() {
    if ($(window).width() < 568) {
      $('.wrapper').removeClass('hidden');
      $('footer').removeClass('hidden');
    }else {
      $('.wrapper').show('');
      $('footer').show('');
    }
  }

});
