import { Selector } from 'testcafe';
import { isVisible } from '../../helpers/config-import';

export class CustomersPage {
  constructor () {
    this.atmButton = Selector('body > div > div.hide-mobile > div.green-block.gray-light-block.container-space > div > div > div.flex-item-4.box.ad.media > div > a', isVisible);
    this.manningButton = Selector('body > div > div.hide-mobile > div.green-block.gray-light-block.container-space > div > div > div.flex-item-4.box.publish > div > a', isVisible);
  }
}
