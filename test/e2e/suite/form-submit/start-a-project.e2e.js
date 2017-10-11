import { Selector } from 'testcafe';
import { config, isVisible, HomePage, StartProject, sharedFunctions } from '../../helpers/global-import';

const homePage = new HomePage();
const startProject = new StartProject();

const fix = fixture`Check valid content is displayed on "Home" page`
  .page`${config.www_base_host}`;

sharedFunctions.windowResolution(fix);

test('Check that user can submit "Start a Project" request', async t => {
  await t
    .click(homePage.startProjectButton)
    .expect(startProject.title.innerText).match(
      sharedFunctions.anyCase('Start a Project'));
});
