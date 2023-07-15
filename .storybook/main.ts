import type { StorybookConfig } from '@storybook/html-webpack5';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  docs: {
    autodocs: 'tag',
  },
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
};

export default config;
