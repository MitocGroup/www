import { Selector } from 'testcafe';
import config from '../../config.cfg';
import { HomePage, StartProjectForm, BecomePartnerForm } from '../../poms/page-model';
import sharedFunctions from '../../shared-func';

const homePage = new HomePage();
const startProjectForm = new StartProjectForm();
const becomePartnerForm = new BecomePartnerForm();

const fix = fixture`Check valid content is displayed on "Home" page`
  .page`${config.www_base_host}`;

sharedFunctions.fictureResize(fix);

test('Check "Start a Project" modal is displayed on Home page and can be opened by the click', async t => {
  await t
    .expect(sharedFunctions.visible(homePage.startProjectButton)).ok()
    .hover(homePage.startProjectButton)
    .click(homePage.startProjectButton)
    .expect(startProjectForm.text.innerText).match(
      sharedFunctions.anyCase('Start a Project'));
});

test('Check "Become a Partner" modal is displayed on Home page and can be opened by the click', async t => {
  await t
    .expect(sharedFunctions.visible(homePage.becomePartnerButton)).ok()
    .hover(homePage.becomePartnerButton)
    .click(homePage.becomePartnerButton)
    .expect(becomePartnerForm.text.innerText).match(
      sharedFunctions.anyCase('Become a Partner'));
});
