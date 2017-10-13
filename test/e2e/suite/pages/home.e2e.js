/* global fixture, test */

import url from 'url'
import { config, sharedFunctions } from '../../helpers/config-import'
import { Header, TopMenu } from '../../helpers/poms-import'

const header = new Header()
const topMenu = new TopMenu()

const fix = fixture`Check 'Home' page content`
  .page`${url.resolve(config.www_base_host, '/')}`

sharedFunctions.windowResolution(fix)

test('Check "Logo" image is displayed on website header', async t => {
  await t
    .expect(header.logo)
})

test('Check "Services" top-menu link is displayed on website header', async t => {
  await t
    .expect(topMenu.services.innerText).match(
    sharedFunctions.anyCase('Services')
    )
})

test('Check "Partners" top-menu link is displayed on website header', async t => {
  await t
    .expect(topMenu.partners.innerText).match(
    sharedFunctions.anyCase('Partners')
    )
})

test('Check "Customers" top-menu link is displayed on website header', async t => {
  await t
    .expect(topMenu.customers.innerText).match(
    sharedFunctions.anyCase('Customers')
    )
})

test('Check "About Us" top-menu link is displayed on website header', async t => {
  await t
    .expect(topMenu.about.innerText).match(
    sharedFunctions.anyCase('About Us')
    )
})

test('Check "Contact" top-menu link is displayed on website header', async t => {
  await t
    .expect(topMenu.contact.innerText).match(
    sharedFunctions.anyCase('Contact')
    )
})

test('Check "Blog" top-menu link is displayed on website header', async t => {
  await t
    .expect(topMenu.blog.innerText).match(
    sharedFunctions.anyCase('Blog')
    )
})
