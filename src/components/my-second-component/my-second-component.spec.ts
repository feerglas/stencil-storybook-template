import { newSpecPage } from '@stencil/core/testing';
import { MySecondComponent } from './my-second-component';

describe('my-second-component', () => {
  it('renders', async () => {
    const {
      root,
    } = await newSpecPage({
      components: [MySecondComponent],
      html: '<my-second-component></my-second-component>',
    });

    expect(root)
      .toEqualHtml(`
        <my-second-component>
          <mock:shadow-root>
            <div class="wrapper">
              <p class="greeting">Hello, World! I'm <span class="name"></span></p>
              <button class="primary">Button</button>
            </div>
          </mock:shadow-root>
        </my-second-component>
      `);
  });

  it('renders with values', async () => {
    const {
      root,
    } = await newSpecPage({
      components: [MySecondComponent],
      html: '<my-second-component first-name="John"></my-second-component>',
    });

    expect(root)
      .toEqualHtml(`
        <my-second-component first-name="John">
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
        </my-second-component>
      `);
  });
});
