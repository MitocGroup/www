import { Selector } from 'testcafe';
import config from '../../config.cfg';
import libs from '../../libs.cfg';
import { ContactUsForm } from '../../poms/page-model';
import sharedFunctions from '../../shared-func';

const contactUsForm = new ContactUsForm();

const fix = fixture`Check "Contact" form request submit`
  .page`${config.www_base_host}/contact`;

sharedFunctions.fictureResize(fix);

test('Check "Contact" form request can be submitted by user with valid data', async t => {
  await t
    .typeText(contactUsForm.fullname, libs.chance.name())
    .typeText(contactUsForm.email, libs.chance.email())
    .typeText(contactUsForm.phoneNumber, libs.chance.phone())
    .typeText(contactUsForm.company, libs.chance.word())
    .typeText(contactUsForm.message, libs.chance.sentence())
    .click(contactUsForm.sendMessageButton)
    .expect(contactUsForm.responseMesage.innerText).eql('Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.');
});