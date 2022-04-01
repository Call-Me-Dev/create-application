#!/usr/bin/env node

import { Command } from 'commander';
import { pipe } from 'fp-ts/function';
import * as C from 'fp-ts/Console';
import * as TE from 'fp-ts/TaskEither';
import { createApplication } from './create-application';

const { args } = new Command('@call-me-dev/cli')
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
  TE.bind('destination', () => TE.of(args[0] || '.')),
  TE.bind('template', () => TE.of('http')),
  TE.chain(createApplication),
  TE.map(C.log('Success !')),
);

await run();
