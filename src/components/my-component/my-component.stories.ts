import { withActions } from '@storybook/addon-actions/decorator';
import readme from './readme.md';

export default {
  decorators: [withActions],
  parameters: {
    docs: {
      extractComponentDescription: () => readme,
    },
  },
  tags: ['autodocs'],
  title: 'Components/MyComponent',
};

const template = (args) => `<my-component first="${args.first}" middle="${args.middle}" last="${args.last}"></my-component>`;

export const example = template.bind({});
example.args = {
  first: 'Winnie',
  last: 'Pooh',
  middle: 'The',
};
