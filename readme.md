# stencil-storybook-template

A starting point to build webcomponents with stencil, including storybok

## installation

Use the node version specified in `.nvmrc`. Then do
```bash
npm install
```

## start the project

To start the dev environment, use
```bash
npm start
````

Note:
the start command runs `stencil:start` and `storybook:start` in parallel. If you start it for the first time, it might fail. The reason being, that storybook will access the stencil build artefact, which might not yet be ready. If you encounter this, just shut down the server and run the command again.

## Linting
The linting script is automatically executed when you use `git push` (via pre-push hook). For convenience, make sure you have eslint and stylelint configured in your code editor.
