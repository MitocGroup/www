/* global fixture, test */

import { ClientFunction } from 'testcafe'
import url from 'url'
import { config,sharedFunctions } from '../../helpers/config-import'
import { SocialLinks } from '../../helpers/poms-import'

const socialLinks = new SocialLinks();

const fix = fixture`Check social links`
  .page`${url.resolve(config.www_base_host, '')}`

sharedFunctions.windowResolution(fix)

test('Check "Twitter" social link redirects user to valid path', async t => {
  await t.click(socialLinks.twitter)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('twitter')
})

test('Check "Facebook" social link redirects user to valid path', async t => {
  await t.click(socialLinks.facebook)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('facebook')
})

test('Check "Github" social link redirects user to valid path', async t => {
  await t.click(socialLinks.github)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('github')
})

test('Check "Google" social link redirects user to valid path', async t => {
  await t.click(socialLinks.google)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('google')
})
