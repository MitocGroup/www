import { Selector } from 'testcafe';

const speed = { speed: 0.7 };
const isVisible = {
  visibilityCheck: true,
  timeout: 10000
}

export class Header {
  constructor() {
    this.logoImage = Selector('.mitoc-logo', isVisible)
  }
}

export class HomePage {
  constructor() {
    this.startProjectButton = Selector('body > div > div.main-page > div.top_button > button', isVisible)
    this.becomePartnerButton = Selector('#partners > div.container > div.top_button.center > button', isVisible)
  }
}

export class TopMenu {
  constructor() {
    this.servicesLink = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(1) > a', isVisible)
    this.partnersLink = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(2) > a', isVisible)
    this.customersLink = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(3) > a', isVisible)
    this.aboutsUsLink = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(4) > a', isVisible)
    this.contactLink = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(5) > a', isVisible)
    this.blogLink = Selector('body > div > div.main-page > div.navbar-fix.nav-down > div > div.nav-bar > ul > li:nth-child(6) > a', isVisible)
  }
}

export class Footer {
  constructor() {
    this.startProjectButton = Selector('body > div > section.green-block.small-block > div > div > div > button', isVisible)
    this.servicesLink = Selector('#contact > div > a:nth-child(1)', isVisible)
    this.partnersLink = Selector('#contact > div > a:nth-child(2)', isVisible)
    this.customersLink = Selector('#contact > div > a:nth-child(3)', isVisible)
    this.aboutsUsLink = Selector('#contact > div > a:nth-child(4)', isVisible)
    this.contactLink = Selector('#contact > div > a:nth-child(5)', isVisible)
    this.blogLink = Selector('#contact > div > a:nth-child(6)', isVisible)
  }
}

export class SocialLinks{
  constructor() {
    this.linkedinLink = Selector('#contact > div > a:nth-child(1)', isVisible)
    this.twitterLink = Selector('#contact > div > a:nth-child(2)', isVisible)
    this.facebookLink = Selector('#contact > div > a:nth-child(3)', isVisible)
    this.githubLink = Selector('#contact > div > a:nth-child(4)', isVisible)
    this.googleLink = Selector('#contact > div > a:nth-child(5)', isVisible)
    this.youtubeLink = Selector('#contact > div > a:nth-child(6)', isVisible)
  }
}

export class StartProjectForm {
  constructor() {
    this.text = Selector('body > div.popup_cont > div.popup > div > div > h3', isVisible)
    this.fullname = Selector('#mce-FNAME', isVisible)
    this.email = Selector('#mce-EMAIL', isVisible)
    this.cancelButton = Selector('#mc-embedded-subscribe-form-modal > div.flex-row > div:nth-child(1) > button', isVisible)
    this.submitButton = Selector('#mc-embedded-subscribe', isVisible)
  }
}

export class BecomePartnerForm {
  constructor() {
    this.text = Selector('body > div.popup_cont > div.popup > div > div > h3', isVisible)
    this.fullname = Selector('#mce-FNAME', isVisible)
    this.company = Selector('#mce-COMPANY', isVisible)
    this.email = Selector('#mce-EMAIL', isVisible)
    this.cancelButton = Selector('#mc-embedded-subscribe-form-modal > div.flex-row > div:nth-child(1) > button)', isVisible)
    this.submitButton = Selector('#mc-embedded-subscribe', isVisible)
  }
};

export class ContactUsForm {
  constructor() {
    this.fullname = Selector('#mce-FNAME', isVisible)
    this.email = Selector('#mce-EMAIL', isVisible)
    this.phoneNumber = Selector('#mce-PHONE', isVisible)
    this.company = Selector('#mce-COMPANY', isVisible)
    this.message = Selector('#mce-MESSAGE', isVisible)
    this.sendMessageButton = Selector('#mc-embedded-subscribe', isVisible)
    this.responseMesage = Selector('#mce-success-response', isVisible)
  }
};
