import { Selector } from 'testcafe'
import { isVisible } from '../../config/config.cfg'

export class SocialLinks {
  constructor () {
    this.linkedin = Selector('#contact > div > a:nth-child(1)', isVisible)
    this.twitter = Selector('#contact > div > a:nth-child(2)', isVisible)
    this.facebook = Selector('#contact > div > a:nth-child(3)', isVisible)
    this.github = Selector('#contact > div > a:nth-child(4)', isVisible)
    this.google = Selector('#contact > div > a:nth-child(5)', isVisible)
    this.youtube = Selector('#contact > div > a:nth-child(6)', isVisible)
  }
}

export class Footer {
  constructor () {
    this.address = Selector('body > footer > div.map-background > div > div > div:nth-child(2) > p:nth-child(2) > a', isVisible)
    this.phone = Selector('body > footer > div.map-background > div > div > div:nth-child(2) > p:nth-child(3) > a', isVisible)
    this.email = Selector('body > footer > div.map-background > div > div > div:nth-child(2) > p:nth-child(4) > a', isVisible)
    this.amazon = Selector('body > footer > div.map-background > div > div > div:nth-child(4) > a > img', isVisible)
  }
}