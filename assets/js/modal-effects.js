/* eslint-disable no-tabs */
$(function() {
  'use strict';

  const $body = $('body');
  const $inputViewport = $('.viewport-control');

  const startProjectContent = `<div class="md-content popup flex-row">
  <div class="flex-item-6 start">
    <a class="cancel-modal-btn"><i class="mdi mdi-close"></i></a>
    <div class="flex-column text-styles confirm-mc">
      <img src="/images/v2/illustration/start.svg" alt="Start a Project"/>
      <h2>Start a Project</h2>
      <p class="text-color-green">Fill out the enquiry form and we'll get back to you as soon as possible.</p>
      <form id="start-project-form" class="form-styles marginTop36" role=form>
      <div class="flex-row">
        <div class="flex-item-12">
          <div class="group mc-form-group-FNAME">
            <input type="text" name="FNAME" class="input" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Full Name</label>
            <div class="mc-error"></div>
          </div>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-item-12 mc-form-group-EMAIL">
          <div class="group mc-form-group-EMAIL">
            <input type="text" name="EMAIL" class="input" required>
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>Email</label>
            <div class="mc-error"></div>
          </div>
        </div>
      </div>
      <div class="flex-row">
        <div class="flex-item-12" id="mc-general-error-project"></div>
      </div>
      <button class="btn btn-green" type="button" id="submit-modal-form">Let’s talk</button>
    </form>
  </div>
  <div class="message hidden flex-column">
    <img src="/images/v2/illustration/ok.svg" alt="Thank You"/>
      <p class="text-color-green">Thank you for message!</p>
      <p id="mc-message"></p>
        <a href="/blog/" rel="noopener">
         <button class="btn btn-green marginTop36">Read Our Blog</button>
        </a>
  </div>
  </div>  
  <div class="flex-item-6 popup-bg-start"></div>
  </div>`;

  const becomePartnerContent = `<div class="md-content popup flex-row">
    <div class="flex-item-6 popup-bg-become flex-column">
    <img src="/images/v2/logos/mitoc-white.svg" alt="MitocGroup Logo"/>
    </div>
    <div class="flex-item-6 partner">
    <a class="cancel-modal-btn"><i class="mdi mdi-close"></i></a>
    <div class="flex-column text-styles confirm-mc">
    <img src="/images/v2/illustration/become-partner.svg" alt="Become a Partner"/>
  	<h2>Become a Partner</h2>
  	<p class="text-color-green">Fill out the enquiry form and let's get to know each other.</p>
      <form id="become-partner-form" class="form-styles marginTop36" role=form>
        <div class="flex-row">
          <div class="flex-item-12">
            <div class="group mc-form-group-FNAME">
              <input type="text" name="FNAME" class="input" required>
              <span class="highlight"></span>
        	    <span class="bar"></span>
              <label>Full Name</label>
      	      <div class="mc-error"></div>
            </div>  
            </div>  
          </div>
          <div class="flex-row">
          <div class="flex-item-12">
            <div class="group mc-form-group-COMPANY">
              <input type="text" name="COMPANY" class="input" required>
              <span class="highlight"></span>
        	    <span class="bar"></span>
              <label>Company</label>
        	    <div class="mc-error"></div>
      	   </div>
           </div>   
          </div>
          <div class="flex-row">
          <div class="flex-item-12">
            <div class="group mc-form-group-EMAIL">
              <input type="text" name="EMAIL" class="input" required>
              <span class="highlight"></span>
        	    <span class="bar"></span>
              <label>Email</label>
              <div class="mc-error"></div>
          </div>
          </div>
          </div>
          <div class="flex-row">
            <div class="flex-item-12" id="mc-general-error-partner"></div>
          </div>
          <button class="btn btn-green" type="button" id="submit-modal-form">Get started</button>
          </form>
      </div>
      <div class="message hidden flex-column">
      <img src="/images/v2/illustration/ok.svg" alt="Thank You"/>
      <p class="text-color-green">Thank you for message!</p>
      <p id="mc-message"></p>
      <div>
        <a href="/blog/" rel="noopener">
           <button class="btn btn-green marginTop36">Read Our Blog</button>
         </a>
      </div>  
    </div>
    </div>
  </div>`;

  function lockButton(target) {
    $(target).attr('disabled', 'disabled');
    $(target).css('cursor', 'not-allowed');
  }

  function unlockButton(target) {
    $(target).removeAttr('disabled');
    $(target).css('cursor', 'default');
  }

  function comfirmMessage(okMsg) {
    $('.confirm-mc').addClass('hidden');
    $('body')
      .find('.message')
      .removeClass('hidden');
    $('body')
      .find('#mc-message')
      .text(okMsg);
  }

  $('.become-partner').popup({
    content: becomePartnerContent,
    type: 'html',
    preloaderContent: '',
    beforeOpen: function(type) {
      onPopupOpen();
    },
    afterOpen: function() {
      $('html').css('overflow', 'hidden');
      $('#become-partner-form').MailChimpForm({
        url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=7257663d85',
        fields: 'EMAIL,FNAME,COMPANY',
        submitSelector: '#submit-modal-form',
        onFail: function(errMsg) {
          const $genErr = $('#mc-general-error-partner');
          lockButton('#submit-modal-form');

          $genErr.text(errMsg);
          setTimeout(() => {
            $genErr.text('');
          }, 5000);
        },
        onOk: function(okMsg) {
          comfirmMessage(okMsg);
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
    afterOpen: function() {
      $('html').css('overflow', 'hidden');
      $('#start-project-form').MailChimpForm({
        url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=f6629ecf38',
        fields: 'EMAIL,FNAME',
        submitSelector: '#submit-modal-form',
        onFail: function(errMsg) {
          const $genErr = $('#mc-general-error-project');
          lockButton('#submit-modal-form');

          $genErr.text(errMsg);
          setTimeout(() => {
            $genErr.text('');
          }, 5000);
        },
        onOk: function(okMsg) {
          comfirmMessage(okMsg);
        }
      });
    },
    beforeClose: function() {
      onPopupClose();
      $('html').css('overflow', 'scroll');
    }
  });

  $('.meet-team').click(function() {
    window.location.href = '/about/';
  });

  $('#contact-us-form').MailChimpForm({
    url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=daffe46160',
    fields: 'EMAIL,FNAME,COMPANY,PHONE,MESSAGE',
    submitSelector: '#submit-contact-form',
    onFail: function(errMsg) {
      const $genErr = $('#mc-general-error');

      lockButton('#submit-contact-form');

      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => {
        $genErr.html('');
      }, 5000);
    },
    onOk: function(okMsg) {
      window.location = `/confirm/contact-us/?mc-message=${okMsg}`;
    }
  });

  $body.on('keyup', $inputViewport, function(e) {
    unlockButton('#submit-contact-form');
  });

  $body.on('keyup', '.input-popup', function(e) {
    unlockButton('#submit-modal-form');
  });

  /**
   * MailChimp input error listener
   */
  $inputViewport.on('mc:input:error', function() {
    const $this = $(this);
    if ($this.offset().top <= window.pageYOffset) {
      $this.goTo('-80');
    }
  });

  /**
   * Cancel modal event listener
   */
  $body.on('click', '.cancel-modal-btn', function(e) {
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
    } else {
      $('.wrapper').show('');
      $('footer').show('');
    }
  }
});
