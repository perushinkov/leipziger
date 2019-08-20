import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

// TODO: Try and configure Given/When/Then for protractor use?

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display users component with appropriate card title', () => {
    page.navigateTo().then(() => {
      expect(page.getUsersTitle()).toEqual('Users');
    });
  });

  it('current url after navigation should be /users', () => {
    page.navigateTo().then(() => {
      expect(page.getCurrentUrl()).toEqual(browser.baseUrl + '/users');
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
