import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import * as TE from 'fp-ts/TaskEither';
import { createDirectory } from './utils';
import { downloadAndExtractRepository } from './helpers/github.helper';
import { install } from './helpers/package.helper';

interface CreateApplicationOptions {
  destination: string;
  template: string;
}

export const createApplication = ({ destination, template }: CreateApplicationOptions) => pipe(
  [
    createDirectory(destination),
    downloadAndExtractRepository(destination)(template),
    install(destination),
  ],
  A.sequence(TE.ApplicativeSeq),
);
