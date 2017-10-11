import { Selector } from 'testcafe';
import { isVisible } from '../../config/config.cfg';

export class Header {
  constructor(){
    this.logo = Selector('body > div > div.navbar-fix.nav-down.white-color > div > div.logo > a > img', isVisible)
  }
}
