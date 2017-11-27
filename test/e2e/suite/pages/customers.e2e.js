import { ClientFunction } from 'testcafe';
import url from 'url';
import { config, sharedFunctions } from '../../helpers/config-import';
import { CustomersPage } from '../../poms/pages/customers.po';

const customersPage = new CustomersPage();

const fix = fixture`Check 'Customers' page content`
  .page`${url.resolve(config.www_base_host, '/customers')}`;

sharedFunctions.windowResolution(fix);

test('Check "AdTechMedia" link redirects user to valid path', async t => {
  await t.click(customersPage.atmButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains('adtechmedia');
});

test('Check "Manning" link redirects user to valid path', async t => {
  await t.click(customersPage.manningButton);
  const getLocation = ClientFunction(() => document.location.href);
  await t.expect(getLocation()).contains('manning');
});
