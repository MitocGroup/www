import { Selector } from 'testcafe';
import { isVisible } from '../../helpers/config-import';

export class HomePage {
  constructor() {
    this.startProjectButton = Selector('body > div > div.main-page > div.top_button > button', isVisible)
    this.becomePartnerButton = Selector('#partners > div.container > div.top_button.center > button', isVisible)
  }
}
