#!/usr/bin/env node --experimental-specifier-resolution=node

import { Command } from 'commander';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { createApplication } from './create-application';

const program = new Command('@callmedev/cli')
  .version('1.0.0')
  .argument('<project-directory>')
  .usage('<project-directory> [options]')
  .option(
    '-t, --template <template>',
    '',
  )
  .parse(process.argv);

/** Entrypoint */
const run = pipe(
  TE.Do,
  TE.bind('destination', () => TE.of(program.args[0] || '.')),
  TE.bind('template', () => TE.of(program.opts()['template'])),
  TE.chain(createApplication),
);

await run();
