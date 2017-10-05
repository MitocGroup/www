import { Selector } from 'testcafe';
import config from '../../config.cfg';
import { Header, TopMenu } from '../../poms/page-model';
import sharedFunctions from '../../shared-func.js';

const header = new Header();
const topMenu = new TopMenu();

const fix = fixture`Check valid content is displayed on website header`
  .page`${config.www_base_host}`;

sharedFunctions.fictureResize(fix);

test('Check "Logo" image is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(header.logoImage)).ok()
});

test('Check "Services" top-menu link is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(topMenu.servicesLink)).ok()
    .expect(topMenu.servicesLink.innerText).match(
      sharedFunctions.anyCase('Services')
    );
});

test('Check "Partners" top-menu link is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(topMenu.partnersLink)).ok()
    .expect(topMenu.partnersLink.innerText).match(
      sharedFunctions.anyCase('Partners')
    );
});

test('Check "Customers" top-menu link is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(topMenu.customersLink)).ok()
    .expect(topMenu.customersLink.innerText).match(
      sharedFunctions.anyCase('Customers')
    );
});

test('Check "About Us" top-menu link is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(topMenu.aboutsUsLink)).ok()
    .expect(topMenu.aboutsUsLink.innerText).match(
      sharedFunctions.anyCase('About Us')
    );
});

test('Check "Contact" top-menu link is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(topMenu.contactLink)).ok()
    .expect(topMenu.contactLink.innerText).match(
      sharedFunctions.anyCase('Contact')
    );
});

test('Check "Blog" top-menu link is displayed on website header', async t => {
  await t
    .expect(sharedFunctions.visible(topMenu.blogLink)).ok()
    .expect(topMenu.blogLink.innerText).match(
      sharedFunctions.anyCase('Blog')
    );
});
