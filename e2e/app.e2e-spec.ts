import { DankNetworkPage } from './app.po';

describe('dank-network App', () => {
  let page: DankNetworkPage;

  beforeEach(() => {
    page = new DankNetworkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
