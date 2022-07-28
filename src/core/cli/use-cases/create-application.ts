import type { CLIArguments, CLIOptions } from '@/core/cli/types';
import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';
import { installDependencies } from '@/core/package-manager/use-cases';
import { downloadRepositoryAndExtractTemplates } from '@/core/repository/use-cases';
import { createDirectory } from '@/helpers/fs';

export const createApplication = ({ destination, template }: CLIArguments & CLIOptions) => pipe(
  [
    createDirectory(destination),
    downloadRepositoryAndExtractTemplates({ destination, template }),
    installDependencies(destination),
  ],
  A.sequence(TE.ApplicativeSeq),
);
