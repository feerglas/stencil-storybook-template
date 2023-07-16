const config = {

  /**
   * If you generate components via the npm script, we always check if you
   * provided the correct component prefix for your new component.
   * Additionally, we make sure to only scan your components from event-names
   * by using this prefix.
   */
  componentPrefix: 'my',

  /**
   * This will become your namespace in the stencil config and serve as the
   * namespace for the build artifacts in the dist folder.
   */
  namespace: 'my-webcomponents-bundle',
};

/* eslint-disable */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.returnExports = factory();
  }
}(this, function () {
  return config;
}));
