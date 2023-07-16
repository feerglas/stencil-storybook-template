import { newSpecPage } from '@stencil/core/testing';
import { __nameUpperCase__ } from './__name__';

describe('__name__', () => {
  it('renders', async () => {
    const {
      root,
    } = await newSpecPage({
      components: [__nameUpperCase__],
      html: '<__name__></__name__>',
    });

    expect(root)
      .toEqualHtml(`
        <__name__>
          <mock:shadow-root>
            <div class="wrapper">
              <p class="greeting">Hello, World! I'm <span class="name"></span></p>
              <button class="primary">Button</button>
            </div>
          </mock:shadow-root>
        </__name__>
      `);
  });

  it('renders with values', async () => {
    const {
      root,
    } = await newSpecPage({
      components: [__nameUpperCase__],
      html: '<__name__ first-name="John"></__name__>',
    });

    expect(root)
      .toEqualHtml(`
        <__name__ first-name="John">
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
        </__name__>
      `);
  });
});
