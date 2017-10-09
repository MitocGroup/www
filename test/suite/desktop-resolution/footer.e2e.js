import { Selector } from 'testcafe';
import config from '../../config.cfg';
import { Footer , StartProjectForm } from '../../poms/page-model';
import sharedFunctions from '../../shared-func';

const footer = new Footer();
const startProjectForm = new StartProjectForm();

const fix = fixture`Check valid content and links are displayed on website footer`
  .page`${config.www_base_host}`;

sharedFunctions.fictureResize(fix);

test('Check "Start a Project" modal is displayed on page footer and can be opened by the click', async t => {
  await t
    .expect(sharedFunctions.visible(footer.startProjectButton)).ok()
    .hover(footer.startProjectButton)
    .click(footer.startProjectButton)
    .expect(startProjectForm.text.innerText).match(
      sharedFunctions.anyCase('Start a Project'));
});
