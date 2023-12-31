/**
 * Problem:
 * It's recommended to use @Event decorator to dispatch
 * custom events in stencil. In decorators at stencil,
 * variables are not allowed. Since we want to use
 * the events in the .stories files as well, we would
 * like to store the event names in variables, which
 * we then can consume in the stories to not have
 * reduntant code.
 *
 * Solution:
 * This script iterates through all component files,
 * parses the typescript code and searches for the
 * @Event decorator. It then extract all event names
 * to a dedicated file my-component.events.ts
 * (assuming your component is named my-component.tsx).
 */

import {
  basename,
  dirname,
  join,
  resolve,
} from 'path';
import {
  existsSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from 'fs';
import * as ts from 'typescript';
import projectConfig from '../../project-config';

const config = {
  componentsDirectory: '../../src/components',
  componentsPrefix: projectConfig.componentPrefix,
};

type EventDecorator = { name: string; eventName: string };
interface InputOptions {
  input: string[] | { [entryAlias: string]: string };
}

const renderEventsFile = (path: string, eventDecorators: EventDecorator[], usesCustomEvent: boolean): void => {
  const eventsFile = join(dirname(path), basename(path)
    .replace('.tsx', '.events.ts'));

  if (usesCustomEvent) {
    return;
  } else if (!eventDecorators.length) {
    if (existsSync(eventsFile)) {
      unlinkSync(eventsFile);
    }

    return;
  }

  let output = `/**
 * This file is autogenerated by:
 * /stencil-build-helpers/rollup/event-sync.ts
 */
export default {\n`;

  for (const eventDecorator of eventDecorators.sort((a, b) => a.name.localeCompare(b.name))) {
    output += `  ${eventDecorator.name}: '${eventDecorator.eventName}',\n`;
  }

  output += '};\n';

  if (existsSync(eventsFile)) {
    if (readFileSync(eventsFile, 'utf8') !== output) {
      writeFileSync(eventsFile, output, 'utf8');
    }
  } else {
    writeFileSync(eventsFile, output, 'utf8');
  }

};

const findEventName = (decorator: ts.Decorator): any => {
  const callExpression = decorator.expression as ts.CallExpression;
  const [argument] = callExpression.arguments;

  if (callExpression.arguments.length !== 1 || !ts.isObjectLiteralExpression(argument)) {
    return null;
  }
  const eventName = argument.properties.find((p) => p.name?.getText() === 'eventName');

  if (!eventName || !ts.isPropertyAssignment(eventName)) {
    return null;
  }

  const {
    initializer,
  } = eventName;

  return ts.isStringLiteral(initializer)
    ? initializer.text
    : null;
};

const isEventDecorator = (decorator: ts.Decorator): boolean => {
  const callExpression = decorator.expression;

  return ts.isCallExpression(callExpression) && callExpression.expression.getText() === 'Event';
};

const checkForEventDecorator = (node: ts.PropertyDeclaration, eventDecorators: EventDecorator[]): EventDecorator[] => {

  // eslint-disable-next-line
  const eventDecorator = ts.getDecorators(node)!.find(isEventDecorator);

  if (!eventDecorator) {
    return [];
  }

  const name = node.name.getText();
  const eventName = findEventName(eventDecorator) ?? name;

  eventDecorators.push({
    eventName,
    name,
  });

  return eventDecorators;
};

const syncEvents = (path: string): void => {
  let usesCustomEvent = false;
  let eventDecorators: EventDecorator[] = [];
  let fileContent: string;

  const iterateSourceFile = (node: ts.Node): void => {
    if (ts.isPropertyDeclaration(node) && ts.getDecorators(node)?.length) {
      eventDecorators = checkForEventDecorator(node, eventDecorators);
    } else if (ts.isNewExpression(node) && node.expression.getText() === 'CustomEvent') {
      usesCustomEvent = true;
    } else {
      ts.forEachChild(node, iterateSourceFile);
    }
  };

  try {
    fileContent = readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(`Unable to find file ${path} for event sync!`);
  }

  const sourceFile = ts.createSourceFile(path, fileContent, ts.ScriptTarget.ESNext, true);

  iterateSourceFile(sourceFile);

  renderEventsFile(path, eventDecorators, usesCustomEvent);
};

export default (): any => {
  const componentsPath = resolve(__dirname, config.componentsDirectory);

  return {
    buildStart(options: InputOptions): void {
      if (
        typeof options.input !== 'object' ||
        Object.keys(options.input)
          .every((i) => !i.startsWith(config.componentsPrefix))
      ) {
        return;
      }

      readdirSync(componentsPath, {
        withFileTypes: true,
      })
        .filter((d) => d.isDirectory())
        .map((d) => join(componentsPath, d.name, `${d.name}.tsx`))
        .forEach(syncEvents);
    },
    name: 'event-sync',
  };
};
