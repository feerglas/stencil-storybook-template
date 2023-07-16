import { withActions } from '@storybook/addon-actions/decorator';
import type { Decorator } from '@storybook/html';
import events from './my-component.events';
import readme from './readme.md';

export default {
  decorators: [withActions as Decorator],
  parameters: {
    actions: {
      handles: [events.clicked],
    },
    docs: {
      extractComponentDescription: (): any => readme,
    },
  },
  tags: ['autodocs'],
  title: 'Components/MyComponent',
};

const template = (args: any): any => `<my-component first-name="${args.firstName}"></my-component>`;

export const example = template.bind({});
example.args = {
  firstName: 'Winnie',
};
