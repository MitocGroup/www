import { Selector } from 'testcafe';
import { isVisible } from '../../helpers/config-import';

export class AboutUsPage {
  constructor () {
    this.advTechPartnerBtn = Selector('body > div > div.gray-light-block.about > div > div > div.flex-row.container-top-bottom > div:nth-child(1) > a', isVisible);
    this.servDelPartnerBtn = Selector('body > div > div.gray-light-block.about > div > div > div.flex-row.container-top-bottom > div:nth-child(2) > a', isVisible);
    this.lambdaFramePartnerBtn = Selector('body > div > div.gray-light-block.about > div > div > div.flex-row.container-top-bottom > div:nth-child(3) > a', isVisible);  
    this.reivnentFifteenBtn = Selector('body > div > div.container.events > div > div > div:nth-child(1) > div.flex-row > div > div > a', isVisible);
    this.openCampsBtn = Selector('body > div > div.container.events > div > div > div:nth-child(2) > div.flex-row > div.container-top.flex-item-12 > div > a', isVisible);
    this.serverlessAustinBtn = Selector('body > div > div.container.events > div > div > div:nth-child(3) > div.flex-row > div.flex-item-12.container-top > div > a', isVisible);
    this.newYorkMeetUpBtn = Selector('body > div > div.container.events > div > div > div:nth-child(1) > div.flex-row > div:nth-child(2) > div > a', isVisible);
    this.nodeJsInteractiveBtn = Selector('body > div > div.container.events > div > div > div:nth-child(2) > div.flex-row > div:nth-child(2) > div > a', isVisible);
    this.techWeekBtn = Selector('body > div > div.container.events > div > div > div:nth-child(3) > div.flex-row > div:nth-child(2) > div > a', isVisible);
    this.serverlessLondonBtn = Selector('body > div > div.container.events > div > div > div:nth-child(2) > div.flex-row > div:nth-child(3) > div > a', isVisible);
    this.openCampsNovBtn = Selector('body > div > div.container.events > div > div > div:nth-child(3) > div.flex-row > div:nth-child(3) > div > a', isVisible);
    this.reivnentSeventeenBtn = Selector('body > div > div.container.events > div > div > div:nth-child(3) > div.flex-row > div:nth-child(4) > div > a', isVisible);
  }
}
