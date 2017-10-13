import url from 'url'
import { config, sharedFunctions, libs, speed } from '../../helpers/config-import'
import { ContactUsForm } from '../../helpers/poms-import'

const contactUsForm = new ContactUsForm()

const fix = fixture`Check 'Contact' form request submit`
  .page`${url.resolve(config.www_base_host, 'contact')}`

sharedFunctions.windowResolution(fix)

test(`Check 'Contact' form request can be submitted by user with valid data`, async t => {
  await t
    .typeText(contactUsForm.fullname, libs.chance.name(), speed)
    .typeText(contactUsForm.email, libs.chance.email(), speed)
    .typeText(contactUsForm.phone, libs.chance.phone(), speed)
    .typeText(contactUsForm.company, libs.chance.word(), speed)
    .typeText(contactUsForm.message, libs.chance.sentence(), speed)
    .click(contactUsForm.send, speed)
    .expect(contactUsForm.notification.innerText).eql('Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.', speed)
})
