import type { CLIArguments, CLIOptions } from '@/core/cli/types';
import { pipeline } from 'node:stream/promises';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import got from 'got';
import tar from 'tar';

export const downloadRepositoryAndExtractTemplates = ({ destination, template }: CLIArguments & CLIOptions) => TE.tryCatch(
  () => pipeline(
    got.stream(`https://codeload.github.com/Call-Me-Dev/create-application/tar.gz/main`),
    tar.extract({ cwd: destination, strip: 3 }, [`create-application-main/templates/${template}`]),
  ),
  E.toError,
);
