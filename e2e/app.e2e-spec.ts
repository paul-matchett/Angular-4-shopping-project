import { UdemyNgPage } from './app.po';

describe('udemy-ng App', () => {
  let page: UdemyNgPage;

  beforeEach(() => {
    page = new UdemyNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
