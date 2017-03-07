import { Test1Page } from './app.po';

describe('test1 App', () => {
  let page: Test1Page;

  beforeEach(() => {
    page = new Test1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
