/* global fixture, test */

import { ClientFunction } from 'testcafe'
import url from 'url'
import { config, sharedFunctions } from '../../helpers/config-import'
import { TopMenu } from '../../helpers/poms-import'

const topMenu = new TopMenu()

const fix = fixture`Check top-menu links`
  .page`${url.resolve(config.www_base_host, '')}`

sharedFunctions.windowResolution(fix)

test('Check "Services" top-menu link redirects user to valid path', async t => {
  await t.click(topMenu.services)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('')
})

test('Check "Partners" top-menu link redirects user to valid path', async t => {
  await t.click(topMenu.partners)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('')
})

test('Check "Customers" top-menu link redirects user to valid path', async t => {
  await t.click(topMenu.customers)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('')
})

test('Check "About Us" top-menu link redirects user to valid path', async t => {
  await t.click(topMenu.about)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('')
})

test('Check "Contact" top-menu link redirects user to valid path', async t => {
  await t.click(topMenu.contact)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('contact')
})

test('Check "Blog" top-menu link redirects user to valid path', async t => {
  await t.click(topMenu.blog)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('blog')
})
