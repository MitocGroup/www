$(function() {
    'use strict';

    let $body = $('body');
    let startProject = new $.Popup();
    let becomePartner = new $.Popup();

    let startProjectContent = `
    <div class="md-content popup">
        <h3>Start a Project</h3>
        <div id="mc_embed_signup">
            <form action="//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&amp;id=f6629ecf38" 
                  method="post" 
                  id="mc-embedded-subscribe-form" 
                  name="mc-embedded-subscribe-form"
                  data-redirect-path="about"
                  class="validate" 
                  novalidate>
                <div id="mc_embed_signup_scroll">
                    <div class="flex-row">
                        <div class="flex-item-6">
                            <div class="mc-field-group input-styles space-input">
                                <label for="mce-FNAME" class="mc-response-label"></label>
                                <input type="text" value="" name="FNAME" class="required" id="mce-FNAME" placeholder="Full Name" required>
                            </div>
                        </div>
                        <div class="flex-item-6">
                            <div class="mc-field-group input-styles">
                                <label for="mce-EMAIL" class="mc-response-label"></label>
                                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email" required>
                            </div>
                        </div>
                        <label class="mc-response-label"></label>
                    </div>
                    <div id="mce-responses" class="clear">
                        <div class="response" id="mce-error-response"></div>
                        <div class="response" id="mce-success-response"></div>
                    </div>
                    <div style="position: absolute; left: -5000px;" aria-hidden="true">
                        <input type="text" name="b_13a7a5fca813b378c24ec9fe3_f6629ecf38" tabindex="-1" value="">
                    </div>
                </div>
                <div class="flex-row">
                    <div class="flex-item-6 ">
                        <button class="btn-popup close-start-project-modal">Cancel</button>
                    </div>
                    <div class="flex-item-6">
                        <button class="btn-popup" type="submit" name="subscribe" id="mc-embedded-subscribe">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;

    let becomePartnerContent = `
    <div class="md-content popup">
        <h3>Become a Partner</h3>
        <div id="mc_embed_signup">
            <form action="//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&amp;id=7257663d85" 
                  method="post" 
                  id="mc-embedded-subscribe-form" 
                  name="mc-embedded-subscribe-form" 
                  class="validate"
                  data-redirect-path="contact" 
                  novalidate>
                <div id="mc_embed_signup_scroll">
                    <div class="flex-row">
                        <div class="flex-item-4">
                            <div class="mc-field-group input-styles">
                                <label for="mce-FNAME" class="mc-response-label"></label>
                                <input type="text" value="" name="FNAME" class="required" id="mce-FNAME" placeholder="Full Name">
                            </div>
                        </div>
                        <div class="flex-item-4">
                            <div class="mc-field-group input-styles">
                                <label for="mce-COMPANY"></label>
                                <input type="text" value="" name="COMPANY" class="required" id="mce-COMPANY">
                            </div>
                        </div>
                        <div class="flex-item-4">
                            <div class="mc-field-group input-styles">
                                <label for="mce-EMAIL" class="mc-response-label"></label>
                                <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL" placeholder="Email">
                            </div>
                        </div>
                    </div>
                    <div style="position: absolute; left: -5000px;" aria-hidden="true">
                        <input type="text" name="b_13a7a5fca813b378c24ec9fe3_f6629ecf38" tabindex="-1" value="">
                    </div>
                </div>
                <div class="flex-row">
                    <div class="flex-item-6 ">
                        <button class="btn-popup close-start-project-modal">Cancel</button>
                    </div>
                    <div class="flex-item-6">
                        <button class="btn-popup" type="submit" name="subscribe" id="mc-embedded-subscribe">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>`;

    $('.start-project').on('click', function() {
        startProject.open(startProjectContent, 'html');
    });

    $body.on('click', '.close-start-project-modal', function(e) {
        e.preventDefault();
        e.stopPropagation();
        startProject.close();
        becomePartner.close();
    });

    $body.on('click', '#mc-embedded-subscribe', function() {
        let $form = $('#mc-embedded-subscribe-form');

        $(this).on('click', function() {
            $form.submit();
        });

        $form.ajaxChimp({
            callback: function(data) {
                if (data.result === 'success') {
                    window.location = $form.data('redirect-path');
                }
            }
        });
    });

    $('.become-partner').on('click', function() {
        becomePartner.open(becomePartnerContent, 'html');
    });
});
