import url from 'url'
import { config, sharedFunctions, libs, speed } from '../../helpers/config-import'
import { HomePage, StartProject } from '../../helpers/poms-import'

const homePage = new HomePage()
const startProject = new StartProject()

const fix = fixture`Check 'Start a Project' form submit`
  .page`${url.resolve(config.www_base_host, '/')}`

sharedFunctions.windowResolution(fix)

test(`Check 'Start a Project' form request can be submitted by user with valid data`, async t => {
  await t
    .click(homePage.startProjectButton, speed)
    .typeText(startProject.fullname, libs.chance.name(), speed)
    .typeText(startProject.email, libs.chance.email(), speed)
    .click(startProject.submit, speed)
    .expect(startProject.notification.innerText).eql('Almost finished... We need to confirm your email address. To complete the subscription process, please click the link in the email we just sent you.', speed)
})
