import url from 'url';
import { config, sharedFunctions, libs, speed } from '../../helpers/config-import';
import { HomePage, BecomePartner } from '../../helpers/poms-import';

const homePage = new HomePage();
const becomePartner = new BecomePartner();

const fix = fixture`Check 'Become a Partner' form submit`
  .page`${url.resolve(config.www_base_host, '/')}`;

sharedFunctions.windowResolution(fix);

test(`Check 'Become a Partner' form request can be submitted by user with valid data`, async t => {
  await t
    .click(homePage.becomePartnerButton, speed)
    .typeText(becomePartner.fullname, libs.chance.name(), speed)
    .typeText(becomePartner.company, libs.chance.name(), speed)
    .typeText(becomePartner.email, libs.chance.email(), speed)
    .click(becomePartner.submit, speed)
    .expect(becomePartner.notification.innerText).eql('Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.', speed);
});
