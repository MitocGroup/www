import { Selector } from 'testcafe';
import { config, isVisible, HomePage, StartProject, sharedFunctions } from '../../helpers/global-import';

const homePage = new HomePage();
const startProject = new StartProject();

const fix = fixture`DEBUG`
  .page`${config.www_base_host}`;

test('DEBUG', async t => {
  await t
    .wait(10000)
    .expect(Selector('body > div > div.main-page > div.main-text > h1').innerText).eql('Technology company working on innovative enterprise solutions|');
});
