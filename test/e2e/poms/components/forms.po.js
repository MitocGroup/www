import { Selector } from 'testcafe'
import { isVisible } from '../../helpers/config-import'

export class StartProject {
  constructor () {
    this.title = Selector('body > div.popup_cont > div.popup > div > div > h3', isVisible)
    this.fullname = Selector('#start-project-form > div:nth-child(1) > div > input[type="text"]', isVisible)
    this.email = Selector('#start-project-form > div:nth-child(2) > div > input[type="email"]', isVisible)
    this.cancel = Selector('#start-project-form > div:nth-child(4) > div:nth-child(1) > button', isVisible)
    this.submit = Selector('#submit-modal-form', isVisible)
    this.notification = Selector('#mc-message', isVisible)
  }
}

export class BecomePartner {
  constructor () {
    this.title = Selector('body > div.popup_cont > div.popup > div > div > h3', isVisible)
    this.fullname = Selector('#become-partner-form > div:nth-child(1) > div > input[type="text"]', isVisible)
    this.company = Selector('#become-partner-form > div:nth-child(2) > div > input[type="text"]', isVisible)
    this.email = Selector('#become-partner-form > div:nth-child(3) > div > input[type="email"]', isVisible)
    this.cancel = Selector('#become-partner-form > div:nth-child(5) > div:nth-child(1) > button', isVisible)
    this.submit = Selector('#submit-modal-form', isVisible)
    this.notification = Selector('#mc-message', isVisible)
  }
}

export class ContactUsForm {
  constructor () {
    this.title = Selector('body > div.popup_cont > div.popup > div > div > h3', isVisible)
    this.fullname = Selector('#contact-us-form > div:nth-child(1) > div.flex-item-6.mc-form-group-FNAME > input', isVisible)
    this.email = Selector('#contact-us-form > div:nth-child(1) > div.flex-item-6.mc-form-group-EMAIL > input', isVisible)
    this.phone = Selector('#contact-us-form > div:nth-child(2) > div.flex-item-6.mc-form-group-PHONE > input', isVisible)
    this.company = Selector('#contact-us-form > div:nth-child(2) > div.flex-item-6.mc-form-group-COMPANY > input', isVisible)
    this.message = Selector('#contact-us-form > div:nth-child(3) > div > input', isVisible)
    this.send = Selector('#submit-contact-form', isVisible)
    this.notification = Selector('#mc-message', isVisible)
  }
}
