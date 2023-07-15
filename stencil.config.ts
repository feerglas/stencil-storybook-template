import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-storybook-template',
  outputTargets: [
    {
      esmLoaderPath: '../loader',
      type: 'dist',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      serviceWorker: null,
      type: 'www',
    },
  ],
  testing: {
    browserHeadless: 'new',
  },
};
