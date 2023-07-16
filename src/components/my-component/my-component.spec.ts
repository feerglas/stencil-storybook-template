import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  it('renders', async () => {
    const {
      root,
    } = await newSpecPage({
      components: [MyComponent],
      html: '<my-component></my-component>',
    });

    expect(root)
      .toEqualHtml(`
        <my-component>
          <mock:shadow-root>
            <div class="wrapper">
              <p class="greeting">Hello, World! I'm <span class="name"></span></p>
              <button class="primary">Button</button>
            </div>
          </mock:shadow-root>
        </my-component>
      `);
  });

  it('renders with values', async () => {
    const {
      root,
    } = await newSpecPage({
      components: [MyComponent],
      html: '<my-component first-name="John"></my-component>',
    });

    expect(root)
      .toEqualHtml(`
        <my-component first-name="John">
          <mock:shadow-root>
            <div class="wrapper">
              <p class="greeting">
                Hello, World! I'm
                <span class="name">
                  John
                </span>
              </p>
              <button class="primary">Button</button>
            </div>
          </mock:shadow-root>
        </my-component>
      `);
  });
});
