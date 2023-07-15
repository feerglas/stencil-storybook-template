import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import eventSync from './stencil-build-helpers/rollup/event-sync';

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
  plugins: [sass()],
  rollupPlugins: {
    before: [eventSync()],
  },
  testing: {
    browserHeadless: 'new',
  },
};
