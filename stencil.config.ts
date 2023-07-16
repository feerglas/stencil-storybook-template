import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import eventSync from './stencil-build-helpers/rollup/event-sync';

export const config: Config = {
  namespace: 'stencil-storybook-template',
  outputTargets: [
    {
      type: 'dist-hydrate-script',
    },
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
      file: './dist/documentation/jsonDocs.json',
      type: 'docs-json',
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
    testPathIgnorePatterns: [
      '/convenience/generate-component/boilerplate/',
      '/dist/',
      'hydrate',
      'loader',
      'node_modules',
    ],
  },
};
