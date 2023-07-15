import { withActions } from '@storybook/addon-actions/decorator';
import type { Decorator } from '@storybook/html';
import readme from './readme.md';

export default {
  decorators: [withActions as Decorator],
  parameters: {
    docs: {
      extractComponentDescription: (): any => readme,
    },
  },
  tags: ['autodocs'],
  title: 'Components/MyComponent',
};

const template = (args: any): any => `<my-component first="${args.first}" middle="${args.middle}" last="${args.last}"></my-component>`;

export const example = template.bind({});
example.args = {
  first: 'Winnie',
  last: 'Pooh',
  middle: 'The',
};
