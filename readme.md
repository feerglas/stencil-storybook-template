# stencil-storybook-template

A starting point to build webcomponents with stencil, including storybok

## Configurations

Since this is a template, you should adapt the `project-config.js`. See
that file for more information.

### event sync

In `/stencil-build-helpers/rollup/event-sync.ts` search for the `config`
object at the top of the file. Change the `componentsPrefix` to an appropriate
string. For example, if you name your components like `xyz-button`, then you
should put `xyz` as `componentsPrefix`.

## Installation

Use the node version specified in `.nvmrc`. Then do

```
npm install
```

## Start the project

To start the dev environment, use

```
npm start
````

Note:

the start command runs `start:stencil` and `start:storybook` in parallel. If you start it for the first time, it might fail. The reason being, that storybook will access the stencil build artefacts, which might not yet be ready. If you encounter this, just shut down the server and run `npm run start:stencil` before.

## Linting

The linting script is automatically executed when you use `git push` (via pre-push hook). For convenience, make sure you have eslint and stylelint configured in your code editor.

## Testing

To run e2e and unit tests, run the command
```
npm test
```

### Extras

#### Event name extraction

The project contains a custom build mechanism to extract event names from the components, which stores them in a separate file for every component. See `/stencil-build-helpers/rollup/event-sync.ts` for info.

#### Boilerplate

The project contains a custom boilerplate to bootsrap an new component. Use `npm run generate` to create a new component.
