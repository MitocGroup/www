import { Selector } from 'testcafe';
import { isVisible } from '../../helpers/config-import';

export class PartnersPage {
  constructor () {
    this.awsButton = Selector('body > div > div.hide-mobile > div.green-block.white-block.container-top-bottom > div > div > div:nth-child(1) > div > a', isVisible);
    this.secondWatchButton = Selector('body > div > div.hide-mobile > div.green-block.white-block.container-top-bottom > div > div > div:nth-child(2) > div > a', isVisible);
    this.notFoundButton = Selector('body > div > div.hide-mobile > div.green-block.white-block.container-top-bottom > div > div > div:nth-child(3) > div > a', isVisible);
  }
}
