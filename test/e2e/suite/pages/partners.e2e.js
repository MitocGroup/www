import { ClientFunction } from 'testcafe';
import url from 'url';
import { config, sharedFunctions } from '../../helpers/config-import';
import { PartnersPage } from '../../poms/pages/partners.po';

const partnersPage = new PartnersPage();

const fix = fixture`Check 'Partners' page content`
  .page`${url.resolve(config.www_base_host, '/partners')}`;

sharedFunctions.windowResolution(fix);

test('Check "AWS" link redirects user to valid path', async t => {
  await t.click(partnersPage.awsButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains('aws');
});

test('Check "2ndWatch" link redirects user to valid path', async t => {
  await t.click(partnersPage.secondWatchButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains('2ndwatch');
});

test('Check "404 Moldova" link redirects user to valid path', async t => {
  await t.click(partnersPage.notFoundButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains('404moldova');
});
