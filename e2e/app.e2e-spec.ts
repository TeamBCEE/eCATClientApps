import { EcatClientServicesPage } from './app.po';

describe('ecat-client-services App', function() {
  let page: EcatClientServicesPage;

  beforeEach(() => {
    page = new EcatClientServicesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
