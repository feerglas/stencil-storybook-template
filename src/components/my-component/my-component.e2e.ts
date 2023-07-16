import { newE2EPage } from '@stencil/core/testing';

describe('my-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-component></my-component>');
    const element = await page.find('my-component');

    expect(element)
      .toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-component></my-component>');
    const component = await page.find('my-component');
    const element = await page.find('my-component >>> div p.greeting');

    expect(element.textContent)
      .toEqual('Hello, World! I\'m ');

    component.setProperty('firstName', 'James');
    await page.waitForChanges();
    expect(element.textContent)
      .toEqual('Hello, World! I\'m James');
  });
});
