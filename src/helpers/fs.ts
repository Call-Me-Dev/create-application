import fs from 'node:fs/promises';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

export const createDirectory = (path: string) => TE.tryCatch(
  () => fs.mkdir(path),
  E.toError,
);
