import type { StorybookConfig } from '@storybook/html-vite';

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
    name: '@storybook/html-vite',
    options: {},
  },
  staticDirs: [
    '../dist',
    '../loader',
  ],
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
};

export default config;
