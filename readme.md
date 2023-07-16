# stencil-storybook-template

A a template for building webcomponents with stencil, including storybok.

- Write components and stories in typescript
- Fully compatible with live-reloading / HMR

## Configurations

Since this is a template, you should adapt the `project-config.js`. See
that file for more information.

## Installation

Use the node version specified in `.nvmrc`. Then do

```
npm install
```

## Start the project

To start the dev environment, use

```
npm start
```

## Linting

The linting script is automatically executed when you use `git push` (via pre-push hook). For convenience, make sure you have eslint and stylelint configured in your code editor.

## Testing

To run e2e and unit tests, run the command
```
npm test
```

## Extras

### Event name extraction

The project contains a custom build mechanism to extract event names from the components, which stores them in a separate file for every component. See `/stencil-build-helpers/rollup/event-sync.ts` for info.

### Generate new components

The project contains a custom boilerplate to bootsrap an new component. Use `npm run generate` to create a new component.
