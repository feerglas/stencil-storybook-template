import { newE2EPage } from '@stencil/core/testing';

describe('__name__', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<__name__></__name__>');
    const element = await page.find('__name__');

    expect(element)
      .toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<__name__></__name__>');
    const component = await page.find('__name__');
    const element = await page.find('__name__ >>> div p.greeting');

    expect(element.textContent)
      .toEqual('Hello, World! I\'m ');

    component.setProperty('firstName', 'James');
    await page.waitForChanges();
    expect(element.textContent)
      .toEqual('Hello, World! I\'m James');
  });
});
