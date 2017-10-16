/* global fixture, test */

import { ClientFunction } from 'testcafe'
import url from 'url'
import { config, sharedFunctions } from '../../helpers/config-import'
import { Footer } from '../../helpers/poms-import'

const footer = new Footer()

const fix = fixture`Check Footer links`
  .page`${url.resolve(config.www_base_host, '')}`

sharedFunctions.windowResolution(fix)

test('Check "Footer" contains valid information', async t => {
  await t.expect(footer.address.innerText).contains('50 Tice Blvd\nWoodcliff Lake NJ 07677')
  await t.expect(footer.phone.innerText).contains('(+1) 801 810 8186')
  await t.expect(footer.email.innerText).contains('hello@mitocgroup.com')
})

test('Check "Amazon Partners" link redirects user to valid path', async t => {
  await t
    .click(footer.amazon)
  const getLocation = ClientFunction(() => document.location.href)
  await t.expect(getLocation()).contains('amazon')
})
