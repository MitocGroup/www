import { Selector } from 'testcafe'
import { isVisible } from '../../config/config.cfg'

export class Header {
  constructor () {
    this.logo = Selector('body > div > div.navbar-fix.nav-down.white-color > div > div.logo > a > img', isVisible)
  }
}

export class TopMenu {
  constructor () {
    this.services = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(1) > a', isVisible)
    this.partners = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(2) > a', isVisible)
    this.customers = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(3) > a', isVisible)
    this.abouts = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(4) > a', isVisible)
    this.contact = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(5) > a', isVisible)
    this.blog = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(6) > a', isVisible)
  }
}
