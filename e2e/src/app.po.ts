import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getLogoAltText() {
    //return element(by.css('app-root h1')).getText();
    return element(by.css('.logo img')).getAttribute('alt');
  }
}
