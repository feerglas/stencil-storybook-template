/*
 * Define component mode
 * ---
 * Pick component CSS file based on globally (<html> element) defined mode
 * (default|shared) where default is encapsulated/selfcontaining. Inspired by
 * Ionic framework @see link below. Could at one point also be used to test out
 * new designs with a `next` mode.
 */

import { Mode } from '../interface';
import { setMode } from '@stencil/core';

let defaultMode: Mode;

// TODO: get value from /project-config.js
const componentsPrefix = 'my';

export const initialize = (): Mode => {
  if (typeof (window as any) === 'undefined') {
    return;
  }

  const doc = window.document;

  /*
   * We see if the mode was set as an attribute on <html>
   * which could have been set by the user, or by pre-rendering
   */
  defaultMode = (doc.documentElement.getAttribute('mode') === 'shared'
    ? 'shared'
    : 'default');

  const isProjectElement = (elm: HTMLElement): boolean => elm.tagName && elm.tagName.startsWith(`${componentsPrefix}-`);

  const isAllowedProjectModeValue = (elmMode: string): boolean => [
    'default',
    'shared',
  ].includes(elmMode);

  setMode((elm: any) => {
    while (elm) {
      const elmMode = (elm as any).mode || elm.getAttribute('mode');

      if (elmMode) {
        if (isAllowedProjectModeValue(elmMode)) {
          return elmMode;
        } else if (isProjectElement(elm)) {
          console.warn(`Invalid Project mode: "${elmMode}", expected: "default" or "shared"`);
        }
      }
      // eslint-disable-next-line no-param-reassign
      elm = elm.parentElement;
    }

    return defaultMode;
  });
};

export default initialize;
