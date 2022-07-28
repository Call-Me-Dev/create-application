#!/usr/bin/env node --experimental-specifier-resolution=node

import { Command } from 'commander';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { error } from '@/helpers/console';
import { createApplication } from '@/core/cli/use-cases';

const program = new Command('@call-me-dev/create-application')
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
  TE.orElseFirstIOK(error),
);

await run()
