// @ts-expect-error: File could not be found
import readme from './readme.md?raw';
import { withActions } from '@storybook/addon-actions/decorator';
import type { Decorator } from '@storybook/html';
import events from './__name__.events';

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
  title: 'Components/__nameUpperCase__',
};

// --- Template
const template = (args: any): string => `<__name__ variant="${args.variant}" first-name="${args.firstName}"></__name__>`;

// --- Arg types

const text = 'text';

const variant = {
  control: {
    type: 'select',
  },
  options: [
    'primary',
    'secondary',
  ],
};

const argTypes = {
  firstName: text,
  variant,
};

// --- Stories
export const defaultVariant = template.bind({});
export const secondary = template.bind({});

defaultVariant.argTypes = argTypes;
secondary.argTypes = argTypes;

defaultVariant.args = {
  firstName: 'Winnie',
  variant: 'primary',
};

secondary.args = {
  firstName: 'Winnie',
  variant: 'secondary',
};

