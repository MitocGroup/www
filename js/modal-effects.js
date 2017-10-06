$(function() {
    'use strict';

  let $body = $('body');
  let startProject = new $.Popup();
  let becomePartner = new $.Popup();

  let startProjectContent = `<div class="md-content popup">
        <h3>Start a Project</h3>
        <div>
            <form id="start-project-form" class="form-styles">
                <div class="flex-row">
                    <div class="flex-item-12 mc-form-group-FNAME input-styles space-input">
                        <input type="text" name="FNAME" placeholder="Full name">
                        <div class="mc-error"></div>
                    </div>    
                </div>
                <div class="flex-row">
                    <div class="flex-item-12 mc-form-group-EMAIL input-styles space-input">
                        <input type="email" name="EMAIL" placeholder="Email">
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
                      <input type="text" name="FNAME" placeholder="Full name">
                      <div class="mc-error"></div>
                  </div>    
              </div>
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-COMPANY input-styles space-input">
                      <input type="text" name="COMPANY" placeholder="Company">
                      <div class="mc-error"></div>
                  </div>    
              </div>
              <div class="flex-row">
                  <div class="flex-item-12 mc-form-group-EMAIL input-styles space-input">
                      <input type="email" name="EMAIL" placeholder="Email">
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
      </div>`;

  $('.start-project').on('click', function () {
    startProject.open(startProjectContent, 'html');

    $('#start-project-form').MailChimpForm({
      url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=f6629ecf38',
      fields: 'EMAIL,FNAME',
      submitSelector: '#submit-modal-form',
      onFail: function (errMsg) {
        let $genErr = $('#mc-general-error-project');

        $genErr.text(errMsg);
        setTimeout(() => { $genErr.text(''); }, 5000);
      },
      onOk: function (okMsg) {
        window.location = `/confirm/start-project?mc-massage=${okMsg}`
      }
    });
  });

  $('.become-partner').on('click', function () {
    becomePartner.open(becomePartnerContent, 'html');

    $('#become-partner-form').MailChimpForm({
      url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=7257663d85',
      fields: 'EMAIL,FNAME,COMPANY',
      submitSelector: '#submit-modal-form',
      onFail: function (errMsg) {
        let $genErr = $('#mc-general-error-partner');

        $genErr.text(errMsg);
        setTimeout(() => { $genErr.text(''); }, 5000);
      },
      onOk: function (okMsg) {
        window.location = `/confirm/become-partner?mc-massage=${okMsg}`
      }
    });
  });

  $('#contact-us-form').MailChimpForm({
    url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=daffe46160',
    fields: 'EMAIL,FNAME,COMPANY,PHONE,MESSAGE',
    submitSelector: '#submit-contact-form',
    onFail: function (errMsg) {
      let $genErr = $('#mc-general-error');

      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      setTimeout(() => { $genErr.html(''); }, 5000);
    },
    onOk: function (okMsg) {
      window.location = `/confirm/contact-us?mc-massage=${okMsg}`
    }
  });

  /**
   * Cancel modal event listener
   */
  $body.on('click', '.cancel-modal-btn', function (e) {
    e.preventDefault();
    e.stopPropagation();
    startProject.close();
    becomePartner.close();
  });
  
});
