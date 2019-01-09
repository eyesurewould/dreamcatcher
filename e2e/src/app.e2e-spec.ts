import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have alt text for logo', () => {
    page.navigateTo();
    expect(page.getLogoAltText()).toEqual('Dreamcatcher Home');
  });
});
