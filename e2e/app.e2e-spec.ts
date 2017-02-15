import { TestingAngularPage } from './app.po';

describe('testing-angular App', function() {
  let page: TestingAngularPage;

  beforeEach(() => {
    page = new TestingAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
