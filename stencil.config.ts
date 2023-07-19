import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import eventSync from './stencil-build-helpers/rollup/event-sync';
import projectConfig from './project-config';

export const config: Config = {
  globalScript: 'src/global/global.ts',
  globalStyle: 'src/global/global.shared.scss',
  namespace: projectConfig.namespace,
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
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/core/components/utilities.scss',
        'src/global/functions.scss',
        'src/global/mediaqueries.scss',
        'src/global/mixins.scss',
        'src/global/core/shared/variables.scss',
      ],
    }),
  ],
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
