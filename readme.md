# stencil-storybook-template

A starting point to build webcomponents with stencil, including storybok

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

the start command runs `start:stencil` and `start:storybook` in parallel. If you start it for the first time, it might fail. The reason being, that storybook will access the stencil build artefact, which might not yet be ready. If you encounter this, just shut down the server and run the command again.

## Linting

The linting script is automatically executed when you use `git push` (via pre-push hook). For convenience, make sure you have eslint and stylelint configured in your code editor.

### Extras

#### Event name extraction

The project contains a custom build mechanism to extract event names from the components, which stores them in a separate file for every component. See `/stencil-build-helpers/rollup/event-sync.ts` for info.

#### Boilerplate

The project contains a custom boilerplate to bootsrap an new component. Use `npm run generate` to create a new component.
